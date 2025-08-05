import { LiaExchangeAltSolid } from "react-icons/lia";
import image from "../../assets/default.jpg"
import { BiEditAlt } from "react-icons/bi"
import type { IProperty } from "../../interface/property"
const ListingForMobile = ({properties}:{properties:IProperty[]}) => {
  return (
    <div className="mt-10 md:hidden">
      {properties.map((item)=>{
        return(
          <div key={item._id} className="flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 ">
            <img loading="lazy" src={item.images[0] || image} alt="product Image" className="w-[100px] h-[100px] rounded-xl" />
            <div>
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-gray-600">{item.location.address}</p>
              <div> 
                <BiEditAlt className="text-xl cursor-pointer hover:text-green-700 transition-all duration-300 font-medium inline-block mr-2"/>
                <LiaExchangeAltSolid className="text-xl cursor-pointer hover:text-red-700 transition-all duration-300 font-medium inline-block "/>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ListingForMobile