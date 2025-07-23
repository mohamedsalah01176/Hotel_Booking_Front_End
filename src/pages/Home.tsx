import HorizontalCardSlider from "../component/Slider/HorizontalCardSlider";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import type { ICity } from "../interface/city";
import GeneralLoader from "../component/GeneralLoader/GeneralLoader";




const Home = () => {

  function getCities(){
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/city`)
  }

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
    <div>
      {cities?.map((item)=>{
        return(
          <HorizontalCardSlider nameEn={item.nameEn} nameAr={item.nameAr}  key={item._id}  />
        )
      })}
    </div>
  );
};

export default Home
