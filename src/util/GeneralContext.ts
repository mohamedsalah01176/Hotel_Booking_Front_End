import { createContext } from "react";
import type { IProperty } from "../interface/property";

interface IGeneralContext {
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
  sharedProperties:IProperty[];
  setSharedProperties:(val:IProperty[])=>void
  searchResults:IProperty[];
  setSearchResults:(val:IProperty[])=>void
}
export const GeneralContext=createContext<IGeneralContext>({sharedProperties:[],setSharedProperties:()=>{},currentSection:"",setCurrentSection:()=>{},searchResults:[],setSearchResults:()=>{}});