import { Link } from "react-router"
import type { IProperty } from "../interface/property"
import { useTranslation } from "react-i18next"

const PropertyCard = ({item}:{item:IProperty}) => {
  const {t,i18n}=useTranslation();
  return (
    <Link to={`/propertyDetails/${item._id}`} key={item._id} className="pr-3 block ">
      <div className="relative rounded-xl overflow-hidden">
        <img
          loading="lazy"
          src={item.images[0]}
          alt={item.title}
          className="w-full h-45 object-cover rounded-2xl"
          width={170}
          height={180}
        />
        {/* <span className="absolute top-2 left-2 bg-white text-xs font-semibold rounded-full px-3 py-1 shadow">
          Guest favorite
        </span> */}
      </div>
      <div className="mt-2  text-sm ">
        <h3 className="font-medium ">{i18n.language === "en"?item?.titleEn:item?.titleAr}</h3>
        <p className="text-gray-500">
          {t("home.price_summary",{price:item?.nightPrice,rate:item?.rate})}
        </p>
      </div>
    </Link>
  )
}

export default PropertyCard