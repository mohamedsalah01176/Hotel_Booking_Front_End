import axios from "axios";
import type { TFunction } from "i18next"
import { useContext } from "react";
// import type { Range } from "react-date-range";
import { toast } from "react-toastify";
import { TokenContext } from "../../util/TokenContext";
import type { i18n as i18nType  } from "i18next";

interface IProps {
  t: TFunction;
  i18n:i18nType
  setOpenConfirm: (val: boolean) => void;
  propertyId: string;
  range:Date [] ;
  reserved: boolean;
  setReserved: (val: boolean) => void;
  nigthCount:number;
  nigthPrice:number;
  setCustomLoading: (val: boolean) => void;
}
const ConfirmMessage = ({t,i18n,setOpenConfirm,propertyId,range,reserved,setReserved,nigthCount,nigthPrice,setCustomLoading}:IProps) => {
  const {token}=useContext(TokenContext);
  const formattedPrice = new Intl.NumberFormat(i18n.language === "ar" ? "ar-EG" : "en-US").format(nigthCount*nigthPrice);
  const confirm=async()=>{
    setCustomLoading(true)
    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reserve/${propertyId}`,{dates:range},{headers:{Authorization:`Bearer ${token}`}});
      console.log(response)
      if(response.data.status === "success"){
          setCustomLoading(false)
          toast.success(response.data.message);
          setReserved(!reserved)
          setOpenConfirm(false)
        }
    }catch(error){
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;

      toast.error(i18n.language == "en"?err.response.data.messageEn:err.response.data.message)
      console.log(error)
    }
  }
  return (
    <div className='fixed w-full h-full bg-black/20 flex justify-center items-center z-10 animate-fade-in translate-y-[-10%]'>
      <div className="bg-white px-7 py-14 w-[300px] md:w-[600px] min-h-[200px] relative rounded-xl">
        <h2 className="text-center text-2xl font-semibold">{t("propertyDetails.confirm.title")}</h2>
        <p className="text-xl font-normal my-7 text-center">{t("propertyDetails.confirm.message")}</p>
        <p className="text-3xl text-center mt-7">{t("propertyDetails.total")} <span className="font-semibold underline">{t("propertyDetails.price",{price:formattedPrice})}</span> </p>
        <p className="text-lg font-medium text-center mb-10 text-gray-700">{t("propertyDetails.nights",{count:nigthCount})}</p>
        <div className="flex justify-center  items-center gap-10">
          <button onClick={confirm} className="w-[150px] cursor-pointer p-3 bg-[#e77008] text-lg rounded-xl font-medium hover:bg-[#02717e] transition-all duration-300 text-white">{t("propertyDetails.confirm.btn1")}</button>
          <button onClick={()=>setOpenConfirm(false)} className=" p-3 cursor-pointer w-[150px] bg-gray-300 text-black font-medium text-lg hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-xl">{t("propertyDetails.confirm.btn2")}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmMessage
