import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class OeRelation {
    @Expose()
    itemNo: string;
    @Expose()
    search: string;
    @Expose()
    brand: string;
}