import type { IReview } from "../../interface/property";
import defaultUserImage from "../../assets/defaultUser.png";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

const ShowAllReview = ({reviews,setOpenAllReviews}:{reviews:IReview[],setOpenAllReviews:(val:boolean)=>void}) => {
  const {t,i18n}=useTranslation()
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[70%] max-h-[80vh] overflow-y-auto p-6 rounded-2xl relative">
            <button
              title="close window"
              onClick={() => setOpenAllReviews(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl cursor-pointer"
            >
              <IoClose className="text-3xl text-red-700 hover:rotate-180 transition-all duration-500"/>
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {t("propertyDetails.allReviews")}
            </h2>

            <div className="space-y-6">
              {reviews.map((item: IReview, index: number) => {
                const createAtUser = new Date(item?.createdAt || "Jun 10,2023");
                const nowDate = new Date();
                const years =
                  nowDate.getFullYear() - createAtUser.getFullYear();
                const createAtComment = new Date(
                  item?.createdAt || "Jun 10,2023"
                );

                return (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-4 last:border-none"
                  >
                    <div className="flex gap-3 items-start">
                      <img
                        loading="lazy"
                        src={defaultUserImage}
                        alt="image"
                        className="w-[50px] h-[50px] rounded-full"
                      />
                      <div>
                        <p className="text-lg font-medium">{item?.user?.name}</p>
                        <p className="text-gray-700">{years} year on Hosting</p>
                      </div>
                      <p className="ml-auto text-gray-500">
                        {createAtComment.toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium mt-3">
                      {i18n.language === "en" ? item.dataEn : item.dataAr}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  )
}

export default ShowAllReview