import image from "../../assets/R (1).jpg";
import type {  TFunction  } from "i18next";
import type { IAdmin } from "../../interface/property";
import { differenceInMonths, differenceInYears } from "date-fns";

const ShowHost = ({admin,t}:{admin:IAdmin,t:TFunction}) => {
  const createdAt = admin?.createdAt ? new Date(admin.createdAt) : new Date();
  const years = differenceInYears(new Date(), createdAt);
  const monthsTotal = differenceInMonths(new Date(), createdAt);
  const months = monthsTotal % 12;
  return (
      <div className=" pb-24 ">
        <h2 className="text-2xl font-semibold">{t("propertyDetails.host.meetHost")}</h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-7 md:gap-16">
          <section className="p-7 px-14 bg-white shadow-xl flex items-center flex-col sm:flex-row gap-16 rounded-xl mt-5 ">
            <div className="text-center" >
              <img src={image} alt="host" className="w-[70px] h-[70px] rounded-full mx-auto " />
              <h2 className="text-3xl font-medium">{admin?.name?admin.name:"UnKnown"}</h2>
            </div>
            <div>
              <div className="w-[120px]">
                <p className="text-xl font-bold text-center">350</p>
                <p className="text-sm font-medium text-center">{t("propertyDetails.reviews.title")}</p>
                <div className="bg-gray-300 w-full h-[2px] my-3"></div>
              </div>
              <div className="w-[120px]">
                <p className="text-xl font-bold text-center">4.6</p>
                <p className="text-sm font-medium text-center">{t("propertyDetails.reviews.rating")}</p>
                <div className="bg-gray-300 w-full h-[2px] my-3"></div>
              </div>
              <div className="w-[120px]">
                {years>=1?
                <>
                  <p className="text-xl font-bold text-center">{years}</p>
                  <p className="text-sm font-medium text-center">{t("propertyDetails.reviews.monthsHosting")}</p>
                </>
                :
                <>
                  <p className="text-xl font-bold text-center">{months}</p>
                  <p className="text-sm font-medium text-center">{t("propertyDetails.reviews.monthsHosting")}</p>
                </>
                }
              </div>
            </div>
          </section>
          <section className="">
            <h2 className="text-lg font-medium">{admin?.name?admin.name:"UnKnown"} {t("propertyDetails.host.superhost")}</h2>
            <p className="mt-3 mb-5 text-gray-700">{t("propertyDetails.host.superhostDescription")}</p>
            <h2 className="text-lg font-medium">{t("propertyDetails.host.hostDetails")}</h2>
            <p className="mt-3 text-gray-700">{t("propertyDetails.host.responseRate")}: 100%</p>
            <p className="text-gray-700 mb-7">{t("propertyDetails.host.responseTime")}</p>
            <h2 className="text-lg font-medium">{t("propertyDetails.host.contactDetails")}</h2>
            <p className="mt-3 text-gray-700">{t("propertyDetails.host.whatsapp")}: <span className="text-[#02717e] font-medium">{admin?.phone?admin?.phone:t("notFound",{name:"phone"})}</span></p>
            <p className="mt-3 text-gray-700">{t("propertyDetails.host.email")}: <span className="text-[#02717e] font-medium">{admin?.email?admin?.email:t("notFound",{name:"email"})}</span></p>
          </section>
        </div>
      </div>
  )
}

export default ShowHost