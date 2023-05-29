import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Catalog {
    @Expose()
    typeId: number;
    @Expose()
    groupId: number;
    @Expose()
    groupCode: string;
    @Expose()
    subGroupCode: string;
    @Expose()
    count: number;
  }