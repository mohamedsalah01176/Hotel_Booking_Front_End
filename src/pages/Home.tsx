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

  const capitalize = (str: string) =>{
    const arr= str && str.trim()?.split(" ");
    console.log(arr,"kkkkkkkkkkk")
    if( arr?.length<2){
      return str && str?.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }else{
      let str2=""
      for(let i=0;i<arr?.length;i++){
        if(i=== arr.length-1){
          str2+=arr[i].charAt(0).toUpperCase()+arr[i].slice(1).toLowerCase();
        }else{
          str2+=arr[i].charAt(0).toUpperCase()+arr[i].slice(1).toLowerCase()+" ";
        }
      }
      console.log(str2,"string")
      return str2
    }
  }

  return (
    <div className="pt-3 pb-14 min-h-[50vh]">
      {cities?.map((item)=>{
        return(
          <HorizontalCardSlider nameEn={capitalize(item.nameEn)} nameAr={item.nameAr}  key={item._id} filteredProperties={filteredProperties} />
        )
      })}
      <Filter properties={filteredProperties} setFilteredProperties={setFilteredProperties}/>
    </div>
  );
};

export default Home
