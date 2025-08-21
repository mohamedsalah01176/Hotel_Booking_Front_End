import {  useContext, useState } from "react"
import ExplainPage from "../../component/AddListing/ExplainPage"
import TypeOfPlace from "../../component/AddListing/TypeOfPlace"
import Location from "../../component/AddListing/Location"
import PlaceContains from "../../component/AddListing/PlaceContains"
import  Step2 from "../../component/AddListing/Step2"
import Services from "../../component/AddListing/Services"
import AddPhotos from "../../component/AddListing/AddPhotos"
import Title from "../../component/AddListing/Title"
import Description from "../../component/AddListing/Description"
import Step3 from "../../component/AddListing/Step3"
import PriceForNigth from "../../component/AddListing/PriceForNigth"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { TokenContext } from "../../util/TokenContext"
import Spinner from "../../component/Loaders/Spinner"

const AddListing = () => {
  const nav=useNavigate();
  const {i18n}=useTranslation();
  const {token}=useContext(TokenContext)
  const [currectComponenet,setCurrectComponenet]=useState(0);
  const [category,setCategory]=useState("")
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [price,setPrice]=useState(1500)
  const [coords, setCoords] = useState<{ lat: number, lng: number,city:string,address:string } | null>(null);  
  const [placeContain,setPlaceContain]=useState({geust:1,badrooms:1,beds:1,bathrooms:1});
  const [service,setService]=useState<string[]>([]);
  const [images,setImages]=useState<File[]>([]);
  const [isLoading,setLoading]=useState(false)
  console.log(coords)
  const handleCreateHost=async()=>{
    try{
      setLoading(true)
      const formateData=new FormData();
      formateData.append("title",title)
      formateData.append("category",category)
      formateData.append("description",description)
      formateData.append("nightPrice",String(price))
      formateData.append("location[coordinates][lat]",String(coords?.lat))
      formateData.append("location[coordinates][lng]",String(coords?.lng))
      formateData.append("location[address]",String(coords?.address))
      formateData.append("location[city]",String(coords?.city));
      formateData.append("guestNumber",String(placeContain.geust));
      formateData.append("bathroomNumber",String(placeContain.bathrooms));
      formateData.append("badroomNumber",String(placeContain.badrooms));
      formateData.append("bedNumber",String(placeContain.beds));
      console.log(coords?.address)
      service.forEach((item,i)=>{
        formateData.append(`services[${i}].service`,item)
      })
      images.forEach((file) => {
        formateData.append("images", file);
      });
      console.log(formateData)
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/property?lang=${i18n.language}`,formateData,{headers:{Authorization:`Bearer ${token}`,"Content-Type": "multipart/form-data",}});
      if(response.data.status === "success"){
        toast.success("Your property has been submitted and is waiting for manager review.")
        setLoading(false)
        nav("/dashboard/listings")
        setTimeout(()=>{
        },2000)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(err:any){
      toast.error(err.response?.data?.errors?.errors?.[0] || "Something went wrong");
      console.log(err);
    }
  }

   if(isLoading){
    return <div className="min-h-[80vh] flex items-center justify-center">
      <Spinner/>
    </div> 
  }
  return (
    <div className=" pb-5 min-h-[72vh] w-[90%] mx-auto">
      <div className=" pb-7">
        {currectComponenet ==0?
        <ExplainPage/>
        :
        currectComponenet == 1?
        <TypeOfPlace category={category} setCategory={setCategory}/>
        :
        currectComponenet === 2?
        <Location coords={coords} setCoords={setCoords}/>
        :
        currectComponenet === 3
        ?
        <PlaceContains placeContain={placeContain} setPlaceContain={setPlaceContain}/>
        :
        currectComponenet === 4?
        <Step2/>
        :
        currectComponenet === 5?
        <Services service={service} setService={setService}/>
        :
        currectComponenet === 6?
        <AddPhotos images={images} setImages={setImages}/>
        :
        currectComponenet === 7?
        <Title title={title} category={category} setTitle={setTitle}/>
        :
        currectComponenet === 8?
        <Description description={description} setDescription={setDescription}/>
        :
        currectComponenet === 9?
        <Step3 />
        :
        currectComponenet === 10?
        <PriceForNigth price={price} setPrice={setPrice} />
        :
        null
        }
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white z-10 h-[82px]">
        <div className="absolute left-0 -top-0 w-full h-[3px] bg-gray-300"></div>
        <div className={`absolute  -top-0 w-full h-[3px] left-[-100% bg-black transition-all duration-300 `} style={{ transform: `translateX(-${(100 - currectComponenet * 9.33)}%)` }}></div>
        <div className="flex justify-between items-center h-[82px] relative mx-10">
          {currectComponenet === 0 ?
          <button onClick={()=>nav("/dashboard")} className="text-lg border-1  text-black px-7 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Back</button>
          :
          <button onClick={()=>setCurrectComponenet(val=>val-1)} className="text-lg border-1  text-black px-7 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Back</button>
          }
          {currectComponenet === 0 || currectComponenet === 4 || currectComponenet === 9?
            <button  onClick={()=>setCurrectComponenet(val=>val+1)} className="text-lg bg-[#e77008] text-white px-7 py-2 rounded-xl hover:bg-[#02717e] transition-all duration-300 cursor-pointer">Get Start</button>
            :
            currectComponenet === 1?
            <button disabled={!category} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${category === "" ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 2?
            <button disabled={!coords?.lat} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${!coords?.city || !coords.address ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 3?
            <button disabled={!placeContain?.geust} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${!placeContain?.geust ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 5?
            <button disabled={service.length<=0} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${service.length<=0 ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 6?
            <button disabled={images.length<5} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${images.length<5 ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 7?
            <button disabled={title.length<3} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${title.length<3 ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 8?
            <button disabled={description.length<3} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${description.length<3 ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 10?
            <button disabled={price<=0} onClick={handleCreateHost} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${price<=0 ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Create host</button>
            :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default AddListing
