// import { FaBars } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import { TokenContext } from "../../util/TokenContext";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../../interface/user";


const Menue = ({i18n,setOpentMenue,token,handleLogout}:{i18n:{language:string},setOpentMenue:(v:boolean)=>void,token:string,handleLogout:()=>void}) => {
  const url =useLocation();
  const {t}=useTranslation();
  const {decode,setDecode}=useContext(TokenContext)
  useEffect(()=>{
    if(token){
      const decodedUser=jwtDecode(token) as JwtPayload;
      setDecode(decodedUser)
    }
  },[setDecode])

  return (
    <div className={`bg-white min-h-[10px] min-w-[200px] z-50 shadow absolute py-2 top-14 ${i18n.language === "en"?"right-0 md:-right-7":"left-0 md:-left-7"}  rounded-xl`}>
      <div className={`border-[15px] w-[20px] border-t-transparent border-l-transparent border-r-transparent border-b-white absolute -top-7  ${i18n.language === "en" ?"left-[165px] md:left-[140px]":"right-[165px] md:right-[140px]"} `}></div>
      {url.pathname !== "/home" &&
        <Link onClick={()=>setOpentMenue(false)} to={"/home"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className="text-black font-medium">{t("navbar.home")}</p>
        </Link>
      }
      {decode.role !== "user" && token &&
      <Link onClick={()=>setOpentMenue(false)} to={"/dashboard"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
        {/* <FaBars className="text-black "/> */}
        <p className="text-black font-medium">{t("navbar.dashboard")}</p>
      </Link>
      }
      <Link onClick={()=>setOpentMenue(false)} to={"/contactUs"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
        {/* <FaBars className="text-black "/> */}
        <p className="text-black font-medium">{t("navbar.contactUs")}</p>
      </Link>
      <Link onClick={()=>setOpentMenue(false)} to={"/"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
        {/* <FaBars className="text-black "/> */}
        <p className="text-black font-medium">{t("navbar.term")}</p>
      </Link>
      {url.pathname !== "/login" && url.pathname !== "/register" && token &&
        <Link onClick={()=>setOpentMenue(false)} to={"/setting"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className="text-black font-medium">{t("navbar.setting")}</p>
        </Link>
      }
      {token &&
        <button onClick={()=>{handleLogout()}}  className={`flex justify-center gap-2 items-center p-2.5 w-full  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className=" font-medium text-red-700">{t("navbar.logout")}</p>
        </button>
      }
    </div>
  )
}

export default Menue