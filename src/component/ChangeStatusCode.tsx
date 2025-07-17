import { FaArrowLeftLong } from "react-icons/fa6";
import { BiMessage } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";


const ChangeStatusCode = ({setOpenCode,phone}:{setOpenCode:(val:string)=>void,phone:string}) => {
  const [sendType,setSendType]=useState<string>("");
  const {t,i18n}=useTranslation()

  const verfiyCode=async()=>{
    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendCode`,
            {phone:phone,type:sendType},
            {
              headers:{
                'Content-Type':'application/json',
              }
            }
          )
          if(res.data.status === 'success'){
            if(i18n.language === "en"){
              toast.success(res.data.meessageEn);
            }else{
              toast.success(res.data.meessageAr);
            }
            setTimeout(()=>{
              setOpenCode("sendCode");
            },2000)
          }
          console.log(res)
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className="z-10 fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-full w-full bg-gray-800/20 flex justify-center items-center animate-fade-in">
      <div className="relative bg-white pt-5 pb-1 rounded-xl w-[300px] sm:w-[500px] min-h-[250px] ">
              <div onClick={()=>setOpenCode("sendCode")} className="border-b border-gray-800 px-4 pb-4 text-center relative">
                <FaArrowLeftLong  className=" cursor-pointer hover:text-red-700  hover:-translate-x-2 transition-all duration-300 text-2xl absolute top-0 left-5 "/>
                <h2 className="font-semibold text-lg">{t("more_options.title")}</h2>
              </div>
              <div className="py-7">
                <p className="mb-2 px-4 text-[18px] font-medium">{t("more_options.subtitle")} {phone || t("NotFoundNumber")}:</p>
                <p className="text-sm px-4 text-gray-600 mb-8">{t("more_options.turn_on_notifications")}</p>
                <div onClick={()=>setSendType("sms")} className={`flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 px-9 py-5 cursor-pointer ${sendType === "sms" && "bg-gray-100"}`}>
                  <BiMessage className="text-2xl" />
                  <div> 
                    <h2 className="font-medium mb-1">{t("more_options.methods.sms.title")}</h2>
                    <p className="text-sm text-gray-600">{t("more_options.methods.sms.description")}</p>
                  </div>
                </div>
                <div onClick={()=>setSendType("whatsApp")} className={`flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 px-9 py-5 cursor-pointer ${sendType === "whatsApp" && "bg-gray-100"}`}>
                  <FaWhatsapp className="text-2xl" />
                  <div> 
                    <h2 className="font-medium mb-1">{t("more_options.methods.whatsapp.title")}</h2>
                    <p className="text-sm text-gray-600 ">{t("more_options.methods.whatsapp.description")}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center h-[75px] border-t px-5 border-gray-300 mt-5">
                <button onClick={verfiyCode} disabled={sendType === ""}  className={`px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition-all duration-300 cursor-pointer ${sendType === "" && "cursor-not-allowed"}`}>{t("more_options.resend_code")}</button>
              </div>
            </div>
    </div>
  )
}

export default ChangeStatusCode