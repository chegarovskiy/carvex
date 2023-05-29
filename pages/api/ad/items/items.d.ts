export interface ICritecia {
    criteria: String
    itemNo: String
    value: String
}

export interface IItem{
    brand: string
    firstPic: string
    criterias: ICriteria[]
    description: string
    groupCode: string
    subGroupCode: string
    itemNo: string
    itemNo2: string
    price: number
    retail: number
    searchDescription: string
    discontinued: boolean
    inStock: boolean

    vn: string
    kvOne: string
    kvTwo: string
    Kh: string

    marked: boolean
}
export interface IRelation {
    typeId: number
    groupId: number 
    itemNo: string
    itemId: number
}

export interface ITypeGroup {
    typeId: number
    groupId: number 
}


