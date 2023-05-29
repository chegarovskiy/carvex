import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IItem, IRelation, ITypeGroup } from './items';
import { plainToInstance } from 'class-transformer';
import { Item, Stock, TypeGroup } from './items.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';


export async function getItem(typeId: number, groupId: number, signal?: AbortSignal) {
    // console.log('page', modelId);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/Car/CatalogItems/?` + new URLSearchParams({
        typeId: typeId.toString(),
        groupId: groupId.toString()
    }),
      {
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/Car/CatalogItems/?`, error);
      });
    return dynamicRes;
  }

  export const processItem = _with(async (response, signal, typeIdGroupId) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
  
      const _plainData = await response.json();
      let _data = plainToInstance(Item, _plainData as Object[]);
      
      let _dbItems: IItem[] = [];
      let _dbRelations: IRelation[] = [];

      _data.map(item => { 

        let json = JSON.parse(item.stock);
        let arrStor = plainToInstance(Stock, json.Stock as Object[]);

        let vn: string = '';
        let kvOne: string = '';
        let kvTwo: string = '';
        let Kh: string = '';

        // let priceStr = item.price.toString().length >= 11 ? ;
        // let retailStr = item.retail.toFixed().toString();
        
        arrStor.forEach(e => {
          
            switch(e.L) {
                case 'ВНЦ1':
                    vn = e.Q;
                case 'КИЕВ2':
                    kvTwo = e.Q;
                case 'КИЕВ1':
                    kvOne = e.Q;
                case 'ХМЛ1':
                    Kh = e.Q;
            }
        });

        let _dbItem: IItem = {

            brand: item.brand, 
            firstPic: item.firstPic,
            criterias: item.criterias,
            description: item.description,
            groupCode: item.groupCode,
            subGroupCode: item.subGroupCode,
            itemNo: item.itemNo,
            itemNo2: item.itemNo2,
            price: item.price.toString().length >= 13 ? 0 : item.price,
            retail: item.retail.toString().length >= 13 ? 0 : item.price,
            searchDescription: item.searchDescription,
            discontinued: item.discontinued,
            inStock: item.inStock,
    
            vn: vn,
            kvOne: kvOne,
            kvTwo: kvTwo,
            Kh: Kh,
    
            marked: true
        };
        // console.log('_dbModel', _dbVehicl);
        
        let _typeIdGroupId = plainToInstance(TypeGroup, typeIdGroupId as Object);
        _dbItems.push(_dbItem);
        let _dbRelation: IRelation = {
          itemNo: item.itemNo,
          groupId: _typeIdGroupId.groupId,
          typeId: _typeIdGroupId.typeId,
          itemId: 0
        }
        _dbRelations.push(_dbRelation);
      })

      // console.log('_dbItems', _dbItems);
      // console.log('_dbRelations', _dbRelations);
      await saveToDbItems(_dbItems);
      await saveToDbRelations(_dbRelations);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  let saveToDbItems = async(items: IItem[] | null) => {
    if(items) {
      await prisma.item.createMany({
        data: items,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting Items to db');
      })
    } else {
      throw new Error('Items is null');
    }
  }

  let saveToDbRelations = async(relations: IRelation[] | null) => {
    if(relations) {
      await prisma.relation.createMany({
        data: relations,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting Items to db');
      })
    } else {
      throw new Error('Items is null');
    }
  }
  let setStatusParsed = async (typeId: number, groupId: number) => {
    await prisma.catalog.update({
      where: {
        typeId_groupId: {
          typeId: typeId,
          groupId: groupId
        }
      },
      data: {
        marked: false
      }
    })
  }
  let setStatusUnparsedCatalog = async () => {
    await prisma.catalog.updateMany({
      where: {
        marked: {
          equals: false
        }
      },
      data: {
        marked: true
      }
    })
  }
  let delateAllRelations = async () => {
    await prisma.relation.deleteMany({})
  }


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
    const abort = new AbortController;
    once(req.socket, 'close').then(() => {
     abort.abort(new Error('Socket closed'));
    });

    
    // setStatusUnparsedCatalog();
    // delateAllRelations();
    // return;
   
    const typeIdArrObj =  await prisma.vehicl.findMany({
      where: {
        markId: 0
      },
      select: {
        typeId: true
      }
    })

    // console.log('_markId_typeIdArr', _markId_typeIdArr);
  
    const typeIdGroupIdArr = await prisma.catalog.findMany({
      where: {
        // typeId: { in: typeIdArr },
        marked: true
      },
      select: {
        typeId: true,
        groupId: true
      }
    })
    // console.log(typeIdGroupIdArr.length);
    
    let counter = 0;
    
    for(let typeIdGroupId of typeIdGroupIdArr) {
  
      let isLastPage: boolean = false;
      
      try {
        counter = counter + 1;
        console.log('-counter-', counter);
        
        await execute(() => getItem(typeIdGroupId.typeId, typeIdGroupId.groupId), processItem, undefined, abort.signal, typeIdGroupId);
        await setStatusParsed(typeIdGroupId.typeId, typeIdGroupId.groupId);
        
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
    res.end(JSON.stringify({message: `Items created`}));
    
    
  }