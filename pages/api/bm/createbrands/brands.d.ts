export interface Brand {
    code: number
    marked: boolean
    uuid: string
    name: string
    models_url: string
  }
  
 export interface Brands {
    car_brands: Brand[]
  }