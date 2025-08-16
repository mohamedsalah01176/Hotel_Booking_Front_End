import type { IProperty } from "./property";

interface IReserveDate {
  dates: string[];   // array of ISO date strings
  userId: string;
  _id: string;
}

export interface IPropertyWithReserves {
  property: IProperty;
  reserveDates: IReserveDate[];
}