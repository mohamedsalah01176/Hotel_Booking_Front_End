import { IoAdd, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router";

import { useContext, useState, } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { TokenContext } from "../../util/TokenContext";
import type { IProperty } from "../../interface/property";
import ListingForLargeScreen from "../../component/Listings/ListingForLargeScreen";
import ListingForMobile from "../../component/Listings/ListingForMobile";
import { toast } from "react-toastify";
import UpdateProperty from "../../component/Listings/UpdateProperty";
import Spinner from "../../component/Loaders/Spinner";
import { useTranslation } from "react-i18next";
import PopupStrictLanguage from "../../component/AddListing/PopupStrictLanguage";

const Listings = () => {
  const nav=useNavigate();
  const {token}=useContext(TokenContext);
  const queryClient = useQueryClient();
  const [openUpdateProperty,setUpdateProperty]=useState(false);
  const [propertId,setPropertyId]=useState("");
  const [searchProperties,setSearchProperties]=useState<IProperty[]>([])
  const {t}=useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);

  const getPropertiesForAdmin=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/propertyForAdmin`,{headers:{"Authorization":`Bearer ${token}`}});
  }
  const {data,isLoading}=useQuery<AxiosResponse<{ properties: IProperty[] }>, Error>({
    queryKey:["propertiesForAdmin"],
    queryFn:getPropertiesForAdmin,
    staleTime:30 * 60 * 1000  });
  const properties=data?.data.properties ??[]
  


  const ChangeActiveProperty=async(propertId:string,isActive:boolean)=>{
    setChangeLoading(true)
    try{
      if(isActive){
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/propertyDeActive/${propertId}`,{},{headers:{"Authorization":`Bearer ${token}`}});
        console.log(res)
        await queryClient.invalidateQueries({ queryKey: ["propertiesForAdmin"] });
        if(res.data.status === "success"){
          setChangeLoading(false)
          toast.success("Property is Stoped");
        }
      }else{
        const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/propertyActive/${propertId}`,{},{headers:{"Authorization":`Bearer ${token}`}});
        console.log(res)
        await queryClient.invalidateQueries({ queryKey: ["propertiesForAdmin"] });
        if(res.data.status === "success"){
          setChangeLoading(false)
          toast.success("Property is Active")
        }
      }
    }catch(errors){
      toast.error("Something went wrong while updating the property status")
      console.log(errors)
    }
  }
  
  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const searchText=e.target.value;
    const filteredProperty=properties.filter(item=>item.title.includes(searchText)) as IProperty[];
    if(!searchText){
      setSearchProperties(properties)
    }else{
      setSearchProperties(filteredProperty)
    }
  }


  if(isLoading){
    return  <div className="min-h-[80vh] flex items-center justify-center">
      <Spinner/>
    </div>
  }
  
  return (
    <div className="min-h-[80vh] flex flex-col items-center py-10 w-[90%] mx-auto">
      { changeLoading && <div className="fixed w-full h-full flex items-center justify-center bg-black/10">
      <Spinner/>
    </div> }
      <div className="flex flex-col gap-y-5 md:flex-row justify-between w-full">
        <h1 className="text-4xl font-semibold">{t("listing.title")}</h1>
        <div className="flex justify-end items-center">
          <div className="h-[50px] px-4 rounded-full bg-[#dfdede4a] text-center p-2 cursor-pointer mr-3 flex items-center">
            <input type="text" onChange={handleSearch} placeholder={t("listing.searchPlaceholder", { count: properties.length })} className="outline-0" />
            <IoSearch className="text-2xl"/>
          </div>
          <div onClick={()=>nav("/dashboard/addListing")} className="w-[40px] h-[40px] rounded-full bg-[#dfdede4a] text-center p-2 cursor-pointer inline-block">
            <IoAdd className="text-2xl"/>
          </div>
        </div>
      </div>
      { (properties?.length>0 || searchProperties?.length>0)?
      <>
        <ListingForLargeScreen properties={properties} searchProperties={searchProperties} ChangeActiveProperty={ChangeActiveProperty} setUpdateProperty={setUpdateProperty} setShowPopup={setShowPopup} setPropertyId={setPropertyId}/>
        <ListingForMobile properties={properties} searchProperties={searchProperties}  ChangeActiveProperty={ChangeActiveProperty} setUpdateProperty={setUpdateProperty} setShowPopup={setShowPopup}  setPropertyId={setPropertyId}/>
        {openUpdateProperty && <UpdateProperty setUpdateProperty={setUpdateProperty} propertyId={propertId}/>}
      </>
      :
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <p className="text-lg font-medium">{t("listing.emptyTitle")}</p>
          <p className="text-sm text-gray-400 mt-1">{t("listing.emptySubtitle")}</p>
          <button
            onClick={() => nav("/dashboard/addListing")}
            className="mt-4 px-4 py-2 bg-[#02717e] text-white rounded-xl hover:bg-[#e77008] transition-all duration-300 cursor-pointer"
          >
            {t("listing.addButton")}
          </button>
        </div>
      }
      {showPopup &&<PopupStrictLanguage titleEn="data" titleAr="البيانات" setShowPopup={setShowPopup}/>}

    </div>
  )
}

export default Listings