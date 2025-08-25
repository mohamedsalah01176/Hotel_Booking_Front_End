import { useCallback, useContext, useState } from "react";
import type { ICity } from "../../interface/city";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../../component/Loaders/Spinner";
import CitiesForLargeScreen from "../../component/ManagerDashboard/Cities/CityiesForLargeScreen";
import { TokenContext } from "../../util/TokenContext";
import { IoSearch } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import UpdateCity from "../../component/ManagerDashboard//Cities/UpdateCity";

const Cities = () => {
  const {token}=useContext(TokenContext);
  const {t}=useTranslation()
  const [changeLoading,setChangeLoading]=useState(false);
  const queryClient=useQueryClient();
  const [searchCities,setSearchCities]=useState<ICity[]>([]);
  const [openUpdateContainer,setOpenUpdateContainer]=useState<boolean>(false);
  const [nameEn,setNameEn]=useState("")

  const nav=useNavigate();
  const getCities=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/city`,{headers:{"Authorization":`Bearer ${token}`}})
  }
  const {data,isLoading}=useQuery({
    queryKey:["cities","id"],
    queryFn:getCities,
    staleTime:150000
  })
  const cities=data?.data.cities;


  const deleteCity=useCallback(async(cityName:string)=>{
    setChangeLoading(true)
    try{
      const res=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/city/${cityName}`,{headers:{"Authorization":`Bearer ${token}`}});
      console.log(res)
      if(res.data.status === "success"){
        setChangeLoading(false);
        await queryClient.invalidateQueries({queryKey:["cities","id"], refetchType: "active" })
        toast.success(t("cities.deleted"))
      }
    }catch(errors){
      console.log(errors)
    }
  },[token,queryClient]);

  const handleUpdateCity=useCallback(async(body:{name:string,isDangerousPlace:boolean},name:string)=>{
    setChangeLoading(true);
    setOpenUpdateContainer(false)
    console.log(name,"ddddddddd")
    try{
      const res=await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/city/${name}`,body,{headers:{"Authorization":`Bearer ${token}`}});
      console.log(res)
      if(res.data.status === "success"){
        setChangeLoading(false);
        await queryClient.invalidateQueries({queryKey:["cities","id"], refetchType: "active" })
        toast.success(t("cities.deleted"))
      }
    }catch(errors){
      console.log(errors)
    }
  },[token,queryClient])

  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const searchText=e.target.value;
    const filteredProperty=cities?.filter((item:ICity)=>item.name.toLowerCase()?.includes(searchText.toLowerCase())) as ICity[];
    if(!searchText){
      setSearchCities(cities)
    }else{
      setSearchCities(filteredProperty)
    }
  }


    if(isLoading){
    return  <div className="min-h-[80vh] top-0 left-0 flex items-center justify-center">
      <Spinner/>
    </div>
  }
  return (
    <div className="min-h-[80vh] w-full px-4 md:px-0 md:w-[95%] lg:w-[90%] mx-auto py-10">
      <div className="flex flex-col gap-y-5 md:flex-row justify-between w-full">
        <h1 className="text-4xl font-semibold">{t("cities.title")}</h1>
        <div className="flex justify-end items-center">
          <div className="h-[50px] px-4 rounded-full bg-[#dfdede4a] text-center p-2 cursor-pointer mr-3 flex items-center">
            <input type="text" onChange={handleSearch} placeholder={t("cities.searchPlaceholder", { count: cities?.length || 0 })} className="outline-0" />
            <IoSearch className="text-2xl"/>
          </div>
        </div>
      </div>
      { (cities?.length>0 || searchCities?.length>0)?
      <>
        <CitiesForLargeScreen setNameEn={setNameEn} cities={cities} searchCities={searchCities} deleteCity={deleteCity} setOpenUpdateContainer={setOpenUpdateContainer}/>
        {openUpdateContainer && <UpdateCity nameEn={nameEn} cities={cities} setOpenUpdateContainer={setOpenUpdateContainer} handleUpdateCity={handleUpdateCity}/>}
      </>
      :
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="text-lg font-medium">No City found</p>
          <p className="text-sm text-gray-400 mt-1">{t("listing.emptySubtitle")}</p>
          <button
            onClick={() => nav("/managerDashboard/addListing")}
            className="mt-4 px-4 py-2 bg-[#02717e] text-white rounded-xl hover:bg-[#e77008] transition-all duration-300 cursor-pointer"
          >
            {t("listing.addButton")}
          </button>
        </div>
      }
      { changeLoading && <div className="fixed w-full h-full top-0 left-0 z-10 flex items-center justify-center bg-black/10">
        <Spinner/>
      </div> }
    </div>
  )
}

export default Cities