import { useState, type ReactNode } from "react"
import { GeneralContext } from "../util/GeneralContext";
import { TokenContext } from "../util/TokenContext";
import type { IProperty } from "../interface/property";



const ProviderContext = ({children}:{children:ReactNode}) => {
  const [currentSection,setCurrentSection]=useState<string>("home");
  const [token,setToken]=useState<string>("");
  const [sharedProperties,setSharedProperties]=useState<IProperty[]>([]);

  return (
    <TokenContext.Provider value={{token,setToken}}>
        <GeneralContext.Provider value={{currentSection,setCurrentSection,sharedProperties,setSharedProperties}}>
          {children}
        </GeneralContext.Provider>
    </TokenContext.Provider>
  )
}

export default ProviderContext