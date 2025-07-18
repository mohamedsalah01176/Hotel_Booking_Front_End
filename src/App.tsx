import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import i18n from "i18next";;
import Home from './pages/Home';
import { lazy } from 'react';
import { initReactI18next } from 'react-i18next';
import transitionAR from "./transition/ar.json";
import transitionEn from "./transition/en.json";
import Layout from './pages/Layout';
import PropertyDetails from './pages/PropertyDetails';

const NotFound=lazy(()=>import("./pages/NotFound"));
const Register=lazy(()=>import("./pages/Register"));
const Login=lazy(()=>import("./pages/Login"));
const ResetPassword=lazy(()=>import("./pages/ResetPassword"));





function App() {

  const router=createBrowserRouter([
    {path:"",element:<Layout/>,children:[
      {path:"",element:<Home/>},
      {path:"/home",element:<Home/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"resetPassword",element:<ResetPassword/>},
      {path:"propertyDetails/:id",element:<PropertyDetails/>},
      {path:"*",element:<NotFound/>,}
    ]}
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
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
