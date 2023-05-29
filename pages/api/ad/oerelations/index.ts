import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IItemNoItemId, IOeRelation } from './oerelation';
import { plainToInstance } from 'class-transformer';
import { OeRelation } from './oerelation.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';



export async function getOEItem(itemNoItemId: IItemNoItemId, signal?: AbortSignal) {
    // console.log('page', modelId);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/Catalog/ItemOE`,
      {
        body: JSON.stringify(itemNoItemId.itemNo),
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/Catalog/ItemOE`, error);
      });
    return dynamicRes;
  }

  export const processOeItem = _with(async (response, signal, itemNoItemId) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
  
      const _plainData = await response.json();
      let _data = plainToInstance(OeRelation, _plainData as Object[]);
      
      let _dbOeRelations: IOeRelation[] = [];

      _data.map(oeRelation => { 

        let _dbOeRelation: IOeRelation = {
            itemNo: itemNoItemId.itemNo,
            search: oeRelation.search,
            brand: oeRelation.brand,
            itemId: itemNoItemId.itemId  
        };
        // console.log('_dbOeRelation', _dbOeRelation);
        
        _dbOeRelations.push(_dbOeRelation);
      })

      // console.log('_dbOeRelations', _dbOeRelations);
      
      await saveToDbOERelations(_dbOeRelations);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  let saveToDbOERelations = async(oeRelations: IOeRelation[] | null) => {
    if(oeRelations) {
      await prisma.oeRelation.createMany({
        data: oeRelations,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting oeRelations to db');
      })
    } else {
      throw new Error('oeRelations is null');
    }
  }
  let setStatusItemParsed = async (itemNo: string) => {
    await prisma.item.update({
      where: {
        itemNo: itemNo
      },
      data: {
        marked: false
      }
    })
  }
  let setStatusItemNoParsed = async () => {
    await prisma.item.updateMany({
      where: {
        marked: false
      },
      data: {
        marked: true
      }
    })
  }


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
    const abort = new AbortController;
    once(req.socket, 'close').then(() => {
     abort.abort(new Error('Socket closed'));
    });

    const itemNoArrObj: Array<IItemNoItemId> =  await prisma.item.findMany({
        where: {
          marked: true
        },
        select: {
          itemNo: true,
          itemId: true
        }
      })

      // let itemNoArr = itemNoArrObj.map( el => el.itemNo);
      
    
    let counter = 0;

    for(let itemNoItrmId of itemNoArrObj) {
   
      let isLastPage: boolean = false;
      
      try {
        counter = counter + 1;
        console.log('-counter-', counter);

        // set default value marked = true for items
        // await setStatusItemNoParsed();
        // return;

        await execute(() => getOEItem(itemNoItrmId), processOeItem, undefined, abort.signal, itemNoItrmId);
        await setStatusItemParsed(itemNoItrmId.itemNo);
        
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
          console.log('oe relations created error', error);
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
    res.end(JSON.stringify({message: `OE Relations created`}));
  }