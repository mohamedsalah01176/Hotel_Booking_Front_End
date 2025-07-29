import { IoHomeOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";

const TypeOfPlace = ({category,setCategory}:{category:string,setCategory:(val:string)=>void}) => {
  return (
    <div className="text-black flex-col flex justify-center items-center translate-y-[-10%]  gap-7 h-[70vh] mt-14 animate-fade-in">
      <h2 className="text-3xl font-semibold">What is type of place will guests have?</h2>
      <div className="w-[600px]">
        <div onClick={()=>setCategory("home")} className={`flex  items-center justify-between gap-3 p-5 border-2 border-gray-200 rounded-xl w-full mt-2 hover:bg-gray-100 hover:border-black transition-all duration-300 cursor-pointer ${category === "home" && " bg-gray-100 border-black "}`}>
          <div>
            <h3 className="text-lg font-medium">A home</h3>
            <p className="text-gray-600 ">Guests have the whole place to themselves</p>
          </div>
          <IoHomeOutline className="text-3xl"/>
        </div>
        <div onClick={()=>setCategory("partment")} className={`flex  items-center justify-between gap-3 p-5 border-2 border-gray-200 rounded-xl w-full mt-2 hover:bg-gray-100 hover:border-black transition-all duration-300 cursor-pointer ${category === "partment" && " bg-gray-100 border-black "}`}>
          <div>
            <h3 className="text-lg font-medium">A partment</h3>
            <p className="text-gray-600 w-[90%]">Guests have thier own partment in a home, plus access to shared spaces</p>
          </div>
          <LuDoorOpen className="text-3xl"/>
        </div>
      </div>
    </div>
  )
}

export default TypeOfPlace