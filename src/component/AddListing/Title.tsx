import { useState } from "react";
import { useTranslation } from "react-i18next"
import PopupStrictLanguage from "./PopupStrictLanguage";

const Title = ({category,title,setTitle}:{category:string,title:string,setTitle:(val:string)=>void}) => {
  const {t}=useTranslation();
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="py-10 h-[70vh] flex flex-col justify-center items-center animate-fade-in z-20">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">
          {t("addListing.title.heading", { category: category  || t("addListing.title.defaultCategory") })}
        </h2>
        <p className="text-gray-600 mt-1 mb-7">{t("addListing.title.subtitle")}</p>
      </div>
      <div>
        <textarea 
          title="title" 
          maxLength={32} 
          name="title" 
          id="" 
          onChange={(e)=>setTitle(e.target.value)}  
          value={title} 
          className="border border-gray-400 rounded-xl w-[300px] md:w-[600px] h-[150px] md:h-[200px] p-4 text-xl bg-white"
        ></textarea>
        <p>{title.length}/32</p>
      </div>
      {showPopup && (
        <PopupStrictLanguage titleEn={"Title"} titleAr={"العنوان"} setShowPopup={setShowPopup}/>
      )}
    </div>
  )
}

export default Title