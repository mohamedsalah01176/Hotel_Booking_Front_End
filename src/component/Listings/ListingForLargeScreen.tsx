import image from "../../assets/default.jpg"
import { BiEditAlt } from "react-icons/bi";
import type { IProperty } from "../../interface/property";
import { LiaExchangeAltSolid } from "react-icons/lia";

const ListingForLargeScreen = ({properties,ChangeActiveProperty}:{properties:IProperty[],ChangeActiveProperty:(val1:string,val2:boolean)=>void}) => {

  return (
    <table className="mt-10 w-full hidden md:table">
        <thead>
          <tr className="text-left">
            <th className="pl-4">Listing</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={5} className="h-4"></td></tr>
          {properties?.map((item)=>{
            return(
            <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10 ">
              <td className="py-5 pl-4 rounded-xl w-[290px]">
                <img loading="lazy" src={item.images[0] || image} alt="image" className="rounded-xl w-[50px] h-[50px] inline-block" />
                <p className="inline-block ml-3 text-lg font-medium">{item.title}</p>
              </td>
              <td className="pr-2">{item.category}</td>
              <td className="w-[290px]">{item.location.address}</td> 
              <td className="rounded-xl">
                {item.isActive ?
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                :
                  <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                    Stoped
                  </span>
                }
              </td>
              <td>
                <BiEditAlt className="text-2xl cursor-pointer hover:text-green-700 transition-all duration-300 font-medium inline-block mr-2"/>
                <LiaExchangeAltSolid onClick={()=>ChangeActiveProperty(item._id as string,item.isActive)} className="text-2xl cursor-pointer hover:text-sky-700 transition-all duration-300 font-medium inline-block "/>
              </td>
            </tr>
            )}
          )}
        </tbody>
      </table>
  )
}

export default ListingForLargeScreen