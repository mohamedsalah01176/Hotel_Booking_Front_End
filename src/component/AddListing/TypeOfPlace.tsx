import { IoHomeOutline } from "react-icons/io5";
import { LuDoorOpen } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const TypeOfPlace = ({
  category,
  setCategory,
}: {
  category: string;
  setCategory: (val: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="text-black flex-col flex justify-center items-center translate-y-[-10%] gap-7 h-[70vh] mt-14 animate-fade-in">
      <h2 className="text-3xl font-semibold">{t("addListing.typeOfPlace.title")}</h2>

      <div className="md:w-[600px]">
        <div
          onClick={() => setCategory("home")}
          className={`flex items-center justify-between gap-3 p-5 border-2 rounded-xl w-full mt-2 cursor-pointer transition-all duration-300
            ${
              category === "home"
                ? "bg-gray-100 border-black"
                : "border-gray-200 hover:bg-gray-100 hover:border-black"
            }`}
        >
          <div>
            <h3 className="text-lg font-medium">{t("addListing.typeOfPlace.home_title")}</h3>
            <p className="text-gray-600">{t("addListing.typeOfPlace.home_desc")}</p>
          </div>
          <IoHomeOutline className="text-3xl" />
        </div>

        <div
          onClick={() => setCategory("apartment")}
          className={`flex items-center justify-between gap-3 p-5 border-2 rounded-xl w-full mt-2 cursor-pointer transition-all duration-300
            ${
              category === "apartment"
                ? "bg-gray-100 border-black"
                : "border-gray-200 hover:bg-gray-100 hover:border-black"
            }`}
        >
          <div>
            <h3 className="text-lg font-medium">{t("addListing.typeOfPlace.apartment_title")}</h3>
            <p className="text-gray-600 w-[90%]">{t("addListing.typeOfPlace.apartment_desc")}</p>
          </div>
          <LuDoorOpen className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default TypeOfPlace;
