import {  useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import type { IProperty } from "../../interface/property";
import SearchItem from "./SearchItem";
import { GeneralContext } from "../../util/GeneralContext";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TokenContext } from "../../util/TokenContext";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const {token}=useContext(TokenContext)
  const isRTL = i18n.language === "ar";
  const [searchProperty,setsearchProperty]=useState<IProperty[]>([]);
  const {sharedProperties}=useContext(GeneralContext);
  const nav=useNavigate()

  const getAllDisableDates=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/allReservedDates`,{headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`,
        }})
  }
  const {data}=useQuery({
    queryKey:["getAllDisableDates"],
    queryFn:getAllDisableDates,
    staleTime: 5400000,
  })

  const disableDates =data?.data.disableDates?.flatMap((item:[]) =>
    item?.flat()
  );
  console.log(disableDates,"sssssssss")
  const handleSearch=(val:string,type:string)=>{
    if(type === "where"){
      const searchProperty=sharedProperties?.filter((item:IProperty)=>item.location.city.toLowerCase().includes(val) );
      setsearchProperty(searchProperty);
    }else if(type === "date"){
      console.log(new Date(val).getDate())
      const searchProperty=disableDates?.filter((item:{dates:Date[]})=>!item.dates.some(d =>  new Date(d).toISOString().split("T")[0] === new Date(val).toISOString().split("T")[0]));
      console.log(searchProperty)
      // setsearchProperty(searchProperty);
      
    }else if(type === "guests" ){
      const searchProperty=sharedProperties?.filter((item:IProperty)=>item.guestNumber<= Number(val));
      setsearchProperty(searchProperty);
    }else{
      setsearchProperty([]);
    }
    if(val === ""){
      setsearchProperty([]);
    }
  }


  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    localStorage.setItem("searchProperty",JSON.stringify(searchProperty))
    nav("/searchResults");
  }
  return (
    <div className="mt-8 md:mt-20  flex justify-center min-h-[55px] relative w-full">
  {searchProperty.length > 0 && (
    <div className="absolute top-[70px] left-1/2 -translate-x-1/2 w-full max-w-4xl bg-white rounded-xl shadow-md z-50 max-h-[500px] overflow-y-scroll modal-scroll">
      {searchProperty.map((item: IProperty) => (
        <div key={item._id} className="w-full">
          <SearchItem key={item._id} item={item} />
        </div>
      ))}
    </div>
  )}

  <form
    onSubmit={handleSubmit}
    className={`flex flex-col md:flex-row justify-between items-center  bg-white border border-gray-300 shadow-md rounded-2xl md:rounded-full max-w-4xl w-full md::w-[80%] lg:w-[75%]    pb-2 md:pb-0 transition-all duration-300 gap-1 md:gap-0`}
  >
    <div className="flex flex-row w-full gap-2 md:gap-0 ">
      <div className="flex w-full md:w-1/2">
        <div
          className={`flex-1 hover:bg-gray-100 rounded-none  md:hover:rounded-full px-3 md:px-5 py-2 md:py-3 cursor-pointer border-b-1 md:border-0 border-gray-300 ${
            isRTL ? "md:border-l" : "md:border-r"
          } md:border-gray-300 transition-all duration-300`}
        >
          <span className="text-sm font-bold block">{t("search.where")}</span>
          <input
            type="text"
            aria-label="Destination"
            onChange={(e) => handleSearch(e.target.value,"where")}
            placeholder={t("search.destination")}
            className="text-gray-500 outline-none bg-transparent w-full"
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex w-full md:w-1/2">
        <div
          className={`flex-1 hover:bg-gray-100 rounded-none ${i18n.language ==="en"?"md:hover:rounded-r-full":"md:hover:rounded-l-full"} px-3 md:px-5 py-2 md:py-3 cursor-pointer border-b-1 md:border-0 border-gray-300 ${
            isRTL ? "md:border-l" : "md:border-r"
          } md:border-gray-300 transition-all duration-300`}
        >
          <span className="text-sm font-bold block">{t("search.date")}</span>
          <input
            type="date"
            aria-label="Date"
            onChange={(e) => handleSearch(e.target.value,"date")}
            className="text-gray-500 outline-none bg-transparent w-full"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
    </div>

    <div className="flex flex-row w-full justify-between gap-2 md:gap-0">
      <div className="flex w-full md:w-2/3">
        <div
          className={`flex-1 hover:bg-gray-100 rounded-none  ${i18n.language ==="en"?"md:hover:rounded-r-full":"md:hover:rounded-l-full"}  px-3 md:px-5 py-2 md:py-3 cursor-pointer border-b-1 md:border-0 border-gray-300 ${
            isRTL ? "md:border-l" : "md:border-r"
          } md:border-gray-300 transition-all duration-300`}
        >
          <span className="text-sm font-bold block">{t("search.guests")}</span>
          <input
            type="text"
            aria-label="Guests"
            onChange={(e) => handleSearch(e.target.value,"guests")}
            placeholder={t("search.guestsPlaceholder")}
            className="text-gray-500 outline-none bg-transparent w-full"
          />
        </div>
      </div>
        
      <div className=" w-1/2 md:w-1/3 flex justify-center items-center">
        <button
          title="search"
          type="submit"
          className="bg-[#f67808] flex items-center gap-2 text-white p-3.5 rounded-4xl w-fit mx-auto text-center  transition-all duration-300 hover:bg-[#02717e]"
        >
          <IoSearch size={20} />
          <span className="font-semibold hidden md:inline">{t("search.button")}</span>
        </button>

      </div>
    </div>
  </form>
</div>

  );
};

export default SearchBar;
