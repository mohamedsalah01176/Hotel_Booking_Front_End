import { useTranslation } from "react-i18next";
import MapComponenet from "./MapComponenet"

const Location = ({coords,setCoords}:{coords:{ lat: number; lng: number,city:string,address:string } | null ,setCoords:(val:{ lat: number; lng: number,city:string,address:string } )=>void}) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center min-h-[80vh] mb-24 flex-col animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">{t("addListing.location.title")}</h2>
        <p className="text-gray-600 mt-1 mb-10">{t("addListing.location.desc")}</p>
      </div>

      <MapComponenet coords={coords} setCoords={setCoords} />

      {coords && (
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-[300px] md:w-[500px] text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {t("addListing.location.selected_title")}
          </h3>
          <p className="text-gray-700">
            <span className="font-medium">{t("addListing.location.city")}: </span>
            {coords.city || t("addListing.location.not_detected")}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">{t("addListing.location.address")}: </span>
            {coords.address || t("addListing.location.not_detected")}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t("addListing.location.latlng", {
              lat: coords.lat.toFixed(4),
              lng: coords.lng.toFixed(4),
            })}
          </p>
        </div>
      )}
    </div>
  )
}

export default Location