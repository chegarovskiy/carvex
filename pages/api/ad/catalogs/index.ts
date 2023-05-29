import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { ICatalog } from './catalogs';
import { plainToInstance } from 'class-transformer';
import { Catalog } from './catalogs.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';


export async function getCatalog(page: number, typeId: number, signal?: AbortSignal) {
    // console.log('page', modelId);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/Car/Catalog/${typeId}`,
      {
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/Car/Catalog/${typeId}`, error);
      });
    return dynamicRes;
  }

  export const processCatalog = _with(async (response, signal, uuid) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
  
      const _plainData = await response.json();
      let _data = plainToInstance(Catalog, _plainData as Object[]);
      
      let _dbCatalogs: ICatalog[] = [];

      _data.map(catalog => {

        let _dbCatalog: ICatalog = {
          
            typeId: catalog.typeId,
            groupId: catalog.groupId,
            groupCode: catalog.groupCode,
            subGroupCode: catalog.subGroupCode,
            count: catalog.count,
            marked: true
        };
        // console.log('_dbModel', _dbVehicl);
        

        _dbCatalogs.push(_dbCatalog);
      })

      // console.log('_dbModels', _dbVehicles);
      await saveToDb(_dbCatalogs);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  let saveToDb = async(catalogs: ICatalog[] | null) => {
    if(catalogs) {
      await prisma.catalog.createMany({
        data: catalogs,
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

    const typesId =  await prisma.vehicl.findMany({
        where: {
          marked: true
        },
        select: {
          typeId: true
        }
      })
    

    let counter = 0;

    for(let typeId of typesId) {
   
      let isLastPage: boolean = false;
      
      try {
        counter = counter + 1;
        console.log( counter,'-counter-', typeId.typeId);
        
        await execute(() => getCatalog(1, typeId.typeId), processCatalog, undefined, abort.signal, typeId.typeId);
       
        
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