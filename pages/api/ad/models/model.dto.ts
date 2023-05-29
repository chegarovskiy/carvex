import 'reflect-metadata';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class Model {
    @Expose()
    markId: number;
    @Expose()
    modelId: number;
    @Expose()
    model: string;
    @Expose()
    modelRange: string;
  }