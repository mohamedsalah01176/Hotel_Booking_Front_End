import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import i18n from "i18next";;
import Home from './pages/Home';
import { lazy } from 'react';
import { initReactI18next } from 'react-i18next';
import transitionAR from "./transition/ar.json";
import transitionEn from "./transition/en.json";
import LayoutUser from './Layout/LayoutUser';
import PropertyDetails from './pages/PropertyDetails';
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"
import ProviderContext from './context/ProviderContext';
import Dashboar from './pages/host/Dashboar';
import LayoutHost from './Layout/LayoutHost';
import AddListing from './pages/host/AddListing';
import Listings from './pages/host/Listings';
import Customers from './pages/host/Customers';
import Calender from './pages/host/Calender';


const Register=lazy(()=>import("./pages/Register"));
const Login=lazy(()=>import("./pages/Login"));
const ResetPassword=lazy(()=>import("./pages/ResetPassword"));
const NotFound=lazy(()=>import("./pages/NotFound"));
const Setting=lazy(()=>import("./pages/Setting"));
const PrivacyAndTerm=lazy(()=>import("./pages/PrivacyAndTerm"));
const SearchResult=lazy(()=>import("./pages/SearchResult"));
const ContactUs=lazy(()=>import("./pages/ContactUs"));


function App() {
  const queryClient =new QueryClient()
  const router=createBrowserRouter([
    {path:"",element:<LayoutUser/>,children:[
      {path:"",element:<Home/>},
      {path:"home",element:<Home/>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login/>},
      {path:"resetPassword",element:<ResetPassword/>},
      {path:"propertyDetails/:id",element:<PropertyDetails/>},
      {path:"setting",element:<Setting/>},
      {path:"contactUs",element:<ContactUs/>},
      {path:"searchResults",element:<SearchResult/>},
      {path:"privacyTerm",element:<PrivacyAndTerm/>},
      {path:"*",element:<NotFound/>,}
    ]},
    {path:"dashboard",element:<LayoutHost/>,children:[
      {path:"",element:<Dashboar/>},
      {path:"addListing",element:<AddListing/>},
      {path:"listings",element:<Listings/>},
      {path:"customers",element:<Customers/>},
      {path:"calender/:propertyId",element:<Calender/>},
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
      <ProviderContext>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}/>
        </QueryClientProvider>
      </ProviderContext>
    </div>
  )
}

export default App
