import { Outlet, useLocation } from "react-router"
import ManagerNavbar from "../component/Navbar/ManagerNavbar"
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const LayoutManager = () => {

  const {i18n}=useTranslation();
  useEffect(()=>{

  },[i18n])

  const {pathname}=useLocation();
  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
  })
  },[pathname])
  return (
    <div dir={i18n.language === "en" ?"ltr":"rtl"} lang={i18n.language === "en" ?"en":"ar"}>
    <ManagerNavbar/>
    <Outlet/>
    </div>
  )
}

export default LayoutManager