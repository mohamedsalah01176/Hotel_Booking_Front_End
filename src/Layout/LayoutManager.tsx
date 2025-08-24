import { Outlet } from "react-router"
import ManagerNavbar from "../component/Navbar/ManagerNavbar"

const LayoutManager = () => {
  return (
    <>
    <ManagerNavbar/>
    <Outlet/>
    </>
  )
}

export default LayoutManager