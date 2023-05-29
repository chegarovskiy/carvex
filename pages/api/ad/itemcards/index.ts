import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IPicture, IReplaceRelation } from './itemCard';
import { ICritecia, IItem } from '../items/items';
import { plainToInstance } from 'class-transformer';
import { ItemCard, Picture } from './itemCard.dto';
import { Criteria, Item, Stock } from '../items/items.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';


export async function getItemCard(itemNo: string, signal?: AbortSignal) {
    console.log('itemNo', itemNo);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/Items/ItemCard`,
      {
        body: JSON.stringify(itemNo),
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/Items/ItemCard`, error);
      });
    return dynamicRes;
  }

  export const processItemCard = _with(async (response, signal, typeIdGroupId) => {
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

      let _dbCriterias: ICritecia[] = [];
      let _dbPictures: IPicture[] = [];
      let _dbRelationItems: IItem[] = [];
      let _dbReplaceRelations: IReplaceRelation[] = [];


      _dataCriterias && _dataCriterias.map(criteria => {
        let _dbCriteria: ICritecia = {
          itemNo: criteria.itemNo,
          criteria: criteria.criteria,
          value: criteria.value
        }
        _dbCriterias.push(_dbCriteria);
      })

      _dataFiles && _dataFiles.map(file => {
        let _db_picture: IPicture = {
          itemNo: file.itemNo,
          itemId: 0,
          pathName: file.pathName,
          fileName: file.fileName,
          myUrl: ''
        }
        _dbPictures.push(_db_picture);
      }); 

     

      _dataReplaces && _dataReplaces.map(itemReplace => { 

        let json = JSON.parse(itemReplace.stock);
        let arrStor = plainToInstance(Stock, json.Stock as Object[]);

        let vn: string = '';
        let kvOne: string = '';
        let kvTwo: string = '';
        let Kh: string = '';
        
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

        let _dbItemReplace: IItem = {

            brand: itemReplace.brand, 
            firstPic: itemReplace.firstPic,
            criterias: itemReplace.criterias,
            description: itemReplace.description,
            groupCode: itemReplace.groupCode,
            subGroupCode: itemReplace.subGroupCode,
            itemNo: itemReplace.itemNo,
            itemNo2: itemReplace.itemNo2,
            price: itemReplace.price.toString().length >= 13 ? 0 : itemReplace.price,
            retail: itemReplace.retail.toString().length >= 13 ? 0 : itemReplace.price,
            searchDescription: itemReplace.searchDescription,
            discontinued: itemReplace.discontinued,
            inStock: itemReplace.inStock,
    
            vn: vn,
            kvOne: kvOne,
            kvTwo: kvTwo,
            Kh: Kh,
    
            marked: true
        };
        // console.log('_dbItemReplace', _dbItemReplace);
        _dbRelationItems.push(_dbItemReplace);
        
        let _dbReplaceRelation: IReplaceRelation = {
          itemNo: _dataItem.itemNo,
          itemReplaceNo: _dbItemReplace.itemNo,
          itemId: 0,
          itemReplaceNoId: 0
        }

        _dbReplaceRelations.push(_dbReplaceRelation);
      })

      await saveToDbItemsReplace(_dbRelationItems);
      await saveToDbReplaceRelations(_dbReplaceRelations);
      
      await saveToDbPictures(_dbPictures);
      await updateItemCriteria(_data.item.itemNo, _dbCriterias);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  export let criteriaToICriteria = (criterias: Criteria[]) => {
    let _dbCriterias: ICritecia[] = [];
    if (criterias) {
      criterias.map(criteria => {
        let _dbCriteria: ICritecia = {
          itemNo: criteria.itemNo,
          criteria: criteria.criteria,
          value: criteria.value
        }
        _dbCriterias.push(_dbCriteria);
      })
    }
    return _dbCriterias;
  }

  export let pictureToIPicture = (dataFiles: Picture[]) => {
    let _dbPictures: IPicture[] = [];
    if (dataFiles) {
      dataFiles.map(file => {
        let _db_picture: IPicture = {
          itemNo: file.itemNo,
          itemId: 0,
          pathName: file.pathName,
          fileName: file.fileName,
          myUrl: ''
        }
        _dbPictures.push(_db_picture);
      })
    }
    return _dbPictures;
  }

  export type ReturnItemToIItemType = {iItem:IItem[] | null, iReplaseRelation: IReplaceRelation[] | null};

  export let itemToIItem = (dataReplaces: Item[], _dataItem: Item): ReturnItemToIItemType => {
    let _rez: ReturnItemToIItemType = {iItem: null, iReplaseRelation: null};
    let _dbRelationItems: IItem[] = [];
    let _dbReplaceRelations: IReplaceRelation[] = [];

    if (dataReplaces) {
      dataReplaces.map(itemReplace => { 

        let json = JSON.parse(itemReplace.stock);
        let arrStor = plainToInstance(Stock, json.Stock as Object[]);

        let vn: string = '';
        let kvOne: string = '';
        let kvTwo: string = '';
        let Kh: string = '';
        
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

        let _dbItemReplace: IItem = {

            brand: itemReplace.brand, 
            firstPic: itemReplace.firstPic,
            criterias: itemReplace.criterias,
            description: itemReplace.description,
            groupCode: itemReplace.groupCode,
            subGroupCode: itemReplace.subGroupCode,
            itemNo: itemReplace.itemNo,
            itemNo2: itemReplace.itemNo2,
            price: itemReplace.price.toString().length >= 13 ? 0 : itemReplace.price,
            retail: itemReplace.retail.toString().length >= 13 ? 0 : itemReplace.price,
            searchDescription: itemReplace.searchDescription,
            discontinued: itemReplace.discontinued,
            inStock: itemReplace.inStock,
    
            vn: vn,
            kvOne: kvOne,
            kvTwo: kvTwo,
            Kh: Kh,
    
            marked: true
        };
        // console.log('_dbItemReplace', _dbItemReplace);
        _dbRelationItems.push(_dbItemReplace);
        
        
        let _dbReplaceRelation: IReplaceRelation = {
          itemNo: _dataItem.itemNo,
          itemReplaceNo: _dbItemReplace.itemNo,
          itemId: 0,
          itemReplaceNoId: 0
        }

        _dbReplaceRelations.push(_dbReplaceRelation);
      })
      _rez.iItem = _dbRelationItems;
      _rez.iReplaseRelation = _dbReplaceRelations;
    }
    return _rez;
  }

  export let saveToDbItemsReplace = async(itemsReplace: IItem[] | null) => {
    if(itemsReplace) {
      for(let itemReplace of itemsReplace) {
        

        let itemRe =  await prisma.item.findUnique({
          where: {
            itemNo: itemReplace.itemNo
          },
          select: {
            itemNo: true
          }
        }).catch(() => {
          throw new Error('Failed findUnique Item in db');
        });
        // console.log('itemRe',itemRe);

        if (itemRe === null) {
          await prisma.itemReplace.upsert({
            where: {
              itemNo: itemReplace.itemNo
            },
            update: {},
            create: {
              brand: itemReplace.brand, 
              firstPic: itemReplace.firstPic,
              criterias: itemReplace.criterias,
              description: itemReplace.description,
              groupCode: itemReplace.groupCode,
              subGroupCode: itemReplace.subGroupCode,
              itemNo: itemReplace.itemNo,
              itemNo2: itemReplace.itemNo2,
              price: itemReplace.price,
              retail: itemReplace.retail,
              searchDescription: itemReplace.searchDescription,
              discontinued: itemReplace.discontinued,
              inStock: itemReplace.inStock,
      
              vn: itemReplace.vn,
              kvOne: itemReplace.kvOne,
              kvTwo: itemReplace.kvTwo,
              Kh: itemReplace.Kh,
      
              marked: itemReplace.marked
              
            }
            
          }).catch(() => {
            throw new Error('Failed wrighting Items Rplace db');
          })
        }
      }
 
    } else {
      throw new Error('Items Replace is null');
    }
  }

  export let updateItemCriteria = async (itemNo: string, criterias: ICritecia[]) => {
    if (itemNo && criterias) {
      await prisma.item.update({
        where:{
          itemNo: itemNo
        },
        data: {
          criterias: criterias as unknown as Prisma.JsonArray
        }
      }).catch(() => {
        throw new Error('Failed update Item criterials db');
      })
    } else {
      throw new Error('Item for update criteria is null');
    }
  }

  export let saveToDbReplaceRelations = async(replaceRelations: IReplaceRelation[] | null) => {
    if(replaceRelations) {
      await prisma.replaceRelation.createMany({
        data: replaceRelations,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting replaceRelations to db');
      })
    } else {
      throw new Error('replaceRelations is null');
    }
  }

  export let saveToDbPictures = async(pictures: IPicture[] | null) => {
    if(pictures) {

      await prisma.picture.createMany({
        data: pictures,
        skipDuplicates: true
      }).catch(() => {
        throw new Error('Failed wrighting pictures to db');
      })
    } else {
      throw new Error('pictures is null');
    }
  }

  export let setStatusParsedItem = async (itemNo: string) => {
    await prisma.item.update({
      where: {
        itemNo: itemNo
      },
      data: {
        marked: false
      }
    })
  }

  export let setStatusUnparsedItemAll = async () => {
    await prisma.item.updateMany({
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

    // set default status for all items. Only for start parsing
    // await setStatusUnparsedItemAll()
    // return;


  /**
   * Work with table Item
   */
    const itemArrObj =  await prisma.item.findMany({
        where: {
          marked: true
        },
        select: {
          itemNo: true
        }
      })


    let counter = 0;

    for(let item of itemArrObj) {
   
      let isLastPage: boolean = false;
      
      try {
        counter = counter + 1;
        console.log('-counter-', counter);

        await execute(() => getItemCard(item.itemNo), processItemCard, undefined, abort.signal, item.itemNo);
        await setStatusParsedItem(item.itemNo);
        
        
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
          console.log('itemsCard created error', error);
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
    res.end(JSON.stringify({message: `ItemsCard created`}));
  }