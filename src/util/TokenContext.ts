import { createContext } from "react";

interface ITokenContext {
  token:string,
  setToken:(val:string)=>void
}

export const TokenContext=createContext<ITokenContext>({token:"",setToken:()=>{}});