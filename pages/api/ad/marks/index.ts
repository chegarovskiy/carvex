import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IMark} from './mark';
import { plainToInstance } from 'class-transformer';
import { Mark } from './marks.dto';



export async function marks(signal?: AbortSignal) {
  const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/car/marks`,
    {
      cache: 'no-store',
      credentials: 'include',
      headers: await createLoginRequestHeaders(),
      signal,
      method: 'POST'
    }
    ).catch ((error) => {
      throw new Error(`Failed fetch request: https://ecom.ad.ua/api/car/marks`, error);
    });

  return dynamicRes;
}

export const processMarks = _with(async (response, signal, uuid) => {
  if (200 <= response.status && response.status < 300) {
    const _plainData = await response.json();
    let _data = plainToInstance(Mark, _plainData as Object[]);

    let _dbMarks: IMark[] = [];
    _data.map(mark => {
     
        let _dbMark: IMark = {
          mark: mark.mark,
          markId: mark.markId,
          marked: false
        };
        _dbMarks.push(_dbMark);
    })
    await saveToDb(_dbMarks);
    return;
  }
  throw new NotHandledError(response);
}, defaultHandler)

let saveToDb = async(marks: IMark[] | null) => {
  if(marks) {
    await prisma.mark.createMany({
      data: marks,
      skipDuplicates: true
    }).catch(() => {
      throw new Error('Failed wrighting Brands to db');
    })
  } else {
    throw new Error('Brands is null');
  }
}


export default async function handler (req: NextApiRequest, res: NextApiResponse) {

  const abort = new AbortController;
  once(req.socket, 'close').then(() => {
   abort.abort(new Error('Socket closed'));
  });

  let isLastPage: boolean = false;


   try {
    
     await execute(() => marks(), processMarks, undefined, abort.signal);
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
       console.log('model created error', error);
       res.status(503);
       res.setHeader('Content-Type', 'application/json')
       res.end(JSON.stringify({
         message: error instanceof Error ? error.message : String(error),
         name: error instanceof Error ? error.name : undefined,
       }));
       return;
     }
   }
 
 res.status(201);
 res.setHeader('Content-Type', 'application/json');
 res.end(JSON.stringify({
   message: `Marks Ad created`
 }));
}