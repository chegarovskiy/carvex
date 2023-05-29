import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Vehicle {
    @Expose()
    markId: number;
    @Expose()
    modelId: number;
    @Expose()
    typeId: number;
    @Expose()
    typeName: string;
    @Expose()
    typeRange: string;
    @Expose()
    engines: string;
    @Expose()
    kw: string;
    @Expose()
    hp: string;
    @Expose()
    ccmTech: number;
    @Expose()
    capacity: number;
    @Expose()
    cylinders: number;
    @Expose()
    valve: number;
    @Expose()
    fuel: string;
    @Expose()
    engineType: string;
    @Expose()
    fuelPreparation: string;
    @Expose()
    bodyType: string;
    @Expose()
    driveType: string;
    @Expose()
    mark: string;
    @Expose()
    model: string;
  }