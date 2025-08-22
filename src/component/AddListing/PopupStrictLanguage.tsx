import { useTranslation } from "react-i18next"

const PopupStrictLanguage = ({setShowPopup,titleEn,titleAr}:{setShowPopup:(val:boolean)=>void,titleEn:string,titleAr:string}) => {
  const {i18n}=useTranslation()
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md text-center">
            <p className="mb-4 text-lg font-semibold">
              {i18n.language === "ar"
                ? `الرجاء إدخال ${titleAr} باللغة العربية فقط.`
                : `Please enter the ${titleEn} in English only.`}
            </p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
  )
}

export default PopupStrictLanguage