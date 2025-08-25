import { useTranslation } from "react-i18next";
import type { ICity } from "../../../interface/city";
interface CitiesForLargeScreenProps {
  cities: ICity[];
  searchCities: ICity[];
  deleteCity: (val: string) => void;
  setOpenUpdateContainer: (val: boolean) => void;
  setNameEn: (val: string) => void;
}
const CitiesForLargeScreen = ({cities,searchCities,deleteCity,setOpenUpdateContainer,setNameEn}:CitiesForLargeScreenProps) => {
  const {t,i18n}=useTranslation()

  return (
    <table className="mt-10 w-full ">
        <thead>
          <tr className="text-left">
            <th className="pl-4">{t("cities.citiesTable.name")}</th>
            <th className=" w-[150px] md:w-[250px] text-center">{t("cities.citiesTable.zone")}</th>
            <th className=" w-[150px] md:w-[250px] text-center">{t("cities.citiesTable.hotels")}</th>
            <th className="text-center">{t("cities.citiesTable.action")}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={5} className="h-4"></td></tr>
          {searchCities.length>0?
            searchCities?.map((item)=>{
              return(
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 rounded-xl w-[290px]">
                  <p className="inline-block ml-3 text-lg font-medium">{i18n.language==="en"?item.nameEn:item.nameAr}</p>
                </td>
                <td className="pr-2 text-center w-[100px] md:w-[190px]">
                  {item.isDangerousPlace === false ?
                    <p className="text-green-600 font-semibold bg-green-100 rounded-full w-fit px-3 py-1 mx-auto text-sm md:text-[17px]">{t("cities.citiesTable.safe")}</p>
                    :
                    <p className="text-red-600 font-semibold bg-red-100 rounded-full w-fit px-3 py-1 mx-auto text-sm md:text-[17px]">{t("cities.citiesTable.danger")}</p>
                  }
                </td>
                <td className="pr-2 text-center w-[100px] md:w-[190px]">
                  <p>{item.numberOfHotel}</p>
                </td>
                <td className="pr-2 text-center flex flex-col md:flex-row gap-2 items-center justify-center py-2">
                  <button onClick={()=>{setNameEn(item.nameEn as string);setOpenUpdateContainer(true)}} className="bg-sky-600 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-sky-800 transition-all duration-300 text-sm md:text-[17px]">{t("cities.citiesTable.update")}</button>
                  <button onClick={()=>deleteCity(item.nameEn as string)} className="bg-red-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300 text-sm md:text-[17px]">{t("cities.citiesTable.delete")}</button>
                </td>
              </tr>
              )}
            )
          :
            cities?.map((item)=>{
              return(
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 rounded-xl w-[290px]">
                  <p className="inline-block ml-3 text-lg font-medium">{i18n.language==="en"?item.nameEn:item.nameAr}</p>
                </td>
                <td className="pr-2 text-center w-[100px] md:w-[190px]">
                  {item.isDangerousPlace === false ?
                    <p className="text-green-600 font-semibold bg-green-100 rounded-full w-fit px-3 py-1 mx-auto text-sm md:text-[17px]">{t("cities.citiesTable.safe")}</p>
                    :
                    <p className="text-red-600 font-semibold bg-red-100 rounded-full w-fit px-3 py-1 mx-auto text-sm md:text-[17px]">{t("cities.citiesTable.danger")}</p>
                  }
                </td>
                <td className="pr-2 text-center w-[100px] md:w-[190px]">
                  <p>{item.numberOfHotel}</p>
                </td>
                <td className="pr-2 text-center flex flex-col md:flex-row gap-2 items-center justify-center py-2">
                  <button onClick={()=>{setNameEn(item.nameEn as string);setOpenUpdateContainer(true)}} className="bg-sky-600 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-sky-800 transition-all duration-300 text-sm md:text-[17px]">{t("cities.citiesTable.update")}</button>
                  <button onClick={()=>deleteCity(item.nameEn as string)} className="bg-red-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300 text-sm md:text-[17px]">{t("cities.citiesTable.delete")}</button>
                </td>
              </tr>
              )}
            )
          }
        </tbody>
      </table>
  )
}

export default CitiesForLargeScreen