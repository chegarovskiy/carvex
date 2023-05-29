import { prisma } from '../../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { once } from 'events';
import { AResponseHandlerError, defaultHandler, execute, NotHandledError, NotFoundError, _with } from '../../../../helpers/api_helper';
import { createLoginRequestHeaders } from '../../../../variables/headers';
import { IVehicle} from './vehicles';
import { plainToInstance } from 'class-transformer';
import { Vehicle } from './vehicles.dto';
import { _AD_MARKED_MARKS } from '../../../../variables/brandsMarked';
import { Prisma } from '@prisma/client';


export async function getVehicles(page: number, modelId: number, signal?: AbortSignal) {
    // console.log('page', modelId);
    const dynamicRes: Response = await fetch(`https://ecom.ad.ua/api/car/vehicles`,
      {
        body: JSON.stringify(modelId),
        cache: 'no-store',
        credentials: 'include',
        headers: await createLoginRequestHeaders(),
        signal,
        method: 'POST'
        
      }).catch ((error) => {
        throw new Error(`Failed fetch request: https://ecom.ad.ua/api/car/vehicles`, error);
      });
    return dynamicRes;
  }

  export const processVehicles = _with(async (response, signal, uuid) => {
    if (200 <= response.status && response.status < 300) {
      console.log('200');
  
      const _plainData = await response.json();
      let _data = plainToInstance(Vehicle, _plainData as Object[]);
      console.log(_data);
      

      let _dbVehicles: IVehicle[] = [];

      _data.map(vehicl => {

        // vehicl.capacity.toFixed(1)

        let _dbVehicl: IVehicle = {
            markId: vehicl.markId,
            modelId: vehicl.modelId,
            typeId: vehicl.typeId,
            typeName: vehicl.typeName,
            typeRange: vehicl.typeRange,
            engines: vehicl.engines,
            kw: vehicl.kw,
            hp: vehicl.hp,
            ccmTech: vehicl.ccmTech,
            capacity: new Prisma.Decimal(vehicl.capacity),
            cylinders: vehicl.cylinders,
            valve: vehicl.valve,
            fuel: vehicl.fuel,  
            engineType: vehicl.engineType,
            fuelPreparation: vehicl.fuelPreparation,
            bodyType: vehicl.bodyType,
            driveType: vehicl.driveType,
            mark: vehicl.mark,
            model: vehicl.model,
        
            marked: true
          
        };
        // console.log('_dbModel', _dbVehicl);
        

        _dbVehicles.push(_dbVehicl);
      })

      // console.log('_dbModels', _dbVehicles);
      await saveToDb(_dbVehicles);

      return;
    }
    console.log(response.status);
    throw new NotHandledError(response);
  }, defaultHandler)

  let saveToDb = async(vehicles: IVehicle[] | null) => {
    if(vehicles) {
      await prisma.vehicl.createMany({
        data: vehicles,
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

    const modelsId =  await prisma.model.findMany({
        where: {
          marked: true
        },
        select: {
          modelId: true
        }
      })
    

    let counter = 0;
    for(let modelId of modelsId) {
      counter = counter + 1;
      console.log('counter', counter);
      if(counter % 100 === 100){
        setTimeout(()=>{
          console.log('timeOut');
          
        },10000)
      }
  
      let isLastPage: boolean = false;
      
      try {
        await execute(() => getVehicles(1, modelId.modelId), processVehicles, undefined, abort.signal, modelId.modelId);
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