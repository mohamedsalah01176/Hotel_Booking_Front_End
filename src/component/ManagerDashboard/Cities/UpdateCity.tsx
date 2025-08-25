import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ICity } from "../../../interface/city";

interface UpdateCityProps {
  setOpenUpdateContainer: (val: boolean) => void;
  handleUpdateCity: (body: { name: string; isDangerousPlace: boolean },name:string) => void;
  nameEn: string;
  cities: ICity[];
}

const UpdateCity = ({ handleUpdateCity, setOpenUpdateContainer, nameEn, cities }: UpdateCityProps) => {
  console.log(nameEn)
  const { t , i18n} = useTranslation();
  const [newName, setNewName] = useState(nameEn);

  const currentCity: ICity[] = useMemo(
    () => cities?.filter((item: ICity) => item.nameEn === nameEn),
    [nameEn, cities]
  );

  const [isDangerousPlace, setIsDangerousPlace] = useState<boolean>(
    currentCity[0]?.isDangerousPlace || false
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-[420px] shadow-2xl animate-fadeIn">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{t("cities.updateCity.updateTitle")}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {t("cities.updateCity.updateSubtitle", "Edit the city details below")}
        </p>

        <div className="mb-5">
          <label htmlFor="cityName" className="block text-sm font-medium text-gray-600 mb-2">
            {t("cities.updateCity.cityName")}
          </label>
          <input
            id="cityName"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#02717e] transition"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-gray-700">
            {isDangerousPlace ? t("cities.updateCity.dangerous") : t("cities.updateCity.safe")}
          </span>
          <button
          title="button"
            type="button"
            onClick={() => setIsDangerousPlace(!isDangerousPlace)}
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
              isDangerousPlace ? "bg-red-500" : "bg-green-500"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                isDangerousPlace ? i18n.language === "en"?"translate-x-6":"-translate-x-6" : i18n.language === "en"?"translate-x-1":"-translate-x-1" 
              }`}
            />
          </button>
        </div>


        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpenUpdateContainer(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            {t("cities.common.cancel")}
          </button>
          <button
            onClick={() => handleUpdateCity({ name: newName, isDangerousPlace },nameEn)}
            className="px-5 py-2 rounded-lg bg-[#02717e] text-white font-medium hover:bg-[#e77008] transition"
          >
            {t("cities.common.update")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCity;
