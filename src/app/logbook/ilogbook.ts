export interface IGradeCount {
  Grade:number,
  count: {
    Flash:number,
    "Second Go":number,
    Redpoint:number
  }
}

export interface IClimb {
  Id: string,
  Name: string,
  Grade: number,
  Location: string,
  Date: Date,
  Tries: string,
  Commment: string
}