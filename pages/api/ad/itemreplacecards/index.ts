import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IPicture, IReplaceRelation } from '../itemcards/itemCard';
import { ICritecia, IItem } from '../items/items';
import { plainToInstance } from 'class-transformer';
import { ItemCard, Picture } from '../itemcards/itemCard.dto';
import { Criteria, Stock } from '../items/items.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';
import { criteriaToICriteria, getItemCard, itemToIItem, pictureToIPicture, ReturnItemToIItemType, saveToDbPictures, saveToDbReplaceRelations } from '../itemcards/index';


  export const processItemReplaceCard = _with(async (response, signal, typeIdGroupId) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
      const _plainData = await response.json();
      // console.log(_plainData);
      let _data = plainToInstance(ItemCard, _plainData as Object);

      if (_data.item === null && _data.files === null && _data.replaces ===null) {
        return;
      }

      let _dataItem = _data.item;
      let _dataCriterias = plainToInstance(Criteria, _data.item.criterias as Object[]);
      let _dataFiles = plainToInstance(Picture, _data.files as Object[]);
      let _dataReplaces = _data.replaces;
      
      let _dbCriterias: ICritecia[] = criteriaToICriteria(_dataCriterias);
      let _dbPictures: IPicture[] = pictureToIPicture(_dataFiles);

      let _rez: ReturnItemToIItemType = itemToIItem(_dataReplaces, _dataItem);
      let _dbReplaceRelations: IReplaceRelation[] =_rez.iReplaseRelation || [];

    
      await saveToDbReplaceRelations(_dbReplaceRelations);
      await saveToDbPictures(_dbPictures);
      await updateItemReplaceCriteria(_data.item.itemNo, _dbCriterias);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)


  let updateItemReplaceCriteria = async (itemNo: string, criterias: ICritecia[]) => {
    if (itemNo && criterias) {
      await prisma.itemReplace.update({
        where:{
          itemNo: itemNo
        },
        data: {
          criterias: criterias as unknown as Prisma.JsonArray
        }
      }).catch(() => {
        throw new Error('Failed update ItemReplace criterials db');
      })
    } else {
      throw new Error('ItemReplace for update criteria is null');
    }
  }

  let setStatusParsedItemReplace = async (itemNo: string) => {
    await prisma.itemReplace.update({
      where: {
        itemNo: itemNo
      },
      data: {
        marked: false
      }
    })
  }

  let setStatusUnparsedItemReplaceAll = async () => {
    await prisma.itemReplace.updateMany({
      where: {
        marked: {
          equals: false
        }
      },
      data:{
        marked: true
      }
    })
  }


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
    const abort = new AbortController;
    once(req.socket, 'close').then(() => {
     abort.abort(new Error('Socket closed'));
    });

    // set default status for all itemsReplace. Only for start parsing
    // await setStatusUnparsedItemReplaceAll()
    // return;

  /**
   * Work with table ItemReplase
   */
    const itemReplaseArrObj =  await prisma.itemReplace.findMany({
        where: {
          marked: true
        },
        select: {
          itemNo: true
        }
      })


    let counter = 0;

    for(let item of itemReplaseArrObj) {
   
      let isLastPage: boolean = false;
      
      try {
        counter = counter + 1;
        console.log('-counter-', counter);

        await execute(() => getItemCard(item.itemNo), processItemReplaceCard, undefined, abort.signal, item.itemNo);
        await setStatusParsedItemReplace(item.itemNo);
        
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
          console.log('itemsReplaceCard created error', error);
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
    res.end(JSON.stringify({message: `ItemsReplaceCard created`}));
  }