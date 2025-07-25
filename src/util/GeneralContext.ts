import { createContext } from "react";
import type { IProperty } from "../interface/property";

interface IGeneralContext {
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  sharedProperties:IProperty[],
  setSharedProperties:React.Dispatch<React.SetStateAction<IProperty[]>>
}

export const GeneralContext=createContext<IGeneralContext>({currentSection:"",setCurrentSection:()=>{},sharedProperties:[],setSharedProperties:()=>{}});