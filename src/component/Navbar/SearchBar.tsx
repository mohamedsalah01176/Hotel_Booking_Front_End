import { useTranslation } from "react-i18next";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="flex justify-center h-[55px]">
      <div className="flex justify-between items-center bg-white border border-gray-300 shadow-md rounded-full max-w-lg w-full pr-4 transition-all duration-300">
        <div className="flex w-full">
          <div className={`flex-2 basis-2/5 hover:bg-gray-100 hover:rounded-full px-10 cursor-pointer p-1 ${isRTL ? "border-l" : "border-r"} border-gray-300 transition-all duration-300` }>
            <div className="font-bold text-sm">{t("search.where")}</div>
            <div className="text-gray-500">{t("search.destination")}</div>
          </div>
        </div>
        <div className="bg-[#f67808] text-white p-3 rounded-full ml-2 transition-all duration-300 hover:bg-[#02717e]">
          <IoSearch size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
