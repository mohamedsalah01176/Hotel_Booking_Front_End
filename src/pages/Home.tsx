import HorizontalCardSlider from "../component/Slider/HorizontalCardSlider";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { ICity } from "../interface/city";
import GeneralLoader from "../component/GeneralLoader/GeneralLoader";
import Filter from "../component/Filter";
import { useState } from "react";
import type { IProperty } from "../interface/property";





const Home = () => {
  
  function getCities(){
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/city`)
  }
  const [filteredProperties,setFilteredProperties]=useState<IProperty[]>([])
  const cityResponse=useQuery<AxiosResponse<{ cities: ICity[] }>, Error>({
    queryKey:["allCities"],
    queryFn:getCities,
    staleTime:240000
  })
  const cities = cityResponse.data?.data.cities ?? [];
  if(cityResponse.isLoading){
    return <GeneralLoader/>
  }


  return (
    <div className="pt-3 pb-14">
      {cities?.map((item)=>{
        return(
          <HorizontalCardSlider nameEn={item.nameEn} nameAr={item.nameAr}  key={item._id} filteredProperties={filteredProperties} />
        )
      })}
      <Filter properties={filteredProperties} setFilteredProperties={setFilteredProperties}/>
    </div>
  );
};

export default Home
