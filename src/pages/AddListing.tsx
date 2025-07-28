import { useState } from "react"
import ExplainPage from "../component/AddListing/ExplainPage"
import TypeOfPlace from "../component/AddListing/TypeOfPlace"

const AddListing = () => {
  const [currectComponenet,setCurrectComponenet]=useState(0);
  console.log(currectComponenet)
  return (
    <div>
      <div className="h-[72vh]">
        {currectComponenet ==0?
        <ExplainPage/>
        :
        currectComponenet == 1?
        <TypeOfPlace/>
        :
        null
        }
      </div>
      <div className="absolute left-0 bottom-22 w-full h-[3px] bg-gray-300"></div>
      <div className="flex justify-between items-center ">
        <button onClick={()=>setCurrectComponenet(val=>val-1)} className="text-lg border-1  text-black px-7 py-2 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer">Back</button>
        <button onClick={()=>setCurrectComponenet(val=>val+1)} className="text-lg bg-[#e77008] text-white px-7 py-2 rounded-xl hover:bg-[#02717e] transition-all duration-300 cursor-pointer">Next</button>
      </div>
    </div>
  )
}

export default AddListing