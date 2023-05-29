import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Mark {
    @Expose()
    markId: number;
    @Expose()
    mark: string;
    @Expose()
    marked: boolean;
  }
  