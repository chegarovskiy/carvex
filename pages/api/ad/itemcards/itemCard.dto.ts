import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';
import { Item } from '../items/items.dto';

@Exclude()
export class ItemCard {
    @Expose()
    files: Picture[];
    @Expose()
    item: Item;
    
    @Expose()
    replaces: Item[];
}

@Exclude()
export class Picture {
    @Expose()
    itemNo: string;
    @Expose()
    pathName: string;
    @Expose()
    fileName: string;
}

