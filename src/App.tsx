import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import i18n from "i18next";;
import Home from './pages/Home/Home';
import { lazy } from 'react';
import { initReactI18next } from 'react-i18next';
import transitionAR from "./transition/ar.json";
import transitionEn from "./transition/en.json";
import { ToastContainer } from 'react-toastify';

const NotFound=lazy(()=>import("./pages/NotFound/NotFound"));
const Register=lazy(()=>import("./pages/Register/Register"));
const Login=lazy(()=>import("./pages/Login/Login"));




function App() {

  const router=createBrowserRouter([
    {path:"",element:<Home/>},
    {path:"/home",element:<Home/>},
    {path:"register",element:<Register/>},
    {path:"login",element:<Login/>},
    {path:"*",element:<NotFound/>,}
  ])



  const resources={
    en:{
      translation: transitionEn
    },
    ar:{
      translation: transitionAR
    }
  }

  i18n
  .use(initReactI18next) 
  .init({

    resources,
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });
  
  return (
    <div dir={i18n.language === "en" ?"ltr":"rtl"} lang={i18n.language === "en" ?"en":"ar"}>
      <ToastContainer  position={i18n.language === "ar"?`top-left`:"top-right"}  />
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
