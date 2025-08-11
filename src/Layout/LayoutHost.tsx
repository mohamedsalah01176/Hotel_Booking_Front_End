import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router"
import Navbar from "../component/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const LayoutHost = () => {
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
      <ToastContainer
        position={i18n.language === "ar" ? "top-left" : "top-right"}
      />
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default LayoutHost