import image from "../../assets/R (1).jpg";
import type { IProperty } from "../../interface/property";
import PlaceOffer from "./PlaceOffer";
import type { i18n as i18nType  } from "i18next";
import type { TFunction } from "i18next";

const LeftSide = ({i18n,property,t}:{property:IProperty,i18n:i18nType,t:TFunction}) => {

  return (
    <div className="grow">
        <p className="text-xl font-medium">{i18n.language === "en"? property?.titleEn : property?.titleAr}</p>
        <p className=" text-gray-600 ">{t("propertyDetails.subTitle",{guest:property?.guestNumber})}</p>
        <div className="mt-7 flex items-center gap-5">
          <img loading="lazy" src={image} alt="image" className="w-[50px] h-[50px] rounded-full" />
          <div>
            <h2 className="text-lg font-medium">{t("propertyDetails.hostedBy",{name:property?.admin.name?property?.admin.name:"Unknown"})}</h2>
            <p className="text-sm text-gray-600">{t("propertyDetails.superhostWithDuration",{years:2})}</p>
          </div>
        </div>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <p className="font-medium text-gray-700  w-[90%]">{i18n.language === "en"?property?.descriptionEn:property?.descriptionAr}</p>
        <div className="bg-gray-300 w-full h-[2px] my-10"></div>
        <h2 className="text-3xl font-semibold">{t("propertyDetails.whatPlaceOffers")}</h2>
        <div className="grid grid-cols-2"> 
          {i18n.language === "en"?
            property?.servicesEn.map((servece:string ,index :number)=><PlaceOffer title={servece} key={index}/>)
            :
            property?.servicesAr.map((servece:string ,index :number)=><PlaceOffer title={servece} key={index}/>)
          }
        </div>
      </div>
  )
}

export default LeftSide