import { Link } from "react-router"
import type { HorizontalCardSliderProps } from "../interface/HorizontalCardSliderProps"

const PropertyCard = ({item}:{item:HorizontalCardSliderProps}) => {
  return (
    <Link to={"/propertyDetails/1"} key={item.id} className="pr-3 block">
      <div className="relative rounded-xl overflow-hidden">
        <img
          loading="lazy"
          src={item.image}
          alt={item.title}
          className="w-full h-45 object-cover rounded-2xl"
          width={170}
          height={180}
        />
        {/* <span className="absolute top-2 left-2 bg-white text-xs font-semibold rounded-full px-3 py-1 shadow">
          Guest favorite
        </span> */}
      </div>
      <div className="mt-2 text-sm">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-500">
          ج.م  {item.price} ل 2 ليالٍ  • ★  {item.rating}
        </p>
      </div>
    </Link>
  )
}

export default PropertyCard