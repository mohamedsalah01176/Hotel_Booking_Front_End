import image from "../../assets/default.jpg"
import { BiEditAlt } from "react-icons/bi";
import type { IProperty } from "../../interface/property";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const ListingForLargeScreen = ({properties,searchProperties,ChangeActiveProperty,setUpdateProperty,setShowPopup,setPropertyId}:{properties:IProperty[],searchProperties:IProperty[],ChangeActiveProperty:(val1:string,val2:boolean)=>void ,setUpdateProperty:(val:boolean)=>void,setShowPopup:(val:boolean)=>void,setPropertyId:(val:string)=>void}) => {
  const nav=useNavigate();
  const {t,i18n}=useTranslation()
  return (
    <table className="mt-10 w-full hidden md:table">
        <thead>
          <tr className="text-left">
            <th className="pl-4">{t("listing.headers.listing")}</th>
            <th>{t("listing.headers.type")}</th>
            <th>{t("listing.headers.location")}</th>
            <th>{t("listing.headers.status")}</th>
            <th className="text-center">{t("listing.headers.actions")}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={5} className="h-4"></td></tr>
          {searchProperties.length>0?
            searchProperties?.map((item)=>{
              return(
                
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 pl-4 rounded-xl w-[290px]">
                  <img loading="lazy" src={item.images[0] || image} alt="image" className="rounded-xl w-[60px] h-[60px] inline-block" />
                  <p className="inline-block ml-3 text-lg font-medium">{i18n.language === "en"?item.titleEn:item.titleAr}</p>
                </td>
                <td className="pr-2">{item.category === "home"?i18n.language === "en"?"Home":"بيت":i18n.language === "en"?"Partment":"شقه"}</td>
                <td className="max-w-[200px]">{i18n.language === "en"?item.location.cityEn+" - "+item.location.addressEn:item.location.cityAr+" - "+item.location.addressAr}</td> 
                <td className="rounded-xl">
                  {item.isActive ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      {t("listing.status.active")}
                    </span>
                  ) : item.isConfirmed === false ? (
                    <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      {t("listing.status.pending")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                      {t("listing.status.stopped")}
                    </span>
                  )}
                </td>
                <td className="pr-2 text-center">
                  <BiEditAlt onClick={()=>{setShowPopup(true);setUpdateProperty(true);setPropertyId(item._id as string)}} className="text-2xl cursor-pointer hover:text-green-700 transition-all duration-300 font-medium inline-block mr-2"/>
                  {item.isConfirmed &&
                    <>
                      <LiaExchangeAltSolid onClick={()=>ChangeActiveProperty(item._id as string,item.isActive)} className="text-2xl cursor-pointer hover:text-sky-700 transition-all duration-300 font-medium inline-block mr-2"/>
                      <FaRegCalendarCheck onClick={()=>nav(`/dashboard/calender/${item._id}`)} className="text-2xl cursor-pointer hover:text-[#02717e] transition-all duration-300 font-medium inline-block "/>
                    </>
                  }
                </td>
              </tr>
              )}
            )
          :
            properties?.map((item)=>{
              return(
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 pl-4 rounded-xl w-[290px]">
                  <img loading="lazy" src={item.images[0] || image} alt="image" className="rounded-xl w-[50px] h-[50px] inline-block" />
                  <p className="inline-block ml-3 text-lg font-medium">{i18n.language === "en"?item.titleEn:item.titleAr}</p>
                </td>
                <td className="pr-2">{item.category === "home"?i18n.language === "en"?"Home":"بيت":i18n.language === "en"?"Partment":"شقه"}</td>
                <td className="max-w-[200px]">{i18n.language === "en"?item.location.cityEn+" - "+item.location.addressEn:item.location.cityAr+" - "+item.location.addressAr}</td> 
                <td className="rounded-xl">
                  {item.isActive ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      {t("listing.status.active")}
                    </span>
                  ) : item.isConfirmed === false ? (
                    <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                      {t("listing.status.pending")}
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                      {t("listing.status.stopped")}
                    </span>
                  )}
                </td>
                <td className="pr-2 text-center">
                  <BiEditAlt onClick={()=>{setShowPopup(true);setUpdateProperty(true);setPropertyId(item._id as string)}} className="text-2xl cursor-pointer hover:text-green-700 transition-all duration-300 font-medium inline-block mr-2"/>
                    {item.isConfirmed &&
                      <>
                        <LiaExchangeAltSolid onClick={()=>ChangeActiveProperty(item._id as string,item.isActive)} className="text-2xl cursor-pointer hover:text-sky-700 transition-all duration-300 font-medium inline-block mr-2"/>
                        <FaRegCalendarCheck  onClick={()=>nav(`/dashboard/calender/${item._id}`)} className="text-2xl cursor-pointer hover:text-[#02717e] transition-all duration-300 font-medium inline-block "/>
                      </>
                    }
                    
                </td>
              </tr>
              )}
            )
          }
        </tbody>
      </table>
  )
}

export default ListingForLargeScreen