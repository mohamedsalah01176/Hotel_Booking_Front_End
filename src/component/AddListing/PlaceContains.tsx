import { useTranslation } from "react-i18next";
import { GoDash } from "react-icons/go";
import { GoPlus } from "react-icons/go";

interface IProps{
  placeContain:{geust:number,badrooms:number,beds:number,bathrooms:number}
  setPlaceContain:(val:{geust:number,badrooms:number,beds:number,bathrooms:number})=>void
}
const PlaceContains = ({placeContain,setPlaceContain}:IProps) => {
  const {t}=useTranslation()
  return (
    <div className='flex flex-col justify-center items-center min-h-[70vh] py-7'>
      <div>
        <h2 className="text-3xl font-semibold">{t("addListing.placeContains.title")}</h2>
        <p className="text-gray-600 mt-1 mb-10">{t("addListing.placeContains.desc")}</p>
      </div>
      <div className='w-[300px] md:w-[600px]'>
        <div className='flex justify-between items-center border-b border-gray-200 py-5 w-full'>
          <h3 className=' text-xl'>{t("addListing.placeContains.guest")}</h3>
          <div className='flex items-center gap-2'>
            <button onClick={()=>setPlaceContain({...placeContain,geust:placeContain.geust>1?placeContain.geust-1:1})} title="munise" className={`w-[25px] h-[25px] border rounded-full cursor-pointer ${placeContain.geust<=1 && "border-gray-400 bg-gray-100 text-gray-500"}`}><GoDash className="mx-auto"/></button>
            <div className="text-xl">{placeContain.geust}</div>
            <button onClick={()=>setPlaceContain({...placeContain,geust:placeContain.geust+1})} title="plus" className='w-[25px] h-[25px] border rounded-full cursor-pointer'><GoPlus className="mx-auto"/></button>
          </div>
        </div>
        <div className='flex justify-between items-center border-b border-gray-200 py-5 w-full mt-4'>
          <h3 className=' text-xl'>{t("addListing.placeContains.bedrooms")}</h3>
          <div className='flex items-center gap-2'>
            <button onClick={()=>setPlaceContain({...placeContain,badrooms:placeContain.badrooms>1?placeContain.badrooms-1:1})} title="munise" className={`w-[25px] h-[25px] border rounded-full cursor-pointer ${placeContain.badrooms<=1 && "border-gray-400 bg-gray-100 text-gray-500"}`}><GoDash className="mx-auto"/></button>
            <div className="text-xl">{placeContain.badrooms}</div>
            <button onClick={()=>setPlaceContain({...placeContain,badrooms:placeContain.badrooms+1})} title="plus" className='w-[25px] h-[25px] border rounded-full cursor-pointer'><GoPlus className="mx-auto"/></button>
          </div>
        </div>
        <div className='flex justify-between items-center border-b border-gray-200 py-5 w-full mt-4'>
          <h3 className=' text-xl'>{t("addListing.placeContains.beds")}</h3>
          <div className='flex items-center gap-2'>
            <button onClick={()=>setPlaceContain({...placeContain,beds:placeContain.beds>1?placeContain.beds-1:1})} title="munise" className={`w-[25px] h-[25px] border rounded-full cursor-pointer ${placeContain.beds<=1 && "border-gray-400 bg-gray-100 text-gray-500"}`}><GoDash className="mx-auto"/></button>
            <div className="text-xl">{placeContain.beds}</div>
            <button onClick={()=>setPlaceContain({...placeContain,beds:placeContain.beds+1})} title="plus" className='w-[25px] h-[25px] border rounded-full cursor-pointer'><GoPlus className="mx-auto"/></button>
          </div>
        </div>
        <div className='flex justify-between items-center py-5 w-full mt-4'>
          <h3 className=' text-xl'>{t("addListing.placeContains.bathrooms")}</h3>
          <div className='flex items-center gap-2'>
            <button onClick={()=>setPlaceContain({...placeContain,bathrooms:placeContain.bathrooms>1?placeContain.bathrooms-1:1})} title="munise" className={`w-[25px] h-[25px] border rounded-full cursor-pointer ${placeContain.bathrooms<=1 && "border-gray-400 bg-gray-100 text-gray-500"}`}><GoDash className="mx-auto"/></button>
            <div className="text-xl">{placeContain.bathrooms}</div>
            <button onClick={()=>setPlaceContain({...placeContain,bathrooms:placeContain.bathrooms+1})} title="plus" className='w-[25px] h-[25px] border rounded-full cursor-pointer'><GoPlus className="mx-auto"/></button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PlaceContains