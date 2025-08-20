import  { useContext, useEffect, useState } from 'react'
import { format } from "date-fns";
import DateTable from '../DateTable';
import { IoDiamond } from "react-icons/io5";
import type { Range } from "react-date-range";
import type { IProperty } from '../../interface/property';
import type { i18n as i18nType  } from "i18next";
import type { TFunction } from "i18next";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ChangeStatusCode from '../ChangeStatusCode';
import CodeNumber from '../CodeNumber';
import { TokenContext } from '../../util/TokenContext';
// import { GenerateDatesRange } from '../../util/GenerateDatesRange';
import { isdateDisable } from '../../util/CkeckDisableDate';
import { jwtDecode } from "jwt-decode";

interface RightSideProps {
  property: IProperty;
  i18n: i18nType;
  t: TFunction;
  propertyId: string;
  setOpenConfirm: (val: boolean) => void;
  reserved: boolean;
  range: Range[];
  setRange: (val: Range[]) => void;
}

const RightSide = ({i18n,property,t,propertyId,setOpenConfirm,reserved,range,setRange}:RightSideProps) => {
  const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [openSendCode,setOpenSendCode]=useState<string>("");
  const {token}=useContext(TokenContext)
  const nav=useNavigate();
  const [disableDates,setDisAbleDates]=useState<Date[]>([])
  
  const formattedPrice = new Intl.NumberFormat(i18n.language === "ar" ? "ar-EG" : "en-US").format(property?.nightPrice);

  const handleReserve=async()=>{
    if(token){
      const userDecode = jwtDecode<{ phoneVerfy: boolean }>(token);
      console.log(userDecode)   
      if(userDecode.phoneVerfy === true){
        if(isdateDisable(range[0].startDate!,disableDates) || isdateDisable(range[0].endDate!,disableDates)){
          toast.error("This Date is Reserved")
        }else{
          setOpenConfirm(true)
        }
      }else{
        toast.error(t("propertyDetails.mustVerifyPhone"));
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendCode`,
          {phone:property.admin.phone},
          {
            headers:{
              'Content-Type':'application/json',
            }
          }
        )
        if(res.data.status === 'success'){
          toast.success(t("register.messages.codeSentSuccess"));
          setTimeout(()=>{
            setOpenSendCode("sendCode");
          },2000)
        }
      }
    }else{
      toast.error(t("propertyDetails.mustRegister"));
      setTimeout(()=>{
        nav("/login")
      },1500)
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    (async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/reserve/${propertyId}`,{
        headers:{
          "Authorization": `Bearer ${token}`
        }
      })
      
      console.log(data,"ddddddddddddddddddd")
      if (data?.property?.reserveDates?.length > 0) {
        const allDates: Date[] = [];

        for (let i = 0; i < data.property.reserveDates.length; i++) {
          const datesArray = data.property.reserveDates[i].dates;

          for (let j = 0; j < datesArray.length; j++) {
            const date = new Date(datesArray[j]);
            allDates.push(date);
          }
        }

        setDisAbleDates(allDates); 
        console.log("Disabled Dates:", allDates);
      }
    })();
  },[token,reserved])
  return (      
    <div className="sticky top-38 left-0">
      {openSendCode === "sendCode"?
        <CodeNumber setOpenCode={setOpenSendCode} phone={property.admin.phone} />:
        openSendCode === "changeStatus"?
        <ChangeStatusCode setOpenCode={setOpenSendCode} phone={property.admin.phone} />:
        null
        }
      <div className="bg-white p-7 shadow-xl rounded-xl flex gap-3 ">
        <IoDiamond className="text-xl text-[#f67808] "/>
        <p>{t("propertyDetails.rareFind")}</p>
      </div>
      <div className="p-5 bg-white mt-7 rounded-2xl shadow-xl max-w-[350px] mx-auto">
        <p className="underline text-2xl font-medium">{t("propertyDetails.price",{price:formattedPrice})}</p>
        <p className="text-gray-700 pb-2">{t("propertyDetails.forNights")}</p>
        <div className="flex justify-center relative">
          <div onClick={() => setOpen(true)} className={`w-[140px] border p-2 ${i18n.language === "en"?"rounded-tl-xl rounded-bl-xl":"rounded-tr-xl rounded-br-xl"}  cursor-pointer `}>
            <p className="text-sm font-semibold uppercase">{t("propertyDetails.checkin")}</p>
            <input title="checkin" type="text" readOnly value={format(range[0].startDate!,"yyyy-MM-dd")} className=" rounded-md  w-full outline-0" onClick={() => setOpen(true)} />
          </div>
          <div onClick={() => setOpen(true)} className={`w-[140px] border p-2 ${i18n.language === "en"?"rounded-tr-xl rounded-br-xl":"rounded-tl-xl rounded-bl-xl"}  cursor-pointer `}>
            <p className="text-sm font-semibold uppercase">{t("propertyDetails.checkout")}</p>
            <input title="checkin" type="text" readOnly value={format(range[0].endDate!,"yyyy-MM-dd")} className=" rounded-md w-full outline-0" onClick={() => setOpen(true)} />
          </div>
          {open && (
            <DateTable setOpen={setOpen} isMobile={isMobile} range={range} setRange={setRange} disableDates={disableDates} />
          )}
        </div>
        {reserved?
        <button disabled className="w-[260px] block mx-auto mt-5 p-3 text-xl font-medium bg-gradient-to-r from-[#f67808] to-[#c65f05]  text-white rounded-xl cursor-pointer hover:scale-110 transition-all duration-300">{t("propertyDetails.doneReserve")}</button>
        :
        <button onClick={handleReserve} className="w-[260px] block mx-auto mt-5 p-3 text-xl font-medium bg-gradient-to-r from-[#f67808] to-[#c65f05]  text-white rounded-xl cursor-pointer hover:scale-110 transition-all duration-300">{t("propertyDetails.reserve")}</button>
        }
        <p className="text-center mt-2 text-gray-600">{t("propertyDetails.notChargedYet")}</p>
      </div>
    </div>
  )
}

export default RightSide