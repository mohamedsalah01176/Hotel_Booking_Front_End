import { LiaExchangeAltSolid } from "react-icons/lia";
import image from "../../assets/default.jpg"
import { BiEditAlt } from "react-icons/bi"
import type { IProperty } from "../../interface/property"
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
const ListingForMobile = ({properties,searchProperties,ChangeActiveProperty,setUpdateProperty,setPropertyId}:{properties:IProperty[],searchProperties:IProperty[],ChangeActiveProperty:(val1:string,val2:boolean)=>void,setUpdateProperty:(val:boolean)=>void,setPropertyId:(val:string)=>void}) => {
  const nav=useNavigate();
  return (
    <div className="mt-10 md:hidden">
      {searchProperties?.length>0?
        searchProperties.map((item)=>{
          return(
            <div key={item._id} className="flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 ">
              <div className="relative">
                <img loading="lazy" src={item.images[0] || image} alt="product Image" className="w-[100px] h-[100px] rounded-xl" />
                {item.isActive ?
                    <div className="absolute top-2 right-1 text-[10px] bg-green-100 text-green-800 p-1 rounded-4xl">Active</div>
                  :
                  <div className="absolute top-2 right-1 text-[10px] bg-red-100 text-red-800 p-1 rounded-4xl">Stoped</div>
                  }
              </div>
              <div>
                <h2 className="text-xl font-medium">{item.title}</h2>
                <p className="text-gray-600">{item.location.address}</p>
                <div> 
                  <BiEditAlt onClick={()=>{setUpdateProperty(true);setPropertyId(item._id as string)}} className="text-xl cursor-pointer hover:text-red-700 transition-all duration-300 font-medium inline-block mr-2"/>
                  <LiaExchangeAltSolid onClick={()=>ChangeActiveProperty(item._id as string,item.isActive)} className="text-2xl cursor-pointer hover:text-sky-700 transition-all duration-300 font-medium inline-block "/>
                  <FaRegCalendarCheck onClick={()=>nav(`/dashboard/calender/${item._id}`)} className="text-2xl cursor-pointer hover:text-[#02717e] transition-all duration-300 font-medium inline-block "/>
                
                </div>
              </div>
            </div>
          )
        })
      :
        properties.map((item)=>{
          return(
            <div key={item._id} className="flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 ">
              <div className="relative">
                <img loading="lazy" src={item.images[0] || image} alt="product Image" className="w-[100px] h-[100px] rounded-xl" />
                {item.isActive ?
                    <div className="absolute top-2 right-1 text-[10px] bg-green-100 text-green-800 p-1 rounded-4xl">Active</div>
                  :
                  <div className="absolute top-2 right-1 text-[10px] bg-red-100 text-red-800 p-1 rounded-4xl">Stoped</div>
                  }
              </div>
              <div>
                <h2 className="text-xl font-medium">{item.title}</h2>
                <p className="text-gray-600">{item.location.address}</p>
                <div> 
                  <BiEditAlt onClick={()=>{setUpdateProperty(true);setPropertyId(item._id as string)}} className="text-xl cursor-pointer hover:text-red-700 transition-all duration-300 font-medium inline-block mr-2"/>
                  <LiaExchangeAltSolid onClick={()=>ChangeActiveProperty(item._id as string,item.isActive)} className="text-2xl cursor-pointer hover:text-sky-700 transition-all duration-300 font-medium inline-block "/>
                  <FaRegCalendarCheck onClick={()=>nav(`/dashboard/calender/${item._id}`)} className="text-2xl cursor-pointer hover:text-[#02717e] transition-all duration-300 font-medium inline-block "/>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ListingForMobile