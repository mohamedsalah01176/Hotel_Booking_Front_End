import { useTranslation } from "react-i18next";
import image1 from "../../assets/explain1.webp";
import image2 from "../../assets/explain2.webp";
import image3 from "../../assets/explain3.webp";

const ExplainPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-10 pb-10 animate-fade-in">
      <div>
        <h2 className="text-5xl font-semibold w-[100%] md:w-[80%] leading-14">
          {t("addListing.explain.title")}
        </h2>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex gap-3 py-5 border-b border-gray-400">
          <div>
            <h3 className="text-2xl font-medium">{t("addListing.explain.step1_title")}</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">
              {t("addListing.explain.step1_desc")}
            </p>
          </div>
          <img loading="lazy" src={image1} alt="step1" className="w-[150px]" />
        </div>

        <div className="flex gap-3 py-5 border-b border-gray-400">
          <div>
            <h3 className="text-2xl font-medium">{t("addListing.explain.step2_title")}</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">
              {t("addListing.explain.step2_desc")}
            </p>
          </div>
          <img loading="lazy" src={image2} alt="step2" className="w-[150px]" />
        </div>

        <div className="flex gap-3 py-5">
          <div>
            <h3 className="text-2xl font-medium">{t("addListing.explain.step3_title")}</h3>
            <p className="text-gray-700 text-lg leading-5 mt-3 ml-4">
              {t("addListing.explain.step3_desc")}
            </p>
          </div>
          <img loading="lazy" src={image3} alt="step3" className="w-[150px]" />
        </div>
      </div>
    </div>
  );
};

export default ExplainPage;
