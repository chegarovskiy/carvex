import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { ModelCar, ModelsCar } from './models';
import { createLoginRequestHeaders } from '../../../../variables/headers';


export async function getModels(page: number, uuid: string, signal?: AbortSignal) {
    console.log('page', page);
    const dynamicRes: Response = await fetch(`https://api.bm.parts/catalog/cars/brand/${uuid}/models/?page=${page}&per_page=100`,
      {
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://api.bm.parts/catalog/cars/brand/${uuid}/models/?page=${page}&per_page=100`, error);
      });
    return dynamicRes;
  }

// export let saveToDb = async(models: ModelCar[] | null) => {
//   if(models) {
//     await prisma.modelCar.createMany({
//       data: models,
//       skipDuplicates: true
//     }).catch(() => {
//       throw new Error('Failed wrighting Models to db');
//     })
//   } else {
//     throw new Error('Models is null');
//   }
// }

export const processModels = _with(async (response, signal, uuid) => {
  if (200 <= response.status && response.status < 300) {
    console.log('200');

    const _data: ModelsCar = await response.json();
    let _dataWithMarked: ModelCar[] = _data.car_models.map(model => {
      if (model.year_end === 0 || model.year_end > 200000 ) {
        model.marked = true;
        model.uuid_brand = uuid as any as string; 
        return model;
      } else {
        model.marked = false;
        model.uuid_brand = uuid as any as string;
        return model;
      }
  })
    // await saveToDb(_dataWithMarked);
    return;
  }
  console.log(response.status);
  throw new NotHandledError(response);
}, defaultHandler)

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { uuid, name } = req.body;
  console.log('uuid', uuid);
  
  const abort = new AbortController;
  once(req.socket, 'close').then(() => {
   abort.abort(new Error('Socket closed'));
  });

  let isLastPage: boolean = false;

 for (let page = 1; !isLastPage; page ++) {
   try {
     await execute(() => getModels(page, uuid), processModels, undefined, abort.signal, uuid);
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
 }
 res.status(201);
 res.setHeader('Content-Type', 'application/json');
 res.end(JSON.stringify({
   message: `${name} - Models created`
 }));
}