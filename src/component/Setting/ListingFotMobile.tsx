import image from "../../assets/default.jpg"
import { useNavigate } from "react-router";
import type { IPropertyWithReserves } from "../../interface/ReserveDate";
const ListingFotMobile = ({properties}:{properties:IPropertyWithReserves[]}) => {
  const nav=useNavigate();
  return (
    <div className="mt-10 md:hidden">
      {properties.map((item)=>{
        const startDate=new Date(item.reserveDates[0].dates[0]);
            const endDate=new Date(item.reserveDates[0].dates[item.reserveDates[0].dates.length-1]);
            const isExpired=endDate < new Date();
            const isDuring = startDate <=  new Date() &&  new Date() <= endDate;  ;
          return(
            <div onClick={() => nav(`/propertyDetails/${item.property._id}`)} 
              key={item.property._id} 
              className="cursor-pointer flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 w-full">

            <div className="relative">
              <img 
                loading="lazy" 
                src={item.property.images[0] || image} 
                alt="product Image" 
                className="w-[100px] h-[100px] rounded-xl" 
              />
              {isExpired ? (
                <div className="absolute top-2 right-1 text-[10px] bg-red-100 text-red-800 px-2 py-1 rounded-2xl">Ended</div>
              ) : isDuring ? (
                <div className="absolute top-2 right-1 text-[10px] bg-green-100 text-green-800 px-2 py-1 rounded-2xl">During</div>
              ) : (
                <div className="absolute top-2 right-1 text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded-2xl">Upcoming</div>
              )}
            </div>

            <div>
              <h2 className="text-[19px] font-medium">
                {item?.property.title.split(" ").slice(0, 3).join(" ")}
              </h2>
              <p className="text-gray-600">{item.property.location.address}</p>

              <div className="flex flex-col sm:flex-row justify-between sm:items-center sm:w-[300px]">
                <p className="text-sm text-gray-700">
                  {item.property.admin.phone}
                </p>

                <p className="text-sm text-gray-700">
                  {new Date(item.reserveDates?.[0]?.dates[0]).toLocaleDateString()} 
                  {" - "} 
                  {new Date(item.reserveDates?.[0]?.dates[item.reserveDates[0]?.dates.length - 1]).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default ListingFotMobile