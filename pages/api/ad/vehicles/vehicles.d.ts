import { Prisma } from "@prisma/client";

export interface IVehicle {
    markId: number;
    modelId: number;
    typeId: number;
    typeName: string;
    typeRange: string;
    engines: string;
    kw: string;
    hp: string;
    ccmTech: number;
    capacity: Prisma.Decimal;
    cylinders: number;
    valve: number; 
    fuel: string;   
    engineType: string;
    fuelPreparation: string;
    bodyType: string;
    driveType: string;
    mark: string;
    model: string;

    marked: boolean;
  }