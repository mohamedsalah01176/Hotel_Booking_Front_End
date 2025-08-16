import image from "../../assets/default.jpg"
import { useNavigate } from "react-router";
import type { IPropertyWithReserves } from "../../interface/ReserveDate";
import { useTranslation } from "react-i18next";
const ListingFotMobile = ({properties,handleDeleteProperty}:{properties:IPropertyWithReserves[],handleDeleteProperty:(e:React.MouseEvent<HTMLButtonElement>,dateId:string)=>void}) => {
  const nav=useNavigate();
  const {t,i18n}=useTranslation();
  return (
    <div className="mt-10 md:hidden">
      {properties?.map((item: IPropertyWithReserves) =>
            item.reserveDates.map((reserveDate) => {
              const startDate=new Date(item.reserveDates[0].dates[0]);
                  const endDate=new Date(item.reserveDates[0].dates[item.reserveDates[0].dates.length-1]);
                  const isExpired=endDate < new Date();
                  const isDuring = startDate <=  new Date() &&  new Date() <= endDate;  ;
              return (
                <div onClick={() => nav(`/propertyDetails/${item.property._id}`)} 
                  key={reserveDate._id} 
                  className="cursor-pointer flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 w-full">

                  <div className="relative">
                    <img 
                      loading="lazy" 
                      src={item.property.images[0] || image} 
                      alt="product Image" 
                      className="w-[130px] h-[130px] rounded-xl" 
                    />
                    {isExpired ? (
                      <div className="absolute top-2 right-1 text-[10px] bg-red-100 text-red-800 px-2 py-1 rounded-2xl">{t("setting.status.ended")}</div>
                    ) : isDuring ? (
                      <div className="absolute top-2 right-1 text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded-2xl">{t("setting.status.during")}</div>
                    ) : (
                      <div className="absolute top-2 right-1 text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded-2xl">{t("setting.status.upcoming")}</div>
                    )}
                  </div>

                  <div>
                    <h2 className="text-[19px] font-medium">
                      {i18n.language == "en"
                        ? item?.property.titleEn?.split(" ").slice(0, 3).join(" ")
                        : item?.property.titleAr?.split(" ").slice(0, 3).join(" ")
                      }
                    </h2>

                    <div className="flex flex-col sm:flex-row justify-between sm:items-center sm:w-[300px] mt-2">
                      <p className="text-sm text-gray-700">
                        {item.property.admin.phone}
                      </p>

                      <p className="text-sm text-gray-700 mb-1">
                        {new Date(item.reserveDates?.[0]?.dates[0]).toLocaleDateString()} 
                        {" - "} 
                        {new Date(item.reserveDates?.[0]?.dates[item.reserveDates[0]?.dates.length - 1]).toLocaleDateString()}
                      </p>
                      <button
                        onClick={(e) => handleDeleteProperty(e, reserveDate._id)}
                        className="bg-red-700 text-white py-2 px-4 rounded-xl hover:bg-red-800 transition-all duration-300 cursor-pointer block"
                      >
                        {t("setting.table.cancelReservation")}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
      
    </div>
  )
}

export default ListingFotMobile