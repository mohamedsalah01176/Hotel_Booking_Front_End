import { TbBeach } from "react-icons/tb";

const PlaceOffer = ({title}:{title:string | undefined}) => {
  return (
    <div className="flex gap-4 text-gray-700 mt-7">
      <TbBeach className="text-4xl"/>
      <p className="text-lg font-medium">{title}</p>
    </div>
  )
}

export default PlaceOffer