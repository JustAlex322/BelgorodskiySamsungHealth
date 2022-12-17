export interface IsmallDataAboutDiets {
    id : number
    label : string
    description : string
    dishes? : null
}

export interface Ifilters {
    dietId : number
    typeOfMeal : string
    mealTime : string
}

export type IsmallDataAboutDietsArr = Array<IsmallDataAboutDiets>

