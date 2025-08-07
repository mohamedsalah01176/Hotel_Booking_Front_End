import { useContext, useEffect, useState } from "react";
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TokenContext } from "../util/TokenContext";
// import { GenerateDatesRange } from "../util/GenerateDatesRange";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import CodeNumber from "../component/CodeNumber";
import ChangeStatusCode from "../component/ChangeStatusCode";
import ConfirmMessage from "../component/Calender/ConfirmMessage";

const generateMonthDays = (monthDate: Date) => {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  return eachDayOfInterval({ start, end });
};



const Calender = () => {
  const propertyId="68824206bef74a19eb7bbdc9";
  const [openSendCode,setOpenSendCode]=useState<string>("");
  const {t,i18n}=useTranslation()
  const [month, setMonth] = useState(new Date());
  const { token } = useContext(TokenContext);
  const [disableDates, setDisableDates] = useState<Date[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const days = generateMonthDays(month);
  const startWeekDay = startOfMonth(month).getDay();
  const emptyStart = Array.from({ length: startWeekDay });
  const nav = useNavigate();
  const [openConfirm,setOpenConfirm]=useState(false);


  const goToPrevMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1));
  const goToNextMonth = () =>
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1));

  const getAllDates = () => {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/reserve/${propertyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data } = useQuery({
    queryKey: ["calender"],
    queryFn: getAllDates,
  });
  const property=data?.data?.property
  useEffect(() => {
    
    if (property?.reserveDates?.length > 0) {
        const allDates: Date[] = [];

        for (let i = 0; i < property.reserveDates.length; i++) {
          const datesArray = property.reserveDates[i].dates;

          for (let j = 0; j < datesArray.length; j++) {
            const date = new Date(datesArray[j]);
            allDates.push(date);
          }
        }

        setDisableDates(allDates); 
        console.log("Disabled Dates:", allDates);
      }
      console.log(data)
  }, [data]);

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isBeforeToday = date < today;

    const isReserved = disableDates.some(
      (disabled) => disabled.toDateString() === date.toDateString()
    );

    return isBeforeToday || isReserved;
  };

  const toggleDateSelection = (date: Date) => {
    const isSelected = selectedDates.some(
      (selected) => selected.toDateString() === date.toDateString()
    );

    if (isSelected) {
      setSelectedDates((prev) =>
        prev.filter((selected) => selected.toDateString() !== date.toDateString())
      );
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }
  };


  
  const handleReserve=async()=>{
    try{
      if(token){
        const userDecode = jwtDecode<{ phoneVerfy: boolean }>(token);
        console.log(userDecode)   
        if(userDecode.phoneVerfy === true){
          console.log("ddddddddddddd")
          setOpenConfirm(true)
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
    }catch(errors){
      console.log(errors)
    }
  }
  console.log(selectedDates);

  return (
      <div className="min-h-screen bg-white flex justify-center px-2 sm:px-4 py-6 sm:py-10">
        {openSendCode === "sendCode"?
        <CodeNumber setOpenCode={setOpenSendCode} phone={property.admin.phone} />:
        openSendCode === "changeStatus"?
        <ChangeStatusCode setOpenCode={setOpenSendCode} phone={property.admin.phone} />:
        null
        }
        {openConfirm && <ConfirmMessage t={t} i18n={i18n} nigthCount={selectedDates.length} nigthPrice={data?.data?.nightPrice} setOpenConfirm={setOpenConfirm} propertyId={propertyId} range={selectedDates}/>}
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 px-2 sm:px-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            {format(month, "MMMM yyyy")}
          </h1>

          <div className="flex justify-center sm:justify-start">
            <button
              onClick={handleReserve}
              disabled={selectedDates.length === 0}
              className={`px-6 py-2 rounded-full font-bold text-white transition
                ${selectedDates.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#02717e] hover:bg-[#04525b] cursor-pointer"}
              `}
            >
              Confirm Booking
            </button>
          </div>

          {/* أزرار التنقل */}
          <div className="flex justify-center sm:justify-end space-x-2">
            <button
              onClick={goToPrevMonth}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              ◀
            </button>
            <button
              onClick={goToNextMonth}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              ▶
            </button>
          </div>
        </div>


          {/* Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-4 text-center text-xs sm:text-sm">
            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-medium text-gray-400">{day}</div>
            ))}

            {/* Empty spaces before start */}
            {emptyStart.map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days of month */}
            {days.map((date) => {
              const disabled = isDateDisabled(date);
              const selected = selectedDates.some(
                (d) => d.toDateString() === date.toDateString()
              );

              return (
                <div
                  key={date.toISOString()}
                  onClick={() => {
                    if (!disabled) toggleDateSelection(date);
                  }}
                  className={`aspect-square rounded-xl sm:rounded-2xl border border-gray-200 p-1 sm:p-2 flex flex-col justify-center items-center transition
                    ${
                      disabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selected
                        ? "bg-[#02717e] text-white cursor-pointer"
                        : "bg-white hover:bg-gray-100 cursor-pointer"
                    }`}
                >
                  <div className="font-semibold text-sm">{date.getDate()}</div>
                  {!disabled && (
                    <div className="text-[10px] sm:text-xs text-gray-200">
                      ${data?.data?.nightPrice}$
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
  );
};

export default Calender;
