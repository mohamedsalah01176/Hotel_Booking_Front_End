import { differenceInMonths, differenceInYears } from "date-fns";
import image from "../../assets/R (1).jpg";
import type { IProperty } from "../../interface/property";
import PlaceOffer from "./PlaceOffer";
import type { i18n as i18nType  } from "i18next";
import type { TFunction } from "i18next";
import { useState } from "react";

const LeftSide = ({i18n,property,t}:{property:IProperty,i18n:i18nType,t:TFunction}) => {
  const [showServices,setShowServices]=useState(false)
  const services=property?.services?.slice(0,6)
  const createdAt = property?.admin?.createdAt ? new Date(property.admin.createdAt) : new Date();
  const years = differenceInYears(new Date(), createdAt);
  const monthsTotal = differenceInMonths(new Date(), createdAt);
  const months = monthsTotal % 12;
  let durationText = "";
  if (years > 0) {
    durationText = t("propertyDetails.superhostWithYearsAndMonths", { years, months });
  } else {
    durationText = t("propertyDetails.superhostWithMonths", { months });
  }
  return (
    <div className="grow">
        <p className="text-xl font-medium">{i18n.language === "en"? property?.titleEn : property?.titleAr}</p>
        <p className=" text-gray-600 ">{t("propertyDetails.subTitle",{guest:property?.guestNumber})}</p>
        <div className="mt-7 flex items-center gap-5">
          <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
          <div>
            <h2 className="text-lg font-medium">{t("propertyDetails.hostedBy",{name:property?.admin.name?property?.admin.name:"Unknown"})}</h2>
            <p className="text-sm text-gray-600">{durationText}</p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <p className="font-medium text-gray-700  w-[90%]">{i18n.language === "en"?property?.descriptionEn:property?.descriptionAr}</p>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <h2 className="text-3xl font-semibold">{t("propertyDetails.whatPlaceOffers")}</h2>
        <div className="grid grid-cols-2"> 
          { services?.length>0?
              services?.map((service ,index :number)=><PlaceOffer serviceEn={service.serviceEn as string} title={i18n.language === "ar" ? service.serviceAr : service.serviceEn} key={index}/>)
            :
              <p className="text-gray-500 italic">{i18n.language === "en"?"No services available":"لا توجد خدمات متاحة"}</p>
          }
          {property?.services?.length>=6 && !showServices && <button onClick={()=>setShowServices(true)} className="text-white bg-[#02717e] px-5 py-2 w-fit mt-5 rounded-xl text-lg cursor-pointer hover:bg-[#e77008] transition-all duration-300">{i18n.language === "en"?"More":"المزيد"}</button>}
          {showServices && property.services?.slice(6).map((service, index) => (
            <PlaceOffer
              key={`extra-${index}`}
              serviceEn={service.serviceEn as string}
              title={i18n.language === "ar" ? service.serviceAr : service.serviceEn}
            />
          ))}
        </div>
      </div>
  )
}

export default LeftSide