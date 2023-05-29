export interface ModelCar {
    year_end: number
    uuid: string
    uuid_brand: string
    name: string
    year_begin: number
    marked: boolean
  }
  
 export interface ModelsCar {
    car_models: ModelCar[]
  }