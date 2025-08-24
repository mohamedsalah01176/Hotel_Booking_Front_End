import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router";
import { toast } from 'react-toastify';
import Cookie from "js-cookie"

const CodeNumber = ({setOpenCode,phone}:{setOpenCode:(d:string)=>void,phone:string}) => {
  const [codeValue,setCodeValue]=useState("");
  const [errorMessage,setrrorMessage]=useState("");
  const {t,i18n}=useTranslation();
  const {pathname} =useLocation();
  const nav=useNavigate();
  const router=useNavigate();
  const verfiyCode=async()=>{
    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/verfyCode`,
        {code:codeValue,phone},
        {
          headers:{
            'Content-Type':'application/json',
          }
        }
      );
      console.log(res)
      if(res.data.status === "success"){
        toast.success(t("register.toast.welcome"));
        Cookie.set("token",res.data.token)
        setTimeout(()=>{
          if(pathname === "/register"){
            router("/home")
          }else{
            router(pathname)
          }
          setOpenCode("")
        },1500)
      }else{
        toast.error(t("register.toast.invalid_code"))
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(errors:any){
      console.log(errors,"eeeeeeeeeeee");
      if(i18n.language === "en"){
        setrrorMessage(errors.response.data.messageEn)
      }else{
        setrrorMessage(errors.response.data.messageAr)
      }
    }
  }

  console.log(pathname)
  const handleCloseContainer=()=>{
    setOpenCode("");
    if(pathname === "/register"){
      nav("/home")
    }
  }
  return (
    <div className="z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-full w-full bg-gray-800/20 flex justify-center items-center animate-fade-in">
      <div className="relative bg-white pt-5 pb-1 rounded-xl w-[300px] sm:w-[500px] min-h-[250px] ">
        <div onClick={handleCloseContainer} className="border-b border-gray-800 px-4 pb-4 text-left">
          <FaArrowLeftLong  className=" cursor-pointer hover:text-red-700  hover:-translate-x-2 transition-all duration-300 text-2xl mr-[93%]"/>
        </div>
        <div className="px-4 py-7">
          <p className="mb-4 text-[18px]">{t("register.verify.enter_code")} {phone || t("NotFoundNumber")}:</p>
          <input maxLength={6} type="text" onChange={(e)=>{setCodeValue(e.target.value);setrrorMessage("")}} placeholder="--- ---" style={{ letterSpacing: '0.65em' }}  className="border-[1px] tracking-widest border-gray-800 px-4 py-3 rounded-xl  w-[150px] "/>
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </div>
        <div className="flex justify-between items-center h-[75px] border-t px-5 border-gray-300 mt-5">
          <button className="underline font-semibold cursor-pointer" onClick={()=>setOpenCode("changeStatus")}>{t("register.verify.choose_option")}</button>
          <button onClick={()=>verfiyCode()} className="px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition-all duration-300 cursor-pointer">{t("register.verify.continue")}</button>
        </div>
      </div>
    </div>
  )
}

export default CodeNumber