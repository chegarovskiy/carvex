import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { Brand, Brands } from './brands';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { createLoginRequestHeaders } from '../../../../variables/headers';


async function getBrands(page: number, signal?: AbortSignal) {
  console.log('page', page);
  const dynamicRes: Response = await fetch(`https://api.bm.parts/catalog/cars/brands/?page=${page}`,
    {
      cache: 'no-store',
      credentials: 'include',
      headers: await createLoginRequestHeaders(),
      signal,
    }).catch ((error) => {
      throw new Error(`Failed fetch request: https://api.bm.parts/catalog/cars/brands/?page=${page}`, error);
    });
  return dynamicRes;
}

// let saveToDb = async(brands: Brand[] | null) => {
//   if(brands) {
//     await prisma.brand.createMany({
//       data: brands,
//       skipDuplicates: true
//     }).catch(() => {
//       throw new Error('Failed wrighting Brands to db');
//     })
//   } else {
//     throw new Error('Brands is null');
//   }
// }

const processBrands = _with(async (response, signal) => {
  if (200 <= response.status && response.status < 300) {
    console.log('200');
    const _data: Brands = await response.json();
    let brendsMarked: Brand[] = _data.car_brands.map(brand => {
      if (_BRANDS_MARKED_UUID.includes(brand.uuid)) {
        brand.marked = true;
        return brand;
      } else {
        brand.marked = false;
        return brand;
      }  
    })
    // await saveToDb(brendsMarked);
    return;
  }
  console.log(response.status);
  throw new NotHandledError(response);
}, defaultHandler)

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
   const { text } = req.body;
   const abort = new AbortController;
   once(req.socket, 'close').then(() => {
    abort.abort(new Error('Socket closed'));
   });

   let isLastPage: boolean = false;

  for (let page = 1; !isLastPage; page ++) {
    try {
      await execute(() => getBrands(page), processBrands, undefined, abort.signal);
    } catch (error) {
      console.log('err', error); 
      if (error instanceof NotFoundError) {
        isLastPage = true;
      } else if (error instanceof AResponseHandlerError ) {
        res.status(error.response.status);
        error.response.headers.forEach((value, key) => {
          res.setHeader(key, value);
        })
        res.end(await error.response.text());
        return;
      } else {
        console.log('brand created error', error);
        res.status(503);
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
          message: error instanceof Error ? error.message : String(error),
          name: error instanceof Error ? error.name : undefined,
        }));
        return;
      }
    }
  }
  res.status(201);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: 'Brands created'
  }));
}