import { Link } from "react-router"
import type { IProperty } from "../interface/property"
import { useTranslation } from "react-i18next"
import { LuShieldAlert } from "react-icons/lu";
import { BsShieldCheck } from "react-icons/bs";

const PropertyCard = ({item}:{item:IProperty}) => {
  const {t,i18n}=useTranslation();
  return (
    <Link to={`/propertyDetails/${item._id}`} key={item._id} className="pr-3 block animate-fade-in ">
      <div className="relative rounded-xl overflow-hidden">
        <img
          loading="lazy"
          src={item.images[0]}
          alt={item.title}
          className="w-full h-45 object-cover rounded-2xl"
          width={170}
          height={180}
        />
        {item.isDangerousPlace === false ?
          <div className={` absolute top-2 ${i18n.language === "en" ?"left-2":"right-2"}  flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-2xl shadow-md`}>
            <BsShieldCheck className="w-4 h-4" />
            <span className="font-medium text-[12px]">{t("home.safe_area")}</span>
          </div>
        :
          <div className={`absolute top-2 ${i18n.language === "en" ?"left-2":"right-2"}  flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-2xl shadow-md`}>
          <LuShieldAlert className="w-4 h-4" />
          <span className="font-semibold text-[12px]">{t("home.dangerous_area")}</span>
        </div>
        }
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