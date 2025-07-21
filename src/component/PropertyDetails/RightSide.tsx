import  { useEffect, useState } from 'react'
import { format } from "date-fns";
import DateTable from '../DateTable';
import { IoDiamond } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import type { Range } from "react-date-range";


const RightSide = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {i18n}=useTranslation()
  const [range,setRange]=useState<Range[]>([{
    startDate:new Date(),
    endDate:new Date(new Date().setDate(new Date().getDate() + 2)),
    key:"selection"
  }]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="sticky top-38 left-0">
      <div className="bg-white p-7 shadow-xl rounded-xl flex gap-3 ">
        <IoDiamond className="text-xl text-[#f67808] "/>
        <p>Rare find! This place is usually booked</p>
      </div>
      <div className="p-5 bg-white mt-7 rounded-2xl shadow-xl max-w-[350px] mx-auto">
        <p className="underline text-2xl font-medium">2,869 EG</p>
        <p className="text-gray-700">for 2 nights</p>
        <div className="flex justify-center relative">
          <div onClick={() => setOpen(true)} className={`w-[140px] border p-2 ${i18n.language === "en"?"rounded-tl-xl rounded-bl-xl":"rounded-tr-xl rounded-br-xl"}  cursor-pointer `}>
            <p className="text-sm font-semibold uppercase">Check-In</p>
            <input title="checkin" type="text" readOnly value={format(range[0].startDate!,"yyyy-MM-dd")} className=" rounded-md  w-full outline-0" onClick={() => setOpen(true)} />
          </div>
          <div onClick={() => setOpen(true)} className={`w-[140px] border p-2 ${i18n.language === "en"?"rounded-tr-xl rounded-br-xl":"rounded-tl-xl rounded-bl-xl"}  cursor-pointer `}>
            <p className="text-sm font-semibold uppercase">Checkout</p>
            <input title="checkin" type="text" readOnly value={format(range[0].startDate!,"yyyy-MM-dd")} className=" rounded-md w-full outline-0" onClick={() => setOpen(true)} />
          </div>
          {open && (
            <DateTable setOpen={setOpen} isMobile={isMobile} range={range} setRange={setRange}/>
          )}
        </div>
        <button className="w-[260px] block mx-auto mt-5 p-3 text-xl font-medium bg-gradient-to-r from-[#f67808] to-[#c65f05]  text-white rounded-xl cursor-pointer">Reserve</button>
        <p className="text-center mt-2 text-gray-600">You won't be charged yet</p>
      </div>
    </div>
  )
}

export default RightSide