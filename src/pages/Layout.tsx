import { Outlet } from "react-router"
import Footer from "../component/Footer"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ToastContainer } from "react-toastify"
import Navbar from "../component/Navbar/Navbar"

const Layout = () => {
  const {i18n}=useTranslation();
  useEffect(()=>{},[i18n])
  return(
      <div dir={i18n.language === "en" ?"ltr":"rtl"} lang={i18n.language === "en" ?"en":"ar"}className="">
        <ToastContainer  position={i18n.language === "ar"?`top-left`:"top-right"}  />
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
  )
}

export default Layout
