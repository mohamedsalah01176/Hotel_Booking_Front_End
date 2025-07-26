import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import RightSide from "../component/PropertyDetails/RightSide";
import LeftSide from "../component/PropertyDetails/LeftSide";
import ImagesContainer from "../component/PropertyDetails/ImagesContainer";
import Reviews from "../component/PropertyDetails/Reviews";
import HotalLocation from "../component/PropertyDetails/HotalLocation";
import ShowHost from "../component/PropertyDetails/ShowHost";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios, { type AxiosResponse } from "axios";
import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import type { IProperty } from "../interface/property";
import AddReview from "../component/PropertyDetails/AddReview";
import { toast } from "react-toastify";
import { TokenContext } from "../util/TokenContext";
import ConfirmMessage from "../component/PropertyDetails/ConfirmMessage";
import type { Range } from "react-date-range";

const PropertyDetails = () => {
  const {t,i18n}=useTranslation()
  const {id}=useParams();
  const [openAddReview,setOpenAddReview]=useState(false);
  const [openConfirm,setOpenConfirm]=useState(false);
  const {token}=useContext(TokenContext);
  const [reserved,setReserved]=useState(false)
  const [range,setRange]=useState<Range[]>([{
    startDate:new Date(),
    endDate:new Date(new Date().setDate(new Date().getDate() + 2)),
    key:"selection"
  }]);



  const getSpecifcProperty=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/property/${id}`)
  }

  const {data}=useQuery<
      AxiosResponse<{ property: IProperty }>,
      Error
    >({
    queryKey:["SpecificProperty",id],
    queryFn:getSpecifcProperty,
  });

  const handleAddReview=useCallback(async(data:{data:string,rate:number})=>{
    try{
      const res= await fetch(`${import.meta.env.VITE_BASE_URL}/api/review/${id}?lang=${i18n.language}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify(data)
      });
      const dataRes=await res.json()
      if(dataRes.status === "success"){
        toast.success(dataRes.message);
        setTimeout(()=>{
          setOpenAddReview(false);
        },1000)
      }else{
        toast.error(dataRes.message)
      }
    }catch(errors){
      console.log(errors)
    }
    console.log(data)
  },[])


  const property=data?.data.property as IProperty;
  return (
    <section className="bg-[#f7f7f7] min-h-[190vh]">
      {openAddReview && <AddReview setOpenAddReview={setOpenAddReview} handleAddReview={handleAddReview}/>}
      {openConfirm && <ConfirmMessage t={t} setOpenConfirm={setOpenConfirm} propertyId={id as string} range={range} reserved={reserved} setReserved={setReserved}/>}
      
      <div className="w-[95%] md:w-[90%] mx-auto pt-7 ">
        {/* <h1 className="text-4xl font-semibold">{i18n.language === "en"? property?.titleEn : property?.titleAr}</h1> */}
        <ImagesContainer images={property?.images as string[]}/>
        <section className="flex flex-col md:flex-row justify-between gap-14 ">
          <LeftSide i18n={i18n} property={property} t={t}/>
          <div className="sticky">
            <RightSide i18n={i18n} range={range} setRange={setRange} property={property} t={t} propertyId={id as string} setOpenConfirm={setOpenConfirm} reserved={reserved}/>
          </div>

        </section>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <Reviews token={token} i18n={i18n} reviews={property?.reviews}  t={t} setOpenAddReview={setOpenAddReview}/>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <HotalLocation i18n={i18n} location={property?.location} t={t}/>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <ShowHost admin={property?.admin} t={t}/>
      </div>
    </section>
  )
}

export default PropertyDetails