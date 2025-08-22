
import { useTranslation } from "react-i18next"
import image from "../../assets/default.jpg"
import type { IPropertyWithReserves } from "../../interface/ReserveDate"
import { useNavigate } from "react-router"
import defaultUserImage from "../../assets/defaultUser.png"
const TableForLargeScreen = ({properties,handleDeleteProperty,type}:{properties:IPropertyWithReserves[],handleDeleteProperty:(e:React.MouseEvent<HTMLButtonElement>,dateId:string)=>void,type:string}) => {
  const {t,i18n}=useTranslation()
  const nav=useNavigate();

  const handleGoToProperty=(propertyId:string)=>{
    nav(`/propertyDetails/${propertyId}`)
  }

  
  return (
    <table className="mt-10 w-full hidden md:table">
        <thead>
          <tr className={i18n.language === "en"?"text-left":"text-right"}>
            <th className={i18n.language === "en"?"pl-4":"pr-4"}>{t("setting.table.listing")}</th>
            <th>{t("setting.table.phone")}</th>
            <th>{t("setting.table.startDate")}</th>
            <th>{t("setting.table.endDate")}</th>
            <th>{t("setting.table.status")}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={6} className="h-4"></td></tr>
          {properties?.map((item: IPropertyWithReserves) =>
            item.reserveDates.map((reserveDate, idx) => {
              const startDate = new Date(reserveDate.dates[0]);
              const endDate = new Date(reserveDate.dates[reserveDate.dates.length - 1]);

              const isExpired = endDate < new Date();
              const isDuring = startDate <= new Date() && new Date() <= endDate;

              return (
                <tr
                  onClick={() => handleGoToProperty(item.property._id as string)}
                  key={`${item?.property._id}-${idx}`}
                  className="cursor-pointer hover:bg-[#e8e7e730] transition-all duration-300 mt-10 border-b border-gray-200"
                >
                  {type === "calender" ?
                    <td className={`pt-5 pb-2 ${i18n.language === "en" ? "pl-4" : "pr-4"} rounded-xl w-[290px]`}>
                      <img
                        loading="lazy"
                        src={item?.property.admin.image || defaultUserImage}
                        alt="image"
                        className="rounded-xl w-[60px] h-[60px] inline-block"
                      />
                      <p className={`inline-block ${i18n.language === "en" ? "ml-3" : "mr-3"} text-lg font-medium`}>
                        {item?.property.admin.name}
                      </p>
                    </td>
                  :
                    <td className={`pt-5 pb-2 ${i18n.language === "en" ? "pl-4" : "pr-4"} rounded-xl max-w-[250px]`}>
                      <img
                        loading="lazy"
                        src={item?.property.images[0] || image}
                        alt="image"
                        className="rounded-xl w-[60px] h-[60px] inline-block"
                      />
                      <p className={`inline-block ${i18n.language === "en" ? "ml-3" : "mr-3"} text-lg font-medium`}>
                        {i18n.language == "en"
                          ? item?.property.titleEn?.split(" ").slice(0, 3).join(" ")
                          : item?.property.titleAr?.split(" ").slice(0, 3).join(" ")
                        }
                      </p>
                    </td>
                  }
                  <td className="pr-2">{item?.property.admin.phone}</td>
                  <td className="pr-2">{startDate.toLocaleDateString()}</td>
                  <td className="">{endDate.toLocaleDateString()}</td>
                  <td className="pl-2">
                    {isExpired ? (
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">{t("setting.status.ended")}</span>
                    ) : isDuring ? (
                      <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">{t("setting.status.during")}</span>
                    ) : (
                      <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{t("setting.status.upcoming")}</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDeleteProperty(e, reserveDate._id)}
                      className="bg-red-700 text-white py-2 px-4 rounded-xl hover:bg-red-800 transition-all duration-300 cursor-pointer"
                    >
                      {t("setting.table.cancelReservation")}
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
    </table>
  )
}

export default TableForLargeScreen