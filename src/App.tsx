import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import i18n from "i18next";;
import Home from './pages/Home/Home';
import { lazy } from 'react';
import { initReactI18next } from 'react-i18next';
import transitionAR from "./transition/ar.json";
import transitionEn from "./transition/en.json";

const NotFound=lazy(()=>import("./component/NotFound/NotFound"));




function App() {

  const router=createBrowserRouter([
    {path:"",element:<Home/>},
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
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
