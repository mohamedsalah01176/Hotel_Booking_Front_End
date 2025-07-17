import SearchBar from "./SearchBar";
import NavbarItem from "./NavbarItem";
import SearchBarMobile from "./SearchBarMobile";
import { Globe, Menu } from "lucide-react";
import Logo from "../../assets/Airbnb_Logo.png";
import logo from "../../assets/airbnb-logo.png";
import homeIcon from "../../assets/Home.png";
import experienceIcon from "../../assets/experiences.png";
import serviceIcon from "../../assets/services.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className="border-b-1 border-gray-300 sticky top-0 z-50  p-0 md:p-2 pb-0 md:pb-8 bg-[#fbfbfb] ">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-4 py-3">
        <div className="text-sm font-semibold hidden lg:block">
          <img
            src={Logo}
            alt="Airbnb logo"
            className="h-5 md:h-8 object-contain"
          />
        </div>

        <div className="text-sm font-semibold  hidden md:flex  lg:hidden">
          <img
            src={logo}
            alt="Airbnb logo"
            className="h-5 md:h-8 object-contain"
          />
        </div>

        <div className="block md:hidden px-6 py-2 w-full mb-4">
          <SearchBarMobile />
        </div>

        <div className="flex  gap-15 md:gap-10 text-sm font-medium">
          <NavbarItem label={t("navbar.homes")} icon={homeIcon} active />
          <NavbarItem
            label={t("navbar.experiences")}
            icon={experienceIcon}
            badge
          />
          <NavbarItem label={t("navbar.services")} icon={serviceIcon} badge />
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label={t("navbar.menu")}
            className="hidden md:flex bg-gray-100 p-2 rounded-full cursor-pointer"
          >
            <Menu size={20} />
          </button>

          <button
            aria-label={t("navbar.language_toggle")}
            className="hidden md:flex bg-gray-100 p-2 rounded-full cursor-pointer"
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
          >
            <Globe size={20} />
          </button>

          <button title="btn" className="hidden md:flex bg-gray-100 p-2 rounded-full cursor-pointer">
            <Menu size={20} />
          </button>
        </div>
      </div>

      <div className="hidden md:block px-6 py-2">
        <SearchBar />
      </div>
    </header>
  );
};

export default Navbar;
