import { useTranslation } from "react-i18next";
import Footer from "../component/Footer.tsx";
import Navbar from "../component/Navbar/Navbar.tsx"; 
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import { useEffect } from "react";

const LayoutUser = () => {
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
    <>
      <main dir={i18n.language === "en" ?"ltr":"rtl"} lang={i18n.language === "en" ?"en":"ar"}> 
        <Navbar />
        <ToastContainer  position={i18n.language === "ar"?`top-left`:"top-right"}  />
        <Outlet />
        {!["/login","/register"].includes(pathname)
        &&
        <Footer/>
        }
      </main>
    </>
  );
};

export default LayoutUser;
