import { useTranslation } from "react-i18next"
import type { IProperty } from "../../interface/property"
import { Link } from "react-router"

const SearchItem = ({item}:{item:IProperty}) => {
  const {t,i18n}=useTranslation()
  return (
    <Link to={`/propertyDetails/${item._id}`} className="text-black animate-fade-in border-b-[1px] border-gray-300 px-7 pt-7 pb-3 cursor-pointer hover:bg-gray-100 transition-all duration-300 flex items-center gap-3">
      <img loading="lazy" src={item?.images[0]} alt={item?.title} className="w-[50px] h-[50px] rounded-xl"/>
      <div className="">
        <h2>{i18n.language === "en"?item?.titleEn :item.titleAr}</h2>
        <p className="text-sm text-gray-600">{t("home.price_summary",{price:item.nightPrice,rate:item.rate})}</p>
      </div>
    </Link>
  )
}

export default SearchItem