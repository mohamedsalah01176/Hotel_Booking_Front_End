import {  useState, type ReactNode } from "react"
import { GeneralContext } from "../util/GeneralContext";
import { TokenContext } from "../util/TokenContext";
import type { IProperty } from "../interface/property";
import type { JwtPayload } from "../interface/user";



const ProviderContext = ({children}:{children:ReactNode}) => {
  const [currentSection,setCurrentSection]=useState<string>("home");
  const [token,setToken]=useState<string>("");
  const [decode,setDecode]=useState<JwtPayload>({});
  const [sharedProperties,setSharedProperties]=useState<IProperty[]>([]);


  return (
    <TokenContext.Provider value={{token,setToken,decode,setDecode}}>
        <GeneralContext.Provider value={{currentSection,setCurrentSection,sharedProperties,setSharedProperties}}>
          {children}
        </GeneralContext.Provider>
    </TokenContext.Provider>
  )
}

export default ProviderContext