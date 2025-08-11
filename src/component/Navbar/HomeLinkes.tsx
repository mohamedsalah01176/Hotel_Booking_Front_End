import type { TFunction } from "i18next"
import homeImage from "../../assets/Home.webp"
import departmentImage from "../../assets/experiences.webp"
import { useContext } from "react"
import { GeneralContext } from "../../util/GeneralContext"

const HomeLinkes = ({t}:{t:TFunction}) => {
    const {currentSection,setCurrentSection}=useContext(GeneralContext)
  return (
    <div  className="flex items-center justify-center  gap-2 sm:gap-7 cursor-pointer sm:w-[350px] ">
      <div onClick={()=>setCurrentSection("home")} className="flex items-center gap-1 relative overflow-hidden group">
        <img loading="lazy" src={homeImage} alt="Homes" width={35} height={35} className="group-hover:scale-110 pb-2  transition-all duration-300"/>
        <h2 className="font-medium text-[12px] sm:text-[17px]">{t('navbar.homes')}</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${currentSection === "home" ?"left-0":"-left-32"}  group-hover:left-0 transition-all duration-300`}></div>
      </div>
      <div onClick={()=>setCurrentSection("partment")} className="flex  items-center gap-1 relative overflow-hidden group cursor-pointer ">
        <img loading="lazy" src={departmentImage} alt="Homes" width={35} height={35} className="group-hover:scale-110 pb-2 h transition-all duration-300" />
        <h2 className="font-medium text-[12px] sm:text-[17px]">{t("navbar.departments")}</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${currentSection === "department" ?"left-0":"-left-44"} group-hover:left-0 transition-all duration-300`}></div>
      </div>
    </div> 
  )
}

export default HomeLinkes