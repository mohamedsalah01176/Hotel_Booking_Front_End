import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import { useTranslation } from "react-i18next";
import {  useNavigate, useSearchParams } from "react-router";
import image from "../assets/resetpassword.webp"



const ResetPassword = () => {
  const [passwordValidation,setPasswordValidation]=useState<string>("");
  const [confirmPasswordValidation,setconfirmPasswordValidation]=useState<string>("");
  const [errorMessage,setErrorMessage]=useState<string>("");
  const [isloading,setisloading]=useState<boolean>(false);
  const {t,i18n}=useTranslation();
  const [searchParams]=useSearchParams();
  const nav=useNavigate();
  const email=searchParams.get("email");


  const handlePasswordValidaion=(value:string)=>{
    console.log(value)
    const passwordRGX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(passwordRGX.test(value)){
      setPasswordValidation(value)
    }else{
      setPasswordValidation("Password Not Valid")
    }
    console.log(passwordRGX.test(value))
  }

  const handleComfirmPasswordValidaion=(value:string)=>{
    console.log(value)
    const passwordRGX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(passwordRGX.test(value)){
      setconfirmPasswordValidation(value)
      if(passwordValidation === value ){
        setErrorMessage("");
      }else{
        setErrorMessage("The Password not match");
      }
    }else{
      setconfirmPasswordValidation("Password Not Valid")
    }
  }
  const handleForgetPasswordForm=async()=>{
    // e.preventDefault();
    setisloading(true)
    try{
      if(passwordValidation === confirmPasswordValidation){
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/resetPassword`,
          {
            emailOrPhone:email,
            password:passwordValidation
          },
          {
            headers:{
              "Content-Type":"application/json"
            }
          }
        );
        console.log(res)
        if(res.data.status === "success"){
          setisloading(false)
          if(i18n.language === "en"){
            toast.success(res.data.messageEn);
          }else{
            toast.success(res.data.messageAr);
          }
          setTimeout(()=>{
            nav("/login")
          },1500)
        }
      }else{
        setisloading(false)
        setErrorMessage("The Password not match")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err:any){
      setisloading(false)
      toast.error(err.response.data.message);
      console.log(err)
      
    }
  }
  return (
    <div className="min-h-[90vh] flex justify-center items-center px-10">
      <div  className="flex justify-center items-center flex-col gap-4 w-[300px] md:w-[400px] mt-[120px] md:mt-0 ">
        <h1 className="text-4xl font-semibold text-center mb-5 ">{t("resetPassword.title")}</h1>
        <div className="w-full">
          <label className={`text-lg font-normal `}  htmlFor="password">{t("resetPassword.newpassword")}</label>
          <input name="password" onChange={(e)=>handlePasswordValidaion(e.target.value)}  id="email" type="password" className={`mt-1 w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${passwordValidation.includes("Not") &&  "placeholder:text-red-600 border-red-600"}  focus:scale-105 transition-all duration-300 hover:scale-105`} placeholder={t("resetPassword.placeholders.newPassword")} />
          { passwordValidation.includes("Not") &&
          <p className="text-red-500 text-sm">{i18n.language ==="en"?passwordValidation:"كلمه السر غير صالح"}</p>
          }
        </div>
        <div className="w-full">
          <label className={`text-lg font-normal `}  htmlFor="email">{t("resetPassword.confirm")}</label>
          <input name="email" onChange={(e)=>handleComfirmPasswordValidaion(e.target.value)}  id="email" type="password" className={`mt-1 w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${confirmPasswordValidation.includes("Not") &&  "placeholder:text-red-600 border-red-600"}  focus:scale-105 transition-all duration-300 hover:scale-105`} placeholder={t("resetPassword.placeholders.confirmPassword")} />
          { confirmPasswordValidation.includes("Not") &&
          <p className="text-red-500 text-sm">{i18n.language ==="en"?passwordValidation:"كلمه السر غير صالح"}</p>
          }
          { errorMessage &&
          <p className="text-red-500 text-sm">{i18n.language ==="en"?errorMessage:"كلمه السر غير متظابقه"}</p>
          }
        </div>

        <button onClick={handleForgetPasswordForm} type="button" className={`mt-3 w-full px-7 flex justify-center items-center gap-3 bg-gray-800 text-white  p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300`}>
          {isloading &&
          <Spinner/>
          }
          {t("login.buttons.send")}
        </button>
      </div>
      <img loading="lazy" src={image} alt="login" width="550" height="600" className="rounded-xl hidden md:block mt-10"/>
    </div>
  )
}

export default ResetPassword