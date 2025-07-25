import { Link } from "react-router"
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import logoImage from "../assets/logo.webp"
import { useTranslation } from "react-i18next";
const Footer = () => {
  const {t,i18n}=useTranslation()
  return (
    <footer className="bg-[#f7f7f7]  pt-10 border-t-2 border-[#e0dede7a] ">
      <div className="w-[98%] md:w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 gap-y-8 px-7">
        <section className="w-fit mx-auto">
          <div className="flex items-center justify-center">
            <img loading="lazy" src={logoImage} alt="image" className="w-[70px]" width={70} height={70} />
            <h2 className="text-3xl font-semibold mb-3 ">{t("footer.brandTitle")}</h2>
          </div>
          <p className="text-[17px] text-center">{t("footer.brandDescription")}</p>
        </section>
        <section className=" ">
          <h2 className="text-xl font-medium mb-5 text-center">{t("footer.quickLinksTitle")}</h2>
          <div className="w-fit mx-auto">
            <Link to={"/home"} className="block text-[17px] mb-2 hover:translate-x-2 transition-all duration-300">{t("footer.home")}</Link>
            <Link to={"/contactUs"} className="block text-[17px] mb-2 hover:translate-x-2 transition-all duration-300">{t("footer.contact")}</Link>
            <Link to={"/term"} className="block text-[17px] mb-2 hover:translate-x-2 transition-all duration-300">{t("footer.term")}</Link>
          </div>
        </section>
        <section className="text-center ">
          <h2 className="text-xl font-medium mb-5">{t("footer.socialTitle")}</h2>
          <div className="flex gap-2 text-center justify-center">
            <a href="#" title="facebook"><FaFacebook className="text-2xl text-[#e77008] hover:text-[#02717e] hover:scale-105 transition-all duration-300"/></a>
            <a href="#" title="instagram"><FaInstagram className="text-2xl text-[#e77008] hover:text-[#02717e] hover:scale-105 transition-all duration-300"/></a>
            <a href="#" title="whatsApp"><FaWhatsapp className="text-2xl text-[#e77008] hover:text-[#02717e] hover:scale-105 transition-all duration-300"/></a>
          </div>
        </section>
        <section className={`text-center ${i18n.language === "en"?"md:text-left":"md:text-right"} `}>
          <h2 className="text-xl font-medium mb-5">{t("footer.newsletterTitle")}</h2>
          <p className="mb-3 text-[17px]">{t("footer.newsletterDescription")}</p>
          <div className="flex border-[1px] border-gray-400 bg-white rounded-xl overflow-hidden">
            <input type="text" placeholder={t("footer.placeholder")} className="outline-0 border-0 w-[65%] px-2"/>
            <button className="bg-[#e77008] p-3 text-white min-w-[35%] hover:bg-[#02717e] cursor-pointer transition-all duration-300">{t("footer.subscribe")}</button>
          </div>
        </section>
      </div>
      <div className="bg-white p-3 text-center text-[17px] mt-10"> &copy; 2025 <span className="text-lg  font-semibold text-[#e77008]">Khalid Amin,</span> All Rights Reserved</div>
    </footer>
  )
}

export default Footer