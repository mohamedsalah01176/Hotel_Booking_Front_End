import Navbar from "../component/Navbar/Navbar.tsx"; 
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main > 
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
