import { useTranslation } from "react-i18next";
import { NavbarItemProps } from "../../interface/NavbarItem";

const NavbarItem = ({ label, icon, active, badge }: NavbarItemProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-0 md:gap-2 relative cursor-pointer ${
        active ? "font-bold border-b-2" : ""
      }`}
    >
      {icon && <img src={icon} alt="" className="h-10 w-10 object-contain" />}
      <span>{label}</span>
      {badge && (
        <span className="bg-blue-600 text-white text-xs rounded-full px-1 ml-1 absolute bottom-12 left-12 md:bottom-8 md:left-8 shadow-md">
          {t("navbar.new")}
        </span>
      )}
    </div>
  );
};

export default NavbarItem;
