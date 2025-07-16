import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import transitionAR from "./transition/ar.json";
import transitionEN from "./transition/en.json";
import Layout from "./Layout/Layout.tsx";
import Home from "./pages/Home/Home";
import "./App.css";
import { lazy } from "react";

const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const resources = {
  en: { translation: transitionEN },
  ar: { translation: transitionAR },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    const lang = i18n.language;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [i18n.language]);

  return <RouterProvider router={router} />;
}

export default App;
