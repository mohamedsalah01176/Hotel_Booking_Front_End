import { IoMdCheckmark } from "react-icons/io";
import image from "../../../assets/defaultUser.png";
import type { JwtPayload } from "../../../interface/user";
import { MdClose } from "react-icons/md";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
const UsersForMobile = ({users,searchUsers,deleteUser}:{users:JwtPayload[],searchUsers:JwtPayload[],deleteUser:(val:string)=>void}) => {
  const {t}=useTranslation();
  const timeAgo =useCallback((dateString: string) => {
      const createdAt = new Date(dateString).getTime();
      const diff = Date.now() - createdAt;
  
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(diff / 1000 / 60);
      const hours = Math.floor(diff / 1000 / 60 / 60);
      const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  
      if (seconds < 60) return `${seconds} ${t("users.usersTable.sec")}`;
      if (minutes < 60) return `${minutes} ${t("users.usersTable.min")}`;
      if (hours < 24) return `${hours} ${t("users.usersTable.hr")}`;
      return `${days}  ${t("users.usersTable.day")}`;
      },[]);
  return (
    <div className="mt-10 md:hidden flex flex-wrap justify-center items-center">
      {searchUsers?.length>0?
        searchUsers.map((item)=>{
          return(
            <div key={item._id} className="flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 mt-7">
              <div className="relative">
                <div className="w-full relative" >
                  <img loading="lazy" src={item.image || image} alt="image" className="w-[140px] h-[110px] inline-block rounded-xl mb-2" />
                  {item?.phoneVerfy?
                  <IoMdCheckmark className="text-lg bg-green-500  w-[20px] h-[20px] text-white rounded-xl absolute bottom-3 right-0"/>
                  :
                  <MdClose className="text-lg bg-red-500  w-[20px] h-[20px] text-white rounded-xl absolute bottom-3 right-0"/>
                  }
                </div>
                  {item.role === "host"  ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full block w-fit mx-auto">
                      {t("users.usersTable.host")}
                    </span>
                    )  :item.role === "user"? (
                      <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full block w-fit mx-auto">
                        {t("users.usersTable.user")}
                      </span>
                    ):(
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                        {t("users.usersTable.manager")}
                      </span>
                    )
                  }
              </div>
              <div className="min-w-[220px]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-700">{timeAgo(item.createdAt)}</p>
                </div>
                <p className="text-gray-600 text-sm">{item.phone}</p>
                <p className="text-gray-600 text-[13px]">{item.email}</p>
                <div> 
                  <button onClick={()=>deleteUser(item._id as string)} className="bg-red-700 text-white px-5 py-2 mt-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300 w-full">{t("users.usersTable.delete")}</button>
                </div>
              </div>
            </div>
          )
        })
      :
        users.map((item)=>{
          return(
            <div key={item._id} className="flex items-center gap-3 mb-6 hover:bg-[#e8e7e730] transition-all duration-300 mt-7">
              <div className="relative">
                <div className="w-full relative" >
                  <img loading="lazy" src={item.image || image} alt="image" className="w-[140px] h-[110px] inline-block rounded-xl mb-2" />
                  {item?.phoneVerfy?
                  <IoMdCheckmark className="text-lg bg-green-500  w-[20px] h-[20px] text-white rounded-xl absolute bottom-3 right-0"/>
                  :
                  <MdClose className="text-lg bg-red-500  w-[20px] h-[20px] text-white rounded-xl absolute bottom-3 right-0"/>
                  }
                </div>
                  {item.role === "host"  ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full block w-fit mx-auto">
                      {t("users.usersTable.host")}
                    </span>
                    )  :item.role === "user"? (
                      <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full block w-fit mx-auto">
                        {t("users.usersTable.user")}
                      </span>
                    ):(
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                        {t("users.usersTable.manager")}
                      </span>
                    )
                  }
              </div>
              <div className="min-w-[220px]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-700">{timeAgo(item.createdAt)}</p>
                </div>
                <p className="text-gray-600 text-sm">{item.phone}</p>
                <p className="text-gray-600 text-[13px]">{item.email}</p>
                <div> 
                  <button onClick={()=>deleteUser(item._id as string)} className="bg-red-700 text-white px-5 py-2 mt-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300 w-full">{t("users.usersTable.delete")}</button>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UsersForMobile