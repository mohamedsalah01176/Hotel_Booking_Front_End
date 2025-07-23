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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { IProperty } from "../interface/property";
// import image from "../assets/R (1).jpg";


const PropertyDetails = () => {
  const {t,i18n}=useTranslation()
  const {id}=useParams();
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
  const property=data?.data.property as IProperty;
  useEffect(()=>{
    console.log(data)
  },[data])
  return (
    <section className="bg-[#f7f7f7] min-h-[190vh]">
      <div className="w-[95%] md:w-[90%] mx-auto pt-7 ">
        {/* <h1 className="text-4xl font-semibold">{i18n.language === "en"? property?.titleEn : property?.titleAr}</h1> */}
        <ImagesContainer images={property?.images as string[]}/>
        <section className="flex flex-col md:flex-row justify-between gap-14 ">
          <LeftSide i18n={i18n} property={property} t={t}/>
          <div className="sticky">
            <RightSide i18n={i18n} property={property} t={t}/>
          </div>

        </section>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <Reviews i18n={i18n} reviewsEn={property?.reviewsEn} reviewsAr={property?.reviewsAr} t={t}/>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <HotalLocation i18n={i18n} location={property?.location} t={t}/>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <ShowHost admin={property?.admin} t={t}/>
      </div>
    </section>
  )
}

export default PropertyDetails