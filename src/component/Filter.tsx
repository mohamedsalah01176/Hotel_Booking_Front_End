import {  useContext, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { IProperty } from "../interface/property";
import { GeneralContext } from "../util/GeneralContext";
import { useTranslation } from "react-i18next";

const Filter = ({ properties,setFilteredProperties }:{properties:IProperty[],setFilteredProperties:(val:IProperty[])=>void}) => {
    const [open, setOpen] = useState(false);
    const [sortType, setSortType] = useState("");
    const [minPrice,setMinPrice] =useState<number>(0);
    const [maxPrice,setMaxPrice] =useState<number>(0);
    const [error,setError] =useState<string>("");
    const { t } = useTranslation();
    const {sharedProperties} = useContext(GeneralContext);
    const handleSort = (type: string) => {
      setSortType(type);
      const data =properties?.length>0?[...properties]: [...sharedProperties]; 

      if (type === "high") {
        data.sort((a, b) => b.nightPrice - a.nightPrice);
      } else if (type === "low") {
        data.sort((a, b) => a.nightPrice - b.nightPrice);
      } else if (type === "booked") {
        data.sort((a, b) => (b.ordersNumbers ?? 0) - (a.ordersNumbers ?? 0));
      } else if (type === "rated") {
        data.sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0));
      }

      setFilteredProperties(data);
    };

    const handlePrice = () => {
      if (maxPrice < minPrice) {
        setError("Max price cannot be less than Min price");
        setFilteredProperties([]);
        return;
      }

      const result = sharedProperties.filter(
        (item) => item.nightPrice >= minPrice && item.nightPrice <= maxPrice
      );

      setFilteredProperties(result);
      console.log(result, "resulttttttttt");
      setError("");
    };
  return (
    <div className="fixed bottom-8 left-1/2 translate-x-[-50%] z-10">
      <button
        title="filter"
        onClick={() => setOpen(!open)}
        className="text-2xl text-white text-center bg-[#02717e] hover:bg-[#e77008] transition-all cursor-pointer duration-300 w-[50px] h-[50px] rounded-full"
      >
        {open?
        <IoClose className="mx-auto animate-fade-in  text-3xl"/>
        :
        <FaFilter className="mx-auto animate-fade-in " />
        }
      </button>

      {open && (
        <>
          <div className="bg-[#02717e] p-3 rounded-xl absolute bottom-18 -left-30 w-[300px] min-h-[300px] shadow-lg animate-fade-in ">
            <div className="bg-white rounded-t-xl p-3 pt-4 pb-2">
              <label htmlFor="price" className="text-lg font-medium">
                {t("filter.price")}:
              </label>
              <div className="flex  items-center gap-3 justify-center">
                <div className="flex items-center gap-1">
                  <p className="text-gray-700">{t("filter.from")}:</p>
                  <input
                    type="number"
                    title="price"
                    className="block mt-1 w-[80px] border rounded p-2"
                    onChange={(e)=>setMinPrice(Number(e.target.value))}
                    min={0}
                    max={maxPrice}
                    />
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-gray-700">{t("filter.to")}:</p>
                  <input
                    type="number"
                    title="price"
                    className="block mt-1  w-[80px] border rounded p-2"
                    onChange={(e)=>setMaxPrice(Number(e.target.value))}
                    min={minPrice}
                    max={10000}
                  />
                </div>
              </div>
              {error && <p className="text-[12px] text-center text-red-700">{t("filter.errorMaxLessThanMin")}</p>}
              <button onClick={handlePrice} className="bg-[#02717e] text-white block w-full py-2 rounded-xl mt-3">{t("filter.apply")}</button>
            </div>

            <div className="bg-white rounded-b-xl p-3 pt-2 pb-4 ">
              <label htmlFor="sort" className="text-lg font-medium">
                {t("filter.sortBy")}:
              </label>
              <div className="flex flex-col gap-2 mt-2">
                <button
                  onClick={() => handleSort("high")}
                  className={`px-3 py-1 rounded ${
                    sortType === "high" ? "bg-[#02717e] text-white" : "bg-gray-100"
                  }`}
                >
                  {t("filter.highToLow")}
                </button>
                <button
                  onClick={() => handleSort("low")}
                  className={`px-3 py-1 rounded ${
                    sortType === "low" ? "bg-[#02717e] text-white" : "bg-gray-100"
                  }`}
                >
                  {t("filter.lowToHigh")}
                </button>
                <button
                  onClick={() => handleSort("booked")}
                  className={`px-3 py-1 rounded ${
                    sortType === "booked" ? "bg-[#02717e] text-white" : "bg-gray-100"
                  }`}
                >
                  {t("filter.mostBooked")}
                </button>
                <button
                  onClick={() => handleSort("rated")}
                  className={`px-3 py-1 rounded ${
                    sortType === "rated" ? "bg-[#02717e] text-white" : "bg-gray-100"
                  }`}
                >
                  {t("filter.highestRated")}
                </button>
              </div>
            </div>
          </div>

          <div className="animate-fade-in absolute -top-5 left-1/2 border-[18px] translate-x-[-50%] z-10 border-t-[#02717e] border-l-transparent border-r-transparent border-b-transparent"></div>
        </>
      )}
    </div>
  );
};


export default Filter