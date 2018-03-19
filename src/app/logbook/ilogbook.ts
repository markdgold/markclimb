export interface Igradebook {
  Grade:string,
  count: {
    Flash:number,
    "Second Go":number,
    Redpoint:number
  }
}

export interface ILogbook {
  Name: string,
  Grade: number,
  Location: string,
  Date: Date,
  Tries: string,
}