import {  useState } from "react"
import ExplainPage from "../component/AddListing/ExplainPage"
import TypeOfPlace from "../component/AddListing/TypeOfPlace"
import Location from "../component/AddListing/Location"
import PlaceContains from "../component/AddListing/PlaceContains"
import  Step2 from "../component/AddListing/Step2"
import Services from "../component/AddListing/Services"

const AddListing = () => {
  const [currectComponenet,setCurrectComponenet]=useState(0)
  const [category,setCategory]=useState("")
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);  
  const [placeContain,setPlaceContain]=useState({geust:1,badrooms:1,beds:1,bathrooms:1})
  const [service,setService]=useState([])
  return (
    <div className=" pb-5 min-h-[72vh]">
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
        null
        }
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white z-10 h-[82px]">
        <div className="absolute left-0 -top-0 w-full h-[3px] bg-gray-300"></div>
        <div className={`absolute  -top-0 w-full h-[3px] left-[-100% bg-black transition-all duration-300 `} style={{ transform: `translateX(-${(100 - currectComponenet * 13.33)}%)` }}></div>
        <div className="flex justify-between items-center h-[82px] relative mx-10">
          
          <button onClick={()=>setCurrectComponenet(val=>val-1)} className="text-lg border-1  text-black px-7 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Back</button>
          {currectComponenet === 0 || currectComponenet === 4?
            <button  onClick={()=>setCurrectComponenet(val=>val+1)} className="text-lg bg-[#e77008] text-white px-7 py-2 rounded-xl hover:bg-[#02717e] transition-all duration-300 cursor-pointer">Get Start</button>
            :
            currectComponenet === 1?
            <button disabled={!category} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${category === "" ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 2?
            <button disabled={!coords?.lat} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${!coords?.lat ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 3?
            <button disabled={!placeContain?.geust} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${!placeContain?.geust ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            currectComponenet === 5?
            <button disabled={!placeContain?.geust} onClick={()=>setCurrectComponenet(val=>val+1)} className={`text-lg  text-white px-7 py-2 rounded-xl  transition-all duration-300  ${!placeContain?.geust ? "cursor-no-drop  bg-[#e770088f]":"cursor-pointer hover:bg-[#02717e] bg-[#e77008]"}`}>Next</button>
            :
            null
          }
        </div>
      </div>
    </div>
  )
}

export default AddListing