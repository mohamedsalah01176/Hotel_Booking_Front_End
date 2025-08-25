import { useCallback } from "react";
import image from "../../../assets/defaultUser.png"
import { useTranslation } from "react-i18next";
import type { JwtPayload } from "../../../interface/user";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";

const UsersForLargeScreen = ({users,searchUsers,deleteUser}:{users:JwtPayload[],searchUsers:JwtPayload[],deleteUser:(val:string)=>void}) => {
  const {t}=useTranslation()
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
    <table className="mt-10 w-full hidden md:table">
        <thead>
          <tr className="text-left">
            <th className="pl-4">{t("users.usersTable.name")}</th>
            <th>{t("users.usersTable.phone")}</th>
            <th className="min-w-[250px]">{t("users.usersTable.email")}</th>
            <th>{t("users.usersTable.created")}</th>
            <th>{t("users.usersTable.role")}</th>
            <th className="text-center">{t("users.usersTable.action")}</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan={5} className="h-4"></td></tr>
          {searchUsers.length>0?
            searchUsers?.map((item)=>{
              return(
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 pl-4 rounded-xl max-w-[290px]">
                  <div className="inline-block relative ">
                    <img loading="lazy" src={item.image || image} alt="image" className=" w-[50px] h-[50px] inline-block rounded-full" />
                    {item?.phoneVerfy?
                    <IoMdCheckmark className="text-lg bg-green-500  w-[15px] h-[15px] text-white rounded-full absolute bottom-1 right-1"/>
                    :
                    <MdClose className="text-lg bg-red-500  w-[15px] h-[15px] text-white rounded-full absolute bottom-1 right-1"/>
                    }
                  </div>
                  <p className="inline-block ml-3 text-lg font-medium">{item.name}</p>
                </td>
                <td className="pr-2">
                  <p>{item.phone}</p>
                  
                </td>
                <td className="max-w-[200px]">{item.email}</td> 
                <td>{timeAgo(item.createdAt)}</td>
                <td className="rounded-xl">
                  {item.role === "host"  ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      {t("users.usersTable.host")}
                    </span>
                    )  :item.role === "user"? (
                      <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                        {t("users.usersTable.user")}
                      </span>
                    ):(
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                        {t("users.usersTable.manager")}
                      </span>
                    )
                  }
                </td>
                <td className="pr-2 text-center">
                  <button onClick={()=>deleteUser(item._id as string)} className="bg-red-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300">{t("users.usersTable.delete")}</button>
                </td>
              </tr>
              )}
            )
          :
            users?.map((item)=>{
              return(
              <tr key={item._id} className="hover:bg-[#e8e7e730] transition-all duration-300 mt-10  border-b border-gray-200">
                <td className="pt-5 pb-2 pl-4 rounded-xl max-w-[290px]">
                  <div className="inline-block relative ">
                    <img loading="lazy" src={item.image || image} alt="image" className=" w-[50px] h-[50px] inline-block rounded-full" />
                    {item?.phoneVerfy?
                    <IoMdCheckmark className="text-lg bg-green-500  w-[15px] h-[15px] text-white rounded-full absolute bottom-1 right-1"/>
                    :
                    <MdClose className="text-lg bg-red-500  w-[15px] h-[15px] text-white rounded-full absolute bottom-1 right-1"/>
                    }
                  </div>
                  <p className="inline-block ml-3 text-lg font-medium">{item.name}</p>
                </td>
                <td className="pr-2">
                  <p>{item.phone}</p>
                  
                </td>
                <td className="max-w-[200px]">{item.email}</td> 
                <td>{timeAgo(item.createdAt)}</td>
                <td className="rounded-xl">
                  {item.role === "host"  ? (
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                      {t("users.usersTable.host")}
                    </span>
                    )  :item.role === "user"? (
                      <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
                        {t("users.usersTable.user")}
                      </span>
                    ):(
                      <span className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full">
                        {t("users.usersTable.manager")}
                      </span>
                    )
                  }
                </td>
                <td className="pr-2 text-center">
                  <button onClick={()=>deleteUser(item._id as string)} className="bg-red-700 text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-red-800 transition-all duration-300">{t("users.usersTable.delete")}</button>
                </td>
              </tr>
              )}
            )
          }
        </tbody>
      </table>
  )
}

export default UsersForLargeScreen