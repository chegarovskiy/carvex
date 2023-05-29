import 'reflect-metadata';
import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
export class ItemCard {
    @Expose()
    item: Item;
    @Expose()
    pictures: string[];
    @Expose()
    @Type(()=> Item)
    replaces: Item[];   
}

@Exclude()
export class Criteria {
    @Expose()
    criteria: string;
    @Expose()
    itemNo: string;
    @Expose()
    value: string;
}

@Exclude()
export class Item {
    @Expose()
    brand: string;
    @Expose()
    firstPic: string;

    @Expose()
    @Type(()=> Criteria)
    criterias: Criteria[];

    @Expose()
    description: string;
    @Expose()
    groupCode: string;
    @Expose()
    subGroupCode: string;
    @Expose()
    itemNo: string;
    @Expose()
    itemNo2: string;

    @Expose()
    price: number;
    @Expose()
    retail: number;

    @Expose()
    searchDescription: string;
    @Expose()
    stock: string;
    @Expose()
    discontinued: boolean;
    @Expose()
    inStock: boolean;
}

@Exclude()
export class Stock {
    @Expose()
    L: string;
    @Expose()
    Q: string;
    @Expose()
    R: number;
}

@Exclude()
export class TypeGroup {
    @Expose()
    typeId: number;
    @Expose()
    groupId: number; 
}

