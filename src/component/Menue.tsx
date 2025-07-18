// import { FaBars } from "react-icons/fa6";
import { Link, useLocation } from "react-router";



const Menue = ({i18n,setOpentMenue,token}:{i18n:{language:string},setOpentMenue:(v:boolean)=>void,token:string}) => {
  const url =useLocation();
  console.log(url.pathname,"hhhhhhh")
  return (
    <div className={`bg-white min-h-[10px] w-[150px] absolute py-2 top-14 ${i18n.language === "en"?"right-0 md:-right-7":"left-0 md:-left-7"}  rounded-xl`}>
      <div className={`border-[15px] w-[20px] border-t-transparent border-l-transparent border-r-transparent border-b-white absolute -top-7  ${i18n.language === "en" ?"left-[120px] md:left-[85px]":"right-[120px] md:right-[85px]"} `}></div>
      {url.pathname !== "/home" &&
        <Link onClick={()=>setOpentMenue(false)} to={"/home"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className="text-black font-medium">Home</p>
        </Link>
      }
      <Link onClick={()=>setOpentMenue(false)} to={"/"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
        {/* <FaBars className="text-black "/> */}
        <p className="text-black font-medium">Contact Us/FAQ</p>
      </Link>
      {url.pathname !== "/login" && url.pathname !== "/register" && token &&
        <Link onClick={()=>setOpentMenue(false)} to={"/"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className="text-black font-medium">Setting</p>
        </Link>
      }
      <Link onClick={()=>setOpentMenue(false)} to={"/"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
        {/* <FaBars className="text-black "/> */}
        <p className="text-black font-medium">Term&Privacy</p>
      </Link>
      {token &&
        <Link onClick={()=>setOpentMenue(false)} to={"/login"} className={`flex justify-center gap-2 items-center p-2.5  rounded-xl hover:bg-gray-200 transition-all duration-300`}>
          {/* <FaBars className="text-black "/> */}
          <p className=" font-medium text-red-700">Logout</p>
        </Link>
      }
    </div>
  )
}

export default Menue