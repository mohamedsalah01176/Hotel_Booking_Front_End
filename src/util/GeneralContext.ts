import { createContext } from "react";

interface IGeneralContext {
  currentSection: string;
  setCurrentSection: React.Dispatch<React.SetStateAction<string>>;
}

export const GeneralContext=createContext<IGeneralContext>({currentSection:"",setCurrentSection:()=>{}});