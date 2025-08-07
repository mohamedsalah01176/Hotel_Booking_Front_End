// import { useContext } from "react"
// import { GeneralContext } from "../../util/GeneralContext"
import { NavLink, useLocation } from "react-router"

const DashboardLinks = () => {
    // const {currentSection,setCurrentSection}=useContext(GeneralContext)
    const {pathname}=useLocation()
  return (
    <div  className="flex items-center justify-center gap-2 sm:gap-7 cursor-pointer sm:w-[350px] ">
      <NavLink to="addListing"  className="flex items-center gap-1 relative min-w-fit overflow-hidden group py-1">
        <h2 className="font-medium text-[12px] sm:text-[17px]">Add Listing</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${pathname.includes("addListing") ?"left-0":"-left-44"} group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
      <NavLink to="listings" className="flex  items-center gap-1 relative min-w-fit overflow-hidden group cursor-pointer py-1">
        <h2 className="font-medium text-[12px] sm:text-[17px]">Listings</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute -bottom-0  ${pathname.includes("listings") ?"left-0":"-left-44"}  group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
      <NavLink to="customers"  className="flex  items-center  gap-1 relative min-w-fit overflow-hidden group cursor-pointer py-1 ">
        <h2 className="font-medium text-[12px] sm:text-[17px]">Customers</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${pathname.includes("customers") ?"left-0":"-left-44"}  group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
      <NavLink to="calender"  className="flex  items-center  gap-1 relative min-w-fit overflow-hidden group cursor-pointer py-1 ">
        <h2 className="font-medium text-[12px] sm:text-[17px]">Calendar</h2>
        <div className={`h-[3px] w-full bg-gray-700 absolute bottom-0 ${pathname.includes("calender") ?"left-0":"-left-44"}  group-hover:left-0 transition-all duration-300`}></div>
      </NavLink>
    </div> 
  )
}

export default DashboardLinks