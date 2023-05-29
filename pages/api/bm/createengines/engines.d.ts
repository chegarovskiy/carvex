export interface Engine {
    cylinders: number
    engine_volume: number
    engine_type: string
    engine_hourses: number
    engine_power: number
    uuid_mark: string
    uuid_model: string
  }
  
 export interface Engines {
    car_engines: Engine[]
  }