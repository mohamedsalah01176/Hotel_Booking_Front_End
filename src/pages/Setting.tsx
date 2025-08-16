import { FaPhoneAlt, FaRegCalendarCheck, FaUser } from "react-icons/fa";
import defaultImage from "../assets/defaultUser.png"
import { FaCameraRotate } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiMiniLockClosed } from "react-icons/hi2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { TokenContext } from "../util/TokenContext";
import Spinner from "../component/Loaders/Spinner";
import { useFormik } from "formik";
import * as yup from "yup"
import { useTranslation } from "react-i18next";
import { IoMdCheckmark } from "react-icons/io";
import { toast } from "react-toastify";
import Loader from "../component/Loaders/Loader";
import CodeNumber from "../component/CodeNumber";
import ChangeStatusCode from "../component/ChangeStatusCode";
import TableForLargeScreen from "../component/Setting/tableForLargeScreen";
import { MdClose } from "react-icons/md";
import type { IPropertyWithReserves } from "../interface/ReserveDate";
import ListingFotMobile from "../component/Setting/ListingFotMobile";
import { useNavigate } from "react-router";

type UserUpdate = Partial<{
  name: string;
  email: string;
  phone: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  image:string
}>;
const Setting = () => {
  const {t,i18n}=useTranslation();
  const {token}=useContext(TokenContext);
  const fileInputRef=useRef<HTMLInputElement | null>(null);
  const [tempImage,setTempImage]=useState('');
  const [openCode,setOpenCode]=useState<string>("");
  const queryClient=useQueryClient();
  const nav=useNavigate();



  const getUserInformation=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/setting`,{headers:{Authorization:`Bearer ${token}`}})
  }
  const {data,isLoading}=useQuery({
    queryKey:["userInformation"],
    queryFn:getUserInformation
  })
  const userInformation =data?.data?.user

  const formik=useFormik({
    enableReinitialize: true,
    initialValues:{
      name:userInformation?.name || "",
      email:userInformation?.email || "",
      phone:userInformation?.phone || "",
      image:userInformation?.image ,
      oldPassword:"",
      newPassword:undefined,
      confirmPassword:"",
    },
    validationSchema:yup.object({
      name:yup.string().required(t("setting.errors.nameRequired")).min(2,t("setting.errors.nameMin")),
      phone:yup.string().required(t("setting.errors.phoneRequired")).matches(/^\+?[1-9]\d{6,14}$/, t("setting.errors.phoneInvalid")),
      email:yup.string().email(t("setting.errors.emailInvalid")).required(t("setting.errors.emailRequired")),
      oldPassword:yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, t("setting.errors.passwordPattern")),
      newPassword:yup.string().when("oldPassword", { is: (val: string) => val && val.length > 0,
        then: schema =>
          schema
            .required(t("setting.errors.passwordRequired"))
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
              t("setting.errors.passwordPattern")
            ),
        otherwise: schema => schema.notRequired(),
      }),
      confirmPassword:yup.string().when("oldPassword", { is: (val: string) => val && val.length > 0,
        then: schema =>
          schema
            .required(t("setting.errors.passwordRequired"))
            .oneOf([yup.ref("newPassword")], t("setting.errors.passwordPattern")),
        otherwise: schema => schema.notRequired(),
      }),
    }),
    onSubmit:async(values)=>{
      console.log(values)
      try{
        const updateObject:UserUpdate={};
        for(const key in values){
          const typedKey = key as keyof typeof values;
          if ( typedKey === "confirmPassword") {
            continue;
          }
          if (values[typedKey] == undefined || values[typedKey] === "") {
            continue;
          }
          if(values[typedKey] !== userInformation[typedKey] ){
            updateObject[typedKey]=values[typedKey]
          }
        }
        const formData=new FormData();
        for(const key in updateObject){
          const typedKey = key as keyof typeof updateObject;
          const value = updateObject[typedKey] as unknown;
          if (typeof value === "object" && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, String(value));
          }
        }
        console.log(updateObject)
        if(formik.isValid){
          const response=await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/setting`,formData,{headers:{Authorization:`Bearer ${token}`}});
          console.log(response);
          if(response.data.status === "success"){
            await queryClient.invalidateQueries({queryKey:["userInformation"]});
            toast.success(i18n.language === "en"?response.data.messageEn :response.data.messageAr)
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(errors:any) {
        console.log(errors)
        toast.error(i18n.language === "en"
          ? errors?.response.data.messageEn
          : errors.response.data.messageAr
        )
      }

    }
  })



  const handleChangeImage=(e: React.ChangeEvent<HTMLInputElement>)=>{
    console.log(e.target.files?.[0]);
    console.log(e.target.files?.[0]);
    const url=URL.createObjectURL(e.target.files?.[0] as Blob)
    setTempImage(url)
    formik.setFieldValue("image",e.target.files?.[0])
  }

  const handleClick=()=>{
    fileInputRef.current?.click();
  }

  const handleSendCode=async()=>{
    const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendCode`,
      {phone:userInformation.phone},
      {
        headers:{
          'Content-Type':'application/json',
        }
      }
    )
    if(res.data.status === 'success'){
      toast.success(t("setting.messages.codeSentSuccess"));
      setTimeout(()=>{
        setOpenCode("sendCode");
      },2000)
    }
  }


    const getReserveForUser=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/reservedDates`,{headers:{"Authorization":`Bearer ${token}`}})
  }
  const query=useQuery({
    queryKey:["booking"],
    queryFn:getReserveForUser
  });
  console.log(data);
  const properties = query.data?.data?.properties
    ? query.data.data.properties.sort((a: IPropertyWithReserves, b: IPropertyWithReserves) => {
        const lastDateA = new Date(a.reserveDates[0]?.dates[a.reserveDates[0]?.dates.length - 1] || 0).getTime();
        const lastDateB = new Date(b.reserveDates[0]?.dates[b.reserveDates[0]?.dates.length - 1] || 0).getTime();

        return lastDateB - lastDateA;
      })
    : [];

      console.log(query.data)
  if(isLoading){
    return <div className="min-h-[80vh] flex items-center justify-center">
      <Spinner/>
    </div> 
  }
  return (
    <div className="min-h-[80vh]  bg-[#f7f7f7]">
      {openCode === "sendCode"?
        <CodeNumber setOpenCode={setOpenCode} phone={formik.values.phone} />:
        openCode === "changeStatus"?
        <ChangeStatusCode setOpenCode={setOpenCode} phone={formik.values.phone} />:
        null
        }
      <div className="w-[85%] mx-auto bg-white p-5 rounded-xl">
        <h1 className="text-4xl text-[#02717e] text-center font-semibold pt-4 mb-10">{t("setting.title")}</h1>
        <section className=" px-3 md:px-10">
          <div className="relative mx-auto w-fit">
            <img src={tempImage || formik.values.image || defaultImage} loading="lazy" alt="User Image" className="w-[230px] h-[230px] rounded-full border-4 border-[#02717e]" />
            <button  type="button" onClick={handleClick} title="changeImage" className="absolute -bottom-4 left-[45%] text-center w-[40px] h-[40px]  bg-[#02717e] rounded-full cursor-pointer hover:bg-[#e77008] transition-all duration-300">
              <FaCameraRotate className="  text-3xl text-white mx-auto" />
            </button>
            <input type="file" onChange={handleChangeImage} className="hidden" title="userImage" ref={fileInputRef} />
            {userInformation?.phoneVerfy?
            <IoMdCheckmark className="text-lg bg-green-500 p-1 w-[40px] h-[40px] text-white rounded-full absolute bottom-5 right-2"/>
            :
            <MdClose className="text-lg bg-red-500 p-1 w-[40px] h-[40px] text-white rounded-full absolute bottom-5 right-2"/>
            }
          </div>
          <form className="my-10" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-x-7 gap-y-0">
              <div className=" mb-4 w-full md:w-[50%]">
                <label htmlFor="name" className="text-lg font-medium block"><FaUser className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.name")}</label>
                <input id="name" type="text" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" placeholder={t("setting.name")} className="border p-3 rounded-lg  outline-0 border-[#02717e] mt-2 w-full" />
                {(formik.touched.name && formik.errors.name) && typeof formik.errors.name === "string" &&
                  <p className="text-red-500 text-sm mt-1">{formik?.errors?.name}</p>
                }
              </div>
              <div  className=" mb-4 w-full md:w-[50%]">
                <label htmlFor="email" className="text-lg font-medium block"><MdEmail className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.email")}</label>
                <input id="email" type="text" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" placeholder={t("setting.email")} className="border p-3 rounded-lg  outline-0 border-[#02717e] mt-2 w-full" />
                {(formik.touched.email && formik.errors.email) && typeof formik.errors.email === "string" &&
                  <p className="text-red-500 text-sm mt-1">{formik?.errors?.email}</p>
                }
              </div>
            </div>
              <div className=" mb-4 w-full pb-5">
                <label htmlFor="phone" className="text-lg font-medium block"><FaPhoneAlt  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.phone")}</label>
                <div className="flex gap-3 items-center  mt-2 w-full">
                  <input readOnly={userInformation.phoneVerfy} id="phone" type="text" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" placeholder={t("setting.phone")} className={`border p-3 rounded-lg w-full  outline-0 border-[#02717e] ${userInformation.phoneVerfy && "text-gray-600 cursor-not-allowed"}`} />
                  {!userInformation.phoneVerfy &&
                    <button onClick={handleSendCode} className="text-white bg-[#02717e] px-4 py-2 rounded-xl cursor-pointer hover:bg-[#e77008] transition-all duration-300">{t("setting.verify")}</button>
                  }
                </div>
                {(formik.touched.phone && formik.errors.phone) && typeof formik.errors.phone === "string" &&
                  <p className="text-red-500 text-sm mt-1">{formik?.errors?.phone}</p>
                }
              </div>

              {/* <h2 className="text-2xl font-medium text-[#02717e] text-center mb-7 mt-7">Change Password</h2> */}
              <div className="flex justify-center md:justify-between items-start flex-wrap gap-3 ">
                <div className=" mb-4 grow">
                  <label htmlFor="oldpassword" className="text-lg font-medium block"><HiMiniLockClosed   className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.oldPassword")}</label>
                  <input id="oldpassword" type="password" value={formik.values.oldPassword}   onChange={formik.handleChange} onBlur={formik.handleBlur} name="oldPassword" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                  {(formik.touched.oldPassword && formik.errors.oldPassword) && typeof formik.errors.oldPassword === "string" &&
                    <p className="text-red-500 text-sm mt-1 w-[300px]  md:w-[250px]  ">{formik?.errors?.oldPassword}</p>
                  }
                </div>
                <div className=" mb-4 grow">
                  <label htmlFor="newpassword" className="text-lg font-medium block"><HiMiniLockClosed  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.newPassword")}</label>
                  <input id="newpassword" type="password" value={formik.values.newPassword}  onChange={formik.handleChange} onBlur={formik.handleBlur} name="newPassword" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                  {(formik.touched.newPassword && formik.errors.newPassword) && typeof formik.errors.newPassword === "string" &&
                    <p className="text-red-500 text-sm mt-1 w-[300px]  md:w-[220px]  ">{formik?.errors?.newPassword}</p>
                  }
                </div>
                <div className=" mb-4 grow">
                  <label htmlFor="confirm" className="text-lg font-medium block"><HiMiniLockClosed  className="text-xl text-[#02717e] mb-1 inline-block mr-1"/>{t("setting.confirmPassword")}</label>
                  <input id="confirm" type="password" value={formik.values.confirmPassword}  onChange={formik.handleChange} onBlur={formik.handleBlur} name="confirmPassword" placeholder="**********" className="border p-3 mt-2 rounded-lg w-full  outline-0 border-[#02717e]" />
                  {(formik.touched.confirmPassword && formik.errors.confirmPassword) && typeof formik.errors.confirmPassword === "string" &&
                    <p className="text-red-500 text-sm mt-1 w-[300px]  md:w-[250px]  ">{formik?.errors?.confirmPassword}</p>
                  }
                </div>
              </div>
              <button disabled={!formik.isValid && formik.dirty} type="submit" className={`${(formik.isValid && formik.dirty)?"bg-[#02717e] hover:bg-[#e77008] transition-all duration-300 cursor-pointer":"bg-gray-500 cursor-not-allowed"}  text-white mx-auto w-[190px] px-5 py-4 rounded-xl text-lg  mt-10 flex justify-center`}>{formik.isSubmitting && <Loader/>}{t("setting.saveChanges")}</button>
          </form>
        </section>
          <section className="mb-4 w-full  border-t-2 border-[#02717e] py-7">
            <h2 className="text-3xl font-medium text-[#02717e] text-center mb-7 mt-7">{t("setting.reservations.title")}</h2>
            {properties.length>0?
            <>
              <TableForLargeScreen properties={properties} token={token}/>
              <ListingFotMobile properties={properties}/>
            </>
            :
            <div className="flex flex-col items-center justify-center text-center py-16">
              <FaRegCalendarCheck className="text-6xl text-gray-400 mb-4" />
              <h3 className="text-2xl font-medium text-gray-700">{t("setting.reservations.emptyTitle")}</h3>
              <p className="text-gray-500 mt-2">{t("setting.reservations.emptySubtitle")}</p>
              <button onClick={()=>nav("/home")} className="mt-6 cursor-pointer bg-[#02717e] text-white px-6 py-3 rounded-xl hover:bg-[#e77008] transition">
                {t("setting.reservations.explore")}
              </button>
            </div>
            }
          </section>
      </div>
    </div>
  )
}

export default Setting