import axios from "axios";
import type { TFunction } from "i18next"
import { useContext } from "react";
import type { Range } from "react-date-range";
import { toast } from "react-toastify";
import { TokenContext } from "../../util/TokenContext";

interface IProps {
  t: TFunction;
  setOpenConfirm: (val: boolean) => void;
  propertyId: string;
  range:Range [];
  reserved: boolean;
  setReserved: (val: boolean) => void;
}
const ConfirmMessage = ({t,setOpenConfirm,propertyId,range,reserved,setReserved}:IProps) => {
  const {token}=useContext(TokenContext)
  const confirm=async()=>{
    try{
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/reserve/${propertyId}`,{startDate:range[0].startDate,endDate:range[0].endDate},{headers:{Authorization:`Bearer ${token}`}});
        console.log(response)
        if(response.data.status === "success"){
          toast.success(response.data.message);
          setReserved(!reserved)
          setOpenConfirm(false)
        }
    }catch(errors){
      console.log(errors)
    }
  }
  return (
    <div className='fixed w-full h-full bg-black/20 flex justify-center items-center z-20 animate-fade-in'>
      <div className="bg-white px-7 py-14 w-[300px] md:w-[600px] min-h-[200px] relative rounded-xl">
        <h2 className="text-center text-2xl font-semibold">{t("propertyDetails.confirm.title")}</h2>
        <p className="text-xl font-normal my-7 text-center">{t("propertyDetails.confirm.message")}</p>
        <div className="flex justify-center  items-center gap-10">
          <button onClick={confirm} className="w-[150px] cursor-pointer p-3 bg-[#e77008] text-lg rounded-xl font-medium hover:bg-[#02717e] transition-all duration-300 text-white">{t("propertyDetails.confirm.btn1")}</button>
          <button onClick={()=>setOpenConfirm(false)} className=" p-3 cursor-pointer w-[150px] bg-gray-300 text-black font-medium text-lg hover:bg-gray-700 hover:text-white transition-all duration-300 rounded-xl">{t("propertyDetails.confirm.btn2")}</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmMessage
