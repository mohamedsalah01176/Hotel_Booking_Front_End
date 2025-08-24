import { useContext, type JSX } from "react"
import { TokenContext } from "./TokenContext"
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../interface/user";

const ProtectedRoute = ({children}:{children:JSX.Element}) => {
  const {token}=useContext(TokenContext);

  if(!token){
    return <Navigate to="/login" replace/>
  }
  
  try{
    const decode:JwtPayload=jwtDecode(token);
    if(decode.role !== "host" && decode.role !== "manager"){
      return <Navigate to="/login" replace/>
    }
  }catch{
    
    return <Navigate to="/login" replace/>
  }
  return children
}

export default ProtectedRoute
