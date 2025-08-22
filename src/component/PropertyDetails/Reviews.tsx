import { useContext, useState } from "react";
import defaultUserImage from "../../assets/defaultUser.png";
import type { i18n as i18nType, TFunction } from "i18next";
import type { IReview } from "../../interface/property";
import ShowAllReview from "./ShowAllReview";
import { TokenContext } from "../../util/TokenContext";

const Reviews = ({token,i18n,reviews,t,setOpenAddReview,}: {token: string;reviews: IReview[];i18n: i18nType;t: TFunction;setOpenAddReview: (val: boolean) => void;}) => {
  const [openAllReviews, setOpenAllReviews] = useState(false);
  const {decode}=useContext(TokenContext);
  if (reviews?.length <= 0) {
    return (
      <div className="py-12 bg-white p-7 rounded-xl text-center flex-col">
        <p className="text-3xl">{t("propertyDetails.notReview")}</p>
        {token !== "" && decode.role === "user" && (
          <button
            onClick={() => setOpenAddReview(true)}
            className="p-3 block mx-auto mt-7 bg-[#02717e] text-white rounded-xl text-lg cursor-pointer hover:bg-[#294a4c] transition-all duration-300"
          >
            {t("propertyDetails.addReview")}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-7 rounded-xl">
      <div className="grid grid-cols-2 py-12 gap-14">
        {reviews?.slice(0, 4).map((item: IReview, index: number) => {
          const createAtUser = new Date(item?.createdAt || "Jun 10,2023");
          const nowDate = new Date();
          const years = nowDate.getFullYear() - createAtUser.getFullYear();
          const createAtComment = new Date(item?.createdAt || "Jun 10,2023");

          return (
            <div key={index}>
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
                <p className="mx-auto">{createAtComment.toLocaleDateString()}</p>
              </div>
              <p className="text-gray-800 font-medium mt-3">
                {i18n.language === "en" ? item.dataEn : item.dataAr}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 items-center">
        {reviews?.length > 4 && (
          <button
            onClick={() => setOpenAllReviews(true)}
            className="block w-[180px] text-center bg-[#e2e0e0] p-4 rounded-xl font-medium cursor-pointer hover:bg-[#c1c0c0] transition-all duration-300"
          >
            {t("propertyDetails.showAll", { count: reviews?.length })}
          </button>
        )}

        {token !== "" && (
          <button
            onClick={() => setOpenAddReview(true)}
            className="p-3 block bg-[#02717e] text-white rounded-xl text-lg cursor-pointer hover:bg-[#294a4c] transition-all duration-300"
          >
            {t("propertyDetails.addReview")}
          </button>
        )}
      </div>

      {openAllReviews && <ShowAllReview setOpenAllReviews={setOpenAllReviews} reviews={reviews}/>}
    </div>
  );
};

export default Reviews;
