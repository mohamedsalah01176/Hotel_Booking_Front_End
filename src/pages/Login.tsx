import { useFormik } from "formik"
import image from "../assets/login.webp"
import * as yup from "yup"
import Spinner from "../component/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import cooke from "js-cookie";
import { useTranslation } from "react-i18next";
import { useState } from "react";



const Login = () => {
  const {t,i18n}=useTranslation();
  const [showForgetField,setShowForgetField]=useState<boolean>(false);
  const [emailOfForgetPasswordValidation,setEmailOfForgetPasswordValidation]=useState<string>("");
  const [isloading,setisloading]=useState<boolean>(false);
  const nav=useNavigate()
  const emailRGX =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRGX = /^\+?[1-9]\d{6,14}$/;
  const testFunction=(value:string)=>{
    return phoneRGX.test(value) || emailRGX.test(value)
  }
  const formik=useFormik({
    initialValues:{
      emailOrPhone:"",
      password:""
    },
    validationSchema:yup.object({
      emailOrPhone:yup.string().required(t("login.errors.emailOrPhoneRequired")).test("email-or-phone",t("login.errors.emailOrPhoneInvalid"),(value)=>testFunction(value)),
      password:yup.string().required(t("login.errors.passwordRequired")).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, t("login.errors.passwordPattern")),
    }),
    onSubmit:async(values)=>{
      console.log(values);
      try{
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/login`,
          values,
          {
            headers:{
              "Content-Type":"application/json"
            }
          }
        )
        if(res.data.status === "success"){
          cooke.set("token",res.data.token,{expires:60})
          toast.success(t("login.messages.loginSuccess") )
          setTimeout(()=>{
            nav('/home')
          },1500)
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(errors:any){
        console.log(errors);
        if(i18n.language === "en"){
          toast.error(errors.response.data.messageEn || t("login.messages.somethingWentWrong"))
        }else{
          toast.error(errors.response.data.messageAr || t("login.messages.somethingWentWrong"))
        }
        
      }
    }
  });

  const handleForgetPasswordValidaion=(value:string)=>{
      console.log(value)
      const emailRGX =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(emailRGX.test(value)){
        setEmailOfForgetPasswordValidation(value)
      }else{
        setEmailOfForgetPasswordValidation("Email Not Valid")
      }
  }
  const handleForgetPasswordForm=async()=>{
    // e.preventDefault();
    setisloading(true)
    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/forgetPassword`,
        {email:emailOfForgetPasswordValidation},
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      if(res.data.status === "success"){
        toast.success(res.data.message);
        setisloading(false)
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err:any){
      setisloading(false)
      toast.error(err.response.data.message)
      
    }
  }
  return (
    <>
    <div className="min-h-[80vh] flex justify-center items-center px-10 bg-[#ffffff]  ">
      {/* <ToastContainer /> */}
      <form onSubmit={formik.handleSubmit} className="w-[300px] md:w-[400px] mt-[120px] md:mt-0 ">
        <h1 className="text-4xl font-semibold text-center mb-5 ">{t("login.title")}</h1>
        <div >
          <label className={`text-lg font-normal `}  htmlFor="emailOrPhone">{t("login.labels.emailOrPhone")}</label>
          <input name="emailOrPhone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.emailOrPhone} id="emailOrPhone" type="text" className={`mt-1 w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.emailOrPhone && formik.errors.emailOrPhone && "placeholder:text-red-600 border-red-600"}  focus:scale-105 transition-all duration-300 hover:scale-105`} placeholder={t("login.placeholders.emailOrPhone")} />
          {formik.touched.emailOrPhone && formik.errors.emailOrPhone &&
              <p className="text-red-500 text-sm">{formik.errors.emailOrPhone}</p>
          }
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <label className={`text-lg font-normal `} htmlFor="password">{t("login.labels.password")}</label>
            <button onClick={()=>setShowForgetField(true)} type="button" className="underline font-medium  cursor-pointer">{t("resetPassword.forget")}</button>
          </div>
          <input name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id="password" type="password" className={`mt-1 w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.password && formik.errors.password && "placeholder:text-red-600 border-red-600"} focus:scale-105 transition-all duration-300 hover:scale-105`} placeholder={t("login.placeholders.password")} />
          {formik.touched.password && formik.errors.password &&
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
          }
        </div>
        
        <button type="submit" className="flex justify-center items-center gap-3 bg-gray-800 text-white w-[90%] mx-auto mt-5 p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300">
          {formik.isSubmitting &&
          <Spinner/>
        }
          {t("login.buttons.submit")}
        </button>
        <button className="mt-3 text-gray-700">{t("login.hoveNotAccount")}<Link to={'/register'} className="font-semibold underline text-black">{t("register.title")}</Link></button>
        {showForgetField &&
          <div  className="flex justify-center items-center flex-row gap-4 mt-10 ">
            <div>
              <label className={`text-lg font-normal $`}  htmlFor="email">{t("login.labels.email")}</label>
              <input name="email" onChange={(e)=>handleForgetPasswordValidaion(e.target.value)}  id="email" type="text" className={`mt-1 w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${emailOfForgetPasswordValidation.includes("Not") &&  "placeholder:text-red-600 border-red-600"}  focus:scale-105 transition-all duration-300 hover:scale-105`} placeholder={t("login.placeholders.email")} />
              { emailOfForgetPasswordValidation.includes("Not") &&
                <p className="text-red-500 text-sm">{t("Email Not Valid")}</p>
              }
            </div>

            <button onClick={handleForgetPasswordForm} type="button" className={`${emailOfForgetPasswordValidation.includes("Not")?"mt-3":"mt-7"} px-7 flex justify-center items-center gap-3 bg-gray-800 text-white  p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300`}>
              {isloading &&
              <Spinner/>
              }
              {t("login.buttons.send")}
            </button>
          </div>
        }
      </form>
      <img loading="lazy" src={image} alt="login" width="550" height="600" className="rounded-xl hidden md:block mt-10"/>
    </div>
    </>
  )
}

export default Login
