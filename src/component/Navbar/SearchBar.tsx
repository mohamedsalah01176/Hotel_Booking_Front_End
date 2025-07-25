import {  useState } from "react";
import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { IProperty } from "../../interface/property";
import SearchItem from "./SearchItem";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [searchProperty,setsearchProperty]=useState<IProperty[]>([])
  function getAllProperties(){
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/property`);
  }
  const propertyResponse=useQuery({
    queryKey:["allProperties"],
    queryFn:getAllProperties,
    staleTime:240000
  })

  const handleSearsh=(val:string)=>{
    const searchProperty=propertyResponse.data?.data.properties.filter((item:IProperty)=>item.location.city.toLowerCase().includes(val) )
    setsearchProperty(searchProperty);
    if(val === ""){
      setsearchProperty([])
    }
  }
  return (
    <div className="flex justify-center h-[55px] relative">
        <div className="absolute top-14 left-[50%] translate-x-[-50%] min-h-fit overflow-hidden w-[350px] md:w-[520px] bg-white  rounded-xl ">
          {searchProperty.map((item:IProperty)=><div className="w-full"><SearchItem key={item._id} item={item}/></div>)}
        </div>
      {/* {searchProperty.length>0 &&
      } */}
      <div className="flex justify-between items-center bg-white border border-gray-300 shadow-md rounded-full max-w-lg w-full pr-4 transition-all duration-300">
        <div className="flex w-full">
          <div className={`flex-2 basis-2/5 hover:bg-gray-100 hover:rounded-full px-10 cursor-pointer p-1  ${isRTL ? "border-l" : "border-r"} border-gray-300 transition-all duration-300` }>
            <span className="text-sm font-bold block">{t("search.where")}</span>
            <input
              type="text"
              onChange={(e)=>handleSearsh(e.target.value)}
              placeholder={t("search.destination")}
              className=" text-gray-500 outline-none bg-transparent w-full "
            />
          </div>
        </div>
        <div className="bg-[#f67808] text-white p-3 rounded-full ml-2 transition-all duration-300 hover:bg-[#02717e]">
          <IoSearch size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
