import { IoAdd, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

import { useContext, } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { TokenContext } from "../util/TokenContext";
import type { IProperty } from "../interface/property";
import ListingForLargeScreen from "../component/Listings/ListingForLargeScreen";
import ListingForMobile from "../component/Listings/ListingForMobile";
import CommonLoader from "../component/Loaders/commonLoader/CommonLoader";
import { toast } from "react-toastify";

const Listings = () => {
  const nav=useNavigate();
  const {token}=useContext(TokenContext);
  const queryClient = useQueryClient();


  const getPropertiesForAdmin=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/propertyForAdmin`,{headers:{"Authorization":`Bearer ${token}`}});
  }
  const {data}=useQuery<AxiosResponse<{ properties: IProperty[] }>, Error>({
    queryKey:["propertiesForAdmin"],
    queryFn:getPropertiesForAdmin
  });
  const properties=data?.data.properties ??[]
  if(properties.length<=0){
    return<div className="min-h-[80vh] flex flex-col items-center py-10 w-[90%] mx-auto">
      <CommonLoader/>
    </div> 
  }


  
  const ChangeActiveProperty=async(propertId:string,isActive:boolean)=>{
    try{
      if(isActive){
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/propertyDeActive/${propertId}`,{},{headers:{"Authorization":`Bearer ${token}`}});
        console.log(res)
        await queryClient.invalidateQueries({ queryKey: ["propertiesForAdmin"] });
        if(res.data.status === "success"){
          toast.success("Property is Stoped")
        }
      }else{
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/propertyActive/${propertId}`,{},{headers:{"Authorization":`Bearer ${token}`}});
        console.log(res)
        await queryClient.invalidateQueries({ queryKey: ["propertiesForAdmin"] });
        if(res.data.status === "success"){
          toast.success("Property is Active")
        }
      }
    }catch(errors){
      toast.error("Something went wrong while updating the property status")
      console.log(errors)
    }
  }
  
  // const updateProperty=(propertId:string,body)=>{
    // try{
    //   // const res=await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/property/${propertId}`,{body},{headers:{"Authorization":`Bearer ${token}`}});
    //   // console.log(res)
    // }catch(errors){
    //   console.log(errors)
    // }
  // }

  return (
    <div className="min-h-[80vh] flex flex-col items-center py-10 w-[90%] mx-auto">
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-semibold">Your Listings</h1>
        <div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#dfdede4a] text-center p-2 inline-block cursor-pointer mr-3">
            <IoSearch className="text-2xl"/>
          </div>
          <div onClick={()=>nav("/dashboard/addListing")} className="w-[40px] h-[40px] rounded-full bg-[#dfdede4a] text-center p-2 cursor-pointer inline-block">
            <IoAdd className="text-2xl"/>
          </div>
        </div>
      </div>
      <ListingForLargeScreen properties={properties} ChangeActiveProperty={ChangeActiveProperty}/>
      <ListingForMobile properties={properties}/>
    </div>
  )
}

export default Listings