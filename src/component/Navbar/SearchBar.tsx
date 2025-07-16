import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="flex justify-center">
      <div className="flex justify-between items-center bg-white border border-gray-300 shadow-md rounded-full max-w-4xl w-full px-2">
        <div className="flex w-full">
          <div className={`flex-2 basis-2/5 hover:bg-gray-100 hover:rounded-full cursor-pointer p-4 ${isRTL ? "border-l" : "border-r"} border-gray-300`}>
            <div className="font-bold text-sm">{t("search.where")}</div>
            <div className="text-gray-500">{t("search.destination")}</div>
          </div>

          <div className={`flex-1 basis-1/5 hover:bg-gray-100 hover:rounded-full cursor-pointer p-4 ${isRTL ? "border-l" : "border-r"} border-gray-300`}>
            <div className="font-bold text-sm">{t("search.check_in")}</div>
            <div className="text-gray-500">{t("search.add_dates")}</div>
          </div>

          <div className={`flex-1 basis-1/5 hover:bg-gray-100 hover:rounded-full cursor-pointer p-4 ${isRTL ? "border-l" : "border-r"} border-gray-300`}>
            <div className="font-bold text-sm">{t("search.check_out")}</div>
            <div className="text-gray-500">{t("search.add_dates")}</div>
          </div>

          <div className="flex-1 basis-1/5 hover:bg-gray-100 hover:rounded-full cursor-pointer p-4">
            <div className="font-bold text-sm">{t("search.who")}</div>
            <div className="text-gray-500">{t("search.guests")}</div>
          </div>
        </div>

        <div className="bg-rose-500 text-white p-3 rounded-full ml-2">
          <Search size={20} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
