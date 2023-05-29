import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IModel} from './model';
import { plainToInstance } from 'class-transformer';
import { Model } from './model.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';


export async function getModels(page: number, markId: number, signal?: AbortSignal) {
    console.log('page', page);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/car/models`,
      {
        body: JSON.stringify(markId),
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/car/models`, error);
      });
    return dynamicRes;
  }

  export const processModels = _with(async (response, signal, uuid) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
  
      const _plainData = await response.json();
      let _data = plainToInstance(Model, _plainData as Object[]);

      let _dbModels: IModel[] = [];
      let _re = /[\.\s]/g;

      _data.map(model => {
        let strRange = model.modelRange.replace(_re, '').split('-');
        let year_start = strRange[0];
        let year_end = strRange[1];

        let _dbModel: IModel = {
            modelId: model.modelId,
            markId: model.markId,
            model: model.model,
            year_begin: year_start.length ? Number(year_start) : 0,
            year_end: year_end.length ? Number(year_end) : 0,
            marked: Number(year_end) === 0 || Number(year_end) > 200000 ? true : false
        };
        console.log('_dbModel', _dbModel);
        

        _dbModels.push(_dbModel);
      })

      console.log('_dbModels', _dbModels);
      await saveToDb(_dbModels);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  let saveToDb = async(models: IModel[] | null) => {
    if(models) {
      await prisma.model.createMany({
        data: models,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting Models to db');
      })
    } else {
      throw new Error('Models is null');
    }
  }


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
    const abort = new AbortController;
    once(req.socket, 'close').then(() => {
     abort.abort(new Error('Socket closed'));
    });
  
  
    for(let markId of _AD_MARKED_MARKS) {
  
      let isLastPage: boolean = false;
      
      try {
        await execute(() => getModels(1, markId), processModels, undefined, abort.signal, markId);
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
    res.end(JSON.stringify({message: `Models created`}));
  }