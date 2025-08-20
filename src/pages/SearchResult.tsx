import {  useEffect, useState } from "react"
import PropertyCard from "../component/PropertyCard"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import type { IProperty } from "../interface/property";
import Filter from "../component/Filter";


const SearchResult = () => {
  const { t } = useTranslation();
  const nav=useNavigate();
  const [searchResults,setSearchResults]=useState<IProperty[]>([])
  const [filteredProperties,setFilteredProperties]=useState<IProperty[]>([])
  useEffect(()=>{
    const results = localStorage.getItem("searchProperty");
    if (results) {
      setSearchResults(JSON.parse(results));
    }
    console.log(searchResults);

  },[])

  const source=filteredProperties.length>0?filteredProperties:searchResults
  return (
    <div className=" w-[95%] mx-auto  py-12">
      <h1 className="text-center text-4xl text-[#02717e] font-semibold mb-10">{t("searchResults.title")}</h1>
      <div className=" min-h-[30vh] flex items-center justify-center flex-wrap gap-5">
        {source?.length>0?
          source?.map((item)=>{
            return(
              <div className="w-[280px] h-[250px] "  key={item._id}>
                <PropertyCard item={item}/>
              </div>
            )
          })
        :
          <div>
            <p className="text-3xl font-medium text-red-600">{t("searchResults.notFound")}</p>
            <button
              onClick={() => nav("/")}
              className="bg-[#f67808] hover:bg-[#02717e] mt-4 cursor-pointer block mx-auto text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {t("searchResults.backHome")}
            </button>
          </div>
        }
      </div>
      <Filter properties={searchResults} setFilteredProperties={setFilteredProperties}/>
    </div>
  )
}

export default SearchResult