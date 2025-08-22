import { useState } from "react";
import { useTranslation } from "react-i18next";

const PriceForNigth = ({price,setPrice}:{price:number,setPrice:(val:number)=>void}) => {
    const [inputValue, setInputValue] = useState(price.toLocaleString());
    const {t}=useTranslation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = parseInt(rawValue);
    if (!isNaN(numericValue)) {
      setPrice(numericValue);
      setInputValue(numericValue.toLocaleString());
    } else {
      setPrice(0);
      setInputValue("");
    }
  };
  return (
    <div className="py-10 h-[76vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">{t("addListing.price_for_night.title")}</h2>
        <p className="text-gray-600 mt-1 mb-10">{t("addListing.price_for_night.desc")}</p>
      </div>
      <div className="flex flex-col items-center my-10">
        <div className="flex justify-center items-center">
          <p className="text-6xl font-bold mx-1">{t("addListing.price_for_night.currency")}</p>
          <input 
            value={inputValue} 
            onChange={handleChange} 
            type="text" 
            className="text-6xl font-bold outline-none w-[200px] mx-auto overflow-hidden"  
            title="price"
          />
        </div>
        <p className="text-gray-500 mt-2">
          {t("addListing.price_for_night.guest_price", { price: (price + (0.10 * price)).toLocaleString() })}
        </p>
      </div>
    </div>
  )
}

export default PriceForNigth