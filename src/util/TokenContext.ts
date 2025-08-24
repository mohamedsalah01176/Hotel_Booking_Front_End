import { createContext } from "react";
import type { JwtPayload } from "../interface/user";




interface ITokenContext {
  token:string,
  setToken:(val:string)=>void
  decode:JwtPayload,
  setDecode:(val:JwtPayload)=>void
}

export const TokenContext=createContext<ITokenContext>({token:"",setToken:()=>{},decode:{createdAt:""},setDecode:()=>{}});