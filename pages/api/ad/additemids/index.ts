import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';


const itemSelect = {
  itemNo: true,
  itemId: true
} satisfies Prisma.ItemSelect;

const itemReplaceSelect = {
  itemNo: true,
  itemReplaceNoId: true
} satisfies Prisma.ItemReplaceSelect;

type AllItemType = {
  itemNamber: string,
  itemId: number
}

type ItemPayload = Prisma.ItemGetPayload<{select: typeof itemSelect}>;
type ItemReplacePayload = Prisma.ItemReplaceGetPayload<{select: typeof itemReplaceSelect}>;



let updateId = async(items: AllItemType[]) => {
  let count1 = 0;

  if(items) {
    
    for(let item of items) {

      console.log('count1-',count1);
      count1 = count1 + 1

      /**
     * update in replaceRelation
     */
      await prisma.replaceRelation.updateMany({
        where: {
          itemReplaceNo: item.itemNamber
        },
        data: {
          itemReplaceNoId: item.itemId
        }
        }).catch(() => {
            throw new Error('Failed update itemReplaceNoId in replaceRelation by Item and ItemReplace');
          })

      await prisma.replaceRelation.updateMany({
        where: {
          itemNo: item.itemNamber
        },
        data: {
          itemId: item.itemId
        }
        }).catch(() => {
            throw new Error('Failed update itemId in replaceRelation');
          })

     /**
     * update in Relation
     */
      await prisma.relation.updateMany({
        where: {
          itemNo: item.itemNamber
        },
        data: {
          itemId: item.itemId
        }
        }).catch(() => {
            throw new Error('Failed update itemId in Relation');
          })

      /**
       * update in picture
       */
      await prisma.picture.updateMany({
        where: {
            itemNo: item.itemNamber
        },
        data: {
            itemId: item.itemId
        }
        }).catch(() => {
            throw new Error('Failed update itemId in Pictures');
          })

        /**
       * update in oeRelation
       */
      await prisma.oeRelation.updateMany({
        where: {
            itemNo: item.itemNamber
        },
        data: {
            itemId: item.itemId
        }
        }).catch(() => {
            throw new Error('Failed update itemId in OeRelation');
          })
    }


  } else {
    throw new Error('items is null');
  }
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  
    const abort = new AbortController;
    once(req.socket, 'close').then(() => {
     abort.abort(new Error('Socket closed'));
    });


    const items = await prisma.item.findMany({
        select: itemSelect
    });
    console.log('items', items.length);
    

    const itemsReplace = await prisma.itemReplace.findMany({
        select: itemReplaceSelect
    });
    console.log('itemsReplace', itemsReplace.length);

   

    let allItems: AllItemType[]  = [];

    let itemsReplaseArr = itemsReplace.map(item => {
      let temp: AllItemType = {
        itemNamber: item.itemNo,
        itemId: item.itemReplaceNoId
      } 
      return temp;
    })
    let allItemsArr = items.map(item => {
      let temp: AllItemType = {
        itemNamber: item.itemNo,
        itemId: item.itemId
      } 
      return temp;
    })

    allItems = allItemsArr.concat(itemsReplaseArr)
    console.log('allItems', allItems.length);

    let counter = 0;
    let isLastPage: boolean = false;
    
    try {
    
      await updateId(allItems);
      
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
        console.log('add items id error', error);
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
    res.end(JSON.stringify({message: `add items id OK`}));
  }