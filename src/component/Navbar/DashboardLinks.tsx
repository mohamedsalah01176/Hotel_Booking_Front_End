// import { useContext } from "react"
// import { GeneralContext } from "../../util/GeneralContext"
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router"

const DashboardLinks = () => {
  const { t } = useTranslation();
  const {pathname}=useLocation();

  return (
    <div  className="flex items-center justify-center gap-2 sm:gap-7 cursor-pointer sm:w-[350px] ">
      <NavLink to="/dashboard"  className="flex  items-center  gap-1 relative min-w-fit overflow-hidden group cursor-pointer py-1 ">
        <h2 className="font-medium text-[12px] sm:text-[17px]">{t("navbar.dashboardLinks.hostReferral")}</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${pathname.includes("customers") ?"left-0":"-left-44"}  group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
      <NavLink to="addListing"  className="flex items-center gap-1 relative min-w-fit overflow-hidden group py-1">
        <h2 className="font-medium text-[12px] sm:text-[17px]">{t("navbar.dashboardLinks.addListing")}</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${pathname.includes("addListing") ?"left-0":"-left-44"} group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
      <NavLink to="listings" className="flex  items-center gap-1 relative min-w-fit overflow-hidden group cursor-pointer py-1">
        <h2 className="font-medium text-[12px] sm:text-[17px]">{t("navbar.dashboardLinks.listings")}</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute -bottom-0  ${pathname.includes("listings") ?"left-0":"-left-44"}  group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
    </div> 
  )
}

export default DashboardLinks