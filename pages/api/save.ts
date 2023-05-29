// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { requestHeaders } from '../../variables/headers';
import {setTimeout as wait} from 'node:timers/promises';
import { RequestHandler } from 'next/dist/server/next';
import { exec } from 'node:child_process';


interface Brand {
  code: number
  marked: boolean
  uuid: string
  name: string
  models_url: string
}

interface Brands {
  car_brands: Brand[]
}


let waitUntilResetTimeEnd = async (resetTime: number, signal?: AbortSignal): Promise<boolean> => {
  const now = Date.now();
  if (Number.isFinite(resetTime) && resetTime > now) {
    return wait(resetTime - now, false, { signal });
  } else {
    return Promise.resolve(false);
  }
}

let saveToDb = async(brands: Brand[] | null) => {
  if(brands) {
    await prisma.brand.createMany({
      data: brands,
      skipDuplicates: true
    }).catch(() => {
      throw new Error('Failed wrighting Brands to db');
    })
  } else {
    throw new Error('Brands is null');
  }
}

async function getBrands(page: number, signal?: AbortSignal) {
  console.log('page', page);
  const dynamicRes: Response = await fetch(`https://api.bm.parts/catalog/cars/brands/?page=${page}`,
    {
      cache: 'no-store',
      credentials: 'include',
      headers: requestHeaders,
      signal,
    }).catch ((error) => {
      throw new Error(`Failed fetch request: https://api.bm.parts/catalog/cars/brands/?page=${page}`, error);
    });
  return dynamicRes;
}

abstract class AResponseHandlerError extends Error {
  public readonly abstract response: Response;
}

class NotFoundError extends AResponseHandlerError {
  public constructor(public readonly response: Response) {
    super('Not found');
  }
}

class NotHandledError extends Error {
  public constructor(public readonly response: Response) {
    super('Unhandled');
  }
}

class RetryError extends Error {
  public constructor(public readonly response: Response) {
    super('Retry');
  }
}

// async function middleware<RequestHandlerType extends (signal?: AbortSignal) => Promise<Response>>(handler: RequestHandlerType, signal?: AbortSignal): Promise<Awaited<ReturnType<RequestHandlerType>>> {
//   const response = await handler(signal);
//   switch (response.status) {
//     case 404:
//       throw new NotFoundError(response);
//     case 403:
//       await waitUntilResetTimeEnd(parseInt(response.headers.get('x-rateLimit-reset') ?? '', 10) * 1000, signal);
//       return middleware(handler, signal);
//     case 200:
//       return response as Awaited<ReturnType<RequestHandlerType>>;
//     default:
//       throw new Error('Unexpected response');
//   }
// }


type ResponseHandler = (response: Response, signal?: AbortSignal) => Promise<void>;


function _with(handler: ResponseHandler, next: ResponseHandler): ResponseHandler {
  return async (response, signal) => {
    if (signal && signal.aborted) {
      throw new signal.reason;
    }
    try {
      await handler(response, signal);
    } catch (error) {
      if (error instanceof NotHandledError) {
        return await next(error.response, signal);
      }
    }
  }
}

const unhandled: ResponseHandler = (response, signal) => {
  throw new NotHandledError(response);
}

function with404(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 404) {
      throw new NotFoundError(response);
    }
    throw new NotHandledError(response);
  }, handler);
}

function with403(handler: ResponseHandler): ResponseHandler {
  return _with(async (response, signal) => {
    if (response.status === 403) {
      await waitUntilResetTimeEnd(parseInt(response.headers.get('x-rateLimit-reset') ?? '', 10) * 1000, signal);
      throw new RetryError(response); 
    }
    throw new NotHandledError(response);
  }, handler);
}

const defaultHandler = with404(with403(unhandled));

const processBrands = _with(async (response, signal) => {
  if (response.status === 200) {
    const _data: Brands = await response.json();
    await saveToDb(_data.car_brands);
    return;
  }
  throw new NotFoundError(response);
}, defaultHandler)

async function execute(init: (signal?: AbortSignal) => Promise<Response>, chain: (response: Response, signal?: AbortSignal) => Promise<void>, totalRetries = 3, signal?: AbortSignal): Promise<void> {
  let retriesUsed = 0;
  while (true) {
    try {
      await chain(await init(signal), signal);
      return;
    } catch (error) {
      if (!(error instanceof RetryError) || (retriesUsed++ >= totalRetries)) {
        throw error;
      }
    }
  }
}

// async function name(params:type) {
  
// }

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   const { text } = req.body;
   let page: number = 1;
   let isLastPage: boolean = false;
   let isNeedWait: boolean = false;
   let resTimeMs: number;
  //  let url = `https://api.bm.parts/catalog/cars/brands/?page=${page}`;
   let remainingRequests: number = -1; 


  for (let page = 1; !isLastPage; page ++) {
    try {
      await execute(() => getBrands(page), processBrands);
      // const response = await middleware((signal) => getBrands(page, signal));
      // const _data: Brands = await response.json();
      // await saveToDb(_data.car_brands);
    } catch (error) {
      if (error instanceof NotFoundError) {
        isLastPage = true;
      } else {
        console.log('brand created error', error); 
      }
    }
  }

  // try {

  //   while (!isLastPage) {
  //     console.log('isLastPage', isLastPage);

  //     if (!isNeedWait) {
  //       console.log('isNeedWait', isNeedWait);

  //       let res:Response = await getBrands(page);
  //       remainingRequests = Number(res.headers.get('x-ratelimit-remaining'));
  //       console.log('remainingRequests', remainingRequests);
      
  //       resTimeMs = parseInt(res.headers.get('x-rateLimit-reset') ?? '', 10) * 1000;
       
  //       if (res.status === 404) {
  //         console.log('404');
  //         isLastPage = true;
  //       }
    
  //       if (res.status === 403) {
  //         console.log('403');
  //         isNeedWait = await waitUntilResetTimeEnd(resTimeMs);
  //       }
    
  //       if (res.status == 200) {
  //         const _data: Brands = await res.json();
  //         await saveToDb(_data.car_brands);
  //         //test
  //         // isNeedWait = await waitUntilResetTimeEnd(parseInt(Date.now())*1000 + 2000);
  //         page = page + 1;
  //       } 

  //     }
    
  //   }
  
  //   res.status(200).json({text: `brands created `})
  // } catch (error) {
  //   console.log('brand created error', error); 
  // }
  
}
