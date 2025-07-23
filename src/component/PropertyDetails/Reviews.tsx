import defaultImage from "../../assets/default.jpg";
import type { i18n as i18nType, TFunction  } from "i18next";
import type { IReview } from "../../interface/property";
const Reviews = ({i18n,reviewsEn,reviewsAr,t}:{reviewsEn:IReview[],reviewsAr:IReview[],i18n:i18nType,t:TFunction}) => {
  if(reviewsEn?.length<=0){
    return<div className="py-12  bg-white p-7 rounded-xl  text-center flex-col">
      <p className="text-3xl">
        {t("propertyDetails.notReview")}
      </p>
      <button className="p-3 bg-[#02717e] text-white rounded-xl mt-5 text-xl cursor-pointer hover:bg-[#305458] transition-all duration-300">{t("propertyDetails.addReview")}</button>
    </div>
  }
  return (
    <div className="grid grid-cols-2 py-12 gap-14 bg-white p-7 rounded-xl">
        {i18n.language === "en"?
          reviewsEn?.slice(0,6).map((item:IReview,index:number)=>{
            const createAtUser= new Date(item?.user?.createdAt || "Jun 10,2023");
            const nowDate=new Date();
            const years=nowDate.getFullYear()-createAtUser.getFullYear()
            const createAtCommet= new Date(item?.createdAt || "Jun 10,2023");
            return(
              <div key={index}>
                  <div className="flex gap-3 items-start">
                  <img loading="lazy" src={defaultImage} alt="image" className="w-[50px] h-[50px] rounded-full" />
                  <div>
                    <p className="text-lg font-medium">{item?.user?.name}</p>
                    <p className="text-gray-700">{years} year on Hosting</p>
                  </div>
                  <p className="mx-auto">{createAtCommet.toLocaleDateString()}</p>
                </div>
                <p className="text-gray-800 font-medium mt-3">{item?.comment}</p>
              </div>
            )
          })
          :
          reviewsAr?.slice(0,6).map((item:IReview,index:number)=>{
            const createAtUser= new Date(item?.user?.createdAt || "Jun 10, 2023" ) ;
            const nowDate=new Date();
            const years=nowDate.getFullYear()-createAtUser.getFullYear();
            const createAtCommet= new Date(item?.createdAt || "Jun 10,2023");

            return(
              <div key={index}>
                  <div className="flex gap-3 items-start">
                  <img loading="lazy" src={defaultImage} alt="image" className="w-[50px] h-[50px] rounded-full" />
                  <div>
                    <p className="text-lg font-medium">{item?.user?.name}</p>
                    <p className="text-gray-700">يستضيف منذ {years} سنة"</p>
                  </div>
                  <p className="mx-auto">{createAtCommet.toLocaleDateString()}</p>
                </div>
                <p className="text-gray-800 font-medium mt-3">{item?.comment}</p>
              </div>
            )
          })}
          <div className="flex gap-5 items-center">
            <button className="block w-[180px] text-left bg-[#e2e0e0] p-4 rounded-xl font-medium cursor-pointer hover:bg-[#c1c0c0] transition-all duration-300 ">
              {t("propertyDetails.showAll")}
            </button>
            <button className="p-3 block bg-[#02717e] text-white rounded-xl text-lg cursor-pointer hover:bg-[#294a4c] transition-all duration-300">{t("propertyDetails.addReview")}</button>
          </div>
        </div>
  )
}

export default Reviews