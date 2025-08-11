
import PropertyCard from "../PropertyCard";
import type { IProperty } from "../../interface/property";
import axios, { type AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import SliderLoader from "../Loaders/SliderLoader";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import "./style.css"
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../util/GeneralContext";


const HorizontalCardSlider = ({ nameEn,nameAr }: { nameEn: string,nameAr:string }) => {
  const {t,i18n}= useTranslation();
  const {currentSection ,setSharedProperties }=useContext(GeneralContext);

  function getProperties() {
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/property`);
  }
  const propertyResponse = useQuery<
    AxiosResponse<{ properties: IProperty[] }>,
    Error
  >({
    queryKey: ["allProperties"],
    queryFn: getProperties,
    staleTime: 240000,
  });
  
  useEffect(()=>{
    setSharedProperties(propertyResponse?.data?.data.properties as IProperty[])
  },[propertyResponse])
  const property = propertyResponse.data?.data.properties.filter(
      (item) => item?.location?.cityEn?.toLowerCase() === nameEn?.toLowerCase() && item?.category?.toLowerCase() === currentSection?.toLowerCase()
    ) || [];
    console.log(propertyResponse.data)

  if (propertyResponse.isLoading) {
    return <SliderLoader name={nameEn?.charAt(0).toUpperCase()} />;
  }
  
  return (
    <>
    {property.length>0 &&
      <div className="px-4 md:px-8 my-10 animate-fade-in">
        <h2 className="text-xl font-bold mb-4">
          {t("home.popularHomes",{name:i18n.language === "en"?nameEn?.charAt(0).toUpperCase()+nameEn?.slice(1):nameAr})} <span className="text-rose-500">›</span>
        </h2>
        <Swiper
        key={i18n.language}
        spaceBetween={3}
        slidesPerView={5}
        modules={[Navigation,Autoplay]} 
        autoplay={{
          delay:3000,
          pauseOnMouseEnter:true
        }}
        dir={i18n.language === "ar"?"rtl":"ltr"}
        navigation
        breakpoints={{
          140: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          450: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1010: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          
        }}
        >
          {property.map((item) => (
            <SwiperSlide key={item._id}>
              <PropertyCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    }
    </>
  );
};

export default HorizontalCardSlider;
