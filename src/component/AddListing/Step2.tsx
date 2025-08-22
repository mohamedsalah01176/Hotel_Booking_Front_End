import image from "../../assets/explain2.webp";
import { useTranslation } from "react-i18next";

const Step2 = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-[70vh] pt-5 pb-10 animate-fade-in">
      <div className="md:w-[50%]">
        <p className="font-medium">{t("addListing.step2.label")}</p>
        <h2 className="text-5xl font-semibold w-[100%] md:w-[80%] mt-4 mb-10">
          {t("addListing.step2.title")}
        </h2>
        <p className="text-gray-700 md:w-[90%] text-lg">
          {t("addListing.step2.desc")}
        </p>
      </div>
      <div className="md:w-[35%]">
        <img loading="lazy" src={image} alt="step2" className="w-full" />
      </div>
    </div>
  );
};

export default Step2;
