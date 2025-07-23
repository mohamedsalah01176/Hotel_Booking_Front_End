import type { i18n as i18nType, TFunction  } from "i18next";
import type { ILocation } from "../../interface/property";

const HotalLocation = ({i18n,location,t}:{location:ILocation,i18n:i18nType,t:TFunction}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{t("propertyDetails.where")}</h2>
      <p className="text-lg mt-2 mb-8">{i18n.language === "en"?location?.addressEn+", "+location?.cityEn:location?.addressAr+", "+location?.cityAr}</p>
      <iframe
        src={`https://maps.google.com/maps?q=${location?.coordinates.lat},${location?.coordinates.lng}&z=14&output=embed`}
        width="600"
        height="450"
        style={{ border: 0, width: "100%" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>    
    </div>
  )
}

export default HotalLocation