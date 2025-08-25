import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useCallback, useContext, useState } from "react"
import { TokenContext } from "../../util/TokenContext"
import UsersForLargeScreen from "../../component/ManagerDashboard/Users/UsersForLargeScreen"
import { toast } from "react-toastify"
import UsersForMobile from "../../component/ManagerDashboard/Users/UsersForMobile"
import Spinner from "../../component/Loaders/Spinner"
import { IoSearch } from "react-icons/io5"
import type { JwtPayload } from "../../interface/user"
import { useTranslation } from "react-i18next"

const Users = () => {
  const {token}=useContext(TokenContext);
  const {t}=useTranslation()
  const [changeLoading,setChangeLoading]=useState(false);
  const queryClient=useQueryClient();
  const [searchUsers,setSearchUsers]=useState<JwtPayload[]>([]);
  const getUsers=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/users`,{headers:{"Authorization":`Bearer ${token}`}})
  }
  const {data,isLoading}=useQuery({
    queryKey:["users","id"],
    queryFn:getUsers,
    staleTime:150000
  })
  const users=data?.data.users;
  console.log(users)

  const deleteUser=useCallback(async(userId:string)=>{
    setChangeLoading(true)
    try{
      const res=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/users/${userId}`,{headers:{"Authorization":`Bearer ${token}`}});
      console.log(res)
      if(res.data.status === "success"){
        setChangeLoading(false);
        await queryClient.invalidateQueries({queryKey:["users","id"], refetchType: "active" })
        toast.success(t("users.toastDelete"))
      }
    }catch(errors){
      console.log(errors)
    }
  },[token,queryClient])


  const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const searchText=e.target.value;
    const filteredProperty=users.filter((item:JwtPayload)=>item.name?.toLowerCase().includes(searchText.toLowerCase())) as JwtPayload[];
    if(!searchText){
      setSearchUsers(users)
    }else if(filteredProperty.length<0){
      setSearchUsers(filteredProperty)
    }
  }


  if(isLoading){
    return  <div className="min-h-[80vh] flex items-center justify-center">
      <Spinner/>
    </div>
  }
  return (
    <div className="min-h-[80vh] w-full px-4 md:px-0 md:w-[95%] lg:w-[90%] mx-auto py-10">
      { changeLoading && <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black/10">
        <Spinner/>
      </div> }
      <div className="flex flex-col gap-y-5 md:flex-row justify-between w-full">
        <h1 className="text-4xl font-semibold">{t("users.title")}</h1>
        <div className="flex justify-end items-center">
          <div className="h-[50px] px-4 rounded-full bg-[#dfdede4a] text-center p-2 cursor-pointer mr-3 flex items-center">
            <input type="text" onChange={handleSearch} placeholder={t("users.search", { count: users.length })}  className="outline-0" />
            <IoSearch className="text-2xl"/>
          </div>
        </div>
      </div>
      <UsersForLargeScreen users={users} searchUsers={searchUsers} deleteUser={deleteUser}/>
      <UsersForMobile users={users} searchUsers={searchUsers} deleteUser={deleteUser}/>
    </div>
  )
}

export default Users