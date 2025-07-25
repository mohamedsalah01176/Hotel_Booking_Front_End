import { useState, type ReactNode } from "react"
import { GeneralContext } from "../util/GeneralContext";
import { TokenContext } from "../util/TokenContext";



const ProviderContext = ({children}:{children:ReactNode}) => {
  const [currentSection,setCurrentSection]=useState<string>("home");
  const [token,setToken]=useState<string>("");

  return (
    <TokenContext.Provider value={{token,setToken}}>
        <GeneralContext.Provider value={{currentSection,setCurrentSection}}>
          {children}
        </GeneralContext.Provider>
    </TokenContext.Provider>
  )
}

export default ProviderContext