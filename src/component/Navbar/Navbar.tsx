import SearchBar from "./SearchBar";

import { MdTranslate } from "react-icons/md";
import { FaBars } from "react-icons/fa6";
import Cookie from "js-cookie"
import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import Menue from "./Menue";

import logoImage from "../../assets/logo.webp"
import { TokenContext } from "../../util/TokenContext";
import HomeLinkes from "./HomeLinkes";
import DashboardLinks from "./DashboardLinks";

const Navbar = () => {
  const [language,setLanguage]=useState<string>("");
  const {i18n}=useTranslation()
  const [openMenue,setOpentMenue]=useState<boolean>(false);
  const {t}=useTranslation()
  const url =useLocation();
  const {token,setToken}=useContext(TokenContext)
  const handleLogout =useCallback(()=>{
    Cookie.remove("token")
    setToken("")
    setOpentMenue(false)
  },[setToken])


  useEffect(() => {
    const saved = localStorage.getItem("lang") || "en";
    setLanguage(saved);
    i18n.changeLanguage(saved);

  }, [i18n,language]);
  useEffect(()=>{
    const tokenCookie=Cookie.get("token");
    console.log(tokenCookie)
    if(tokenCookie){
      setToken(tokenCookie);
    }
  },[Cookie.get("token")])

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    setLanguage(newLang);
  };



  return (
    <div className="sticky top-0 left-0 w-full py-4 bg-[#f7f7f7] pt-7  z-10 border-b-2 border-[#e0dede7a]">
      <section className="flex justify-between items-start md:items-center w-[98%] md:w-[90%] mx-auto">
        <Link to={'/home'} className="text-xl sm:text-3xl font-semibold hover:scale-110 transition-all duration-300 outline-0">
          <img loading="lazy" src={logoImage} alt="logo" className="w-[70px]" width={70} height={70}/>
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-7 md:gap-16">
          {url.pathname.includes("/dashboard")?
          <DashboardLinks />
          :
          <HomeLinkes t={t}/>
          }
          {!token?
            <div className="flex items-center ">
              <Link to={"/register"} className="text-black font-medium px-2  hover:scale-105 transition-all duration-300 underline italic">
                {t("register.title")}
              </Link>
              <div className="h-[25px] w-[3px] bg-black"></div>
              <Link to={"/login"} className="text-black font-medium px-2  hover:scale-105 transition-all duration-300 underline italic">
                {t("login.title")}
              </Link>
            </div>
            :
            null
          }
        </div>
        <div className="flex items-center gap-2 sm:gap-7 ">
          <MdTranslate className="text-2xl cursor-pointer w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#f2f2f2] p-[7px] hover:scale-105 transition-all duration-300 " onClick={()=>toggleLanguage()}/>
            <div className="relative">
              <FaBars className="text-2xl cursor-pointer w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] rounded-full bg-[#f2f2f2] p-[7px] hover:scale-105 transition-all duration-300 "  onClick={()=>setOpentMenue(!openMenue)}/>
              {openMenue && <Menue i18n={i18n} setOpentMenue={setOpentMenue} token={token} handleLogout={handleLogout}/> }
            </div>
          
        </div>
        
      </section>
      {(url.pathname === "/home" || url.pathname === "/")
      &&
      <div className="block px-6 py-2 mt-2">
        <SearchBar />
      </div>
      }
    </div>

  );
};

export default Navbar;
