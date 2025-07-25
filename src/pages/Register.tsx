import image from "../assets/regiter.webp"
import {useFormik} from "formik"
import * as yup from "yup"
import CodeNumber from "../component/CodeNumber"
import { useState } from "react"
import  axios  from "axios"
// import Spinner from "../../component/spinner"
import { toast } from 'react-toastify';
import Cookies  from "js-cookie"
import Spinner from "../component/Spinner"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import ChangeStatusCode from "../component/ChangeStatusCode"


const Register = () => {
  const [openCode,setOpenCode]=useState<string>("");
  const {t,i18n}=useTranslation()
  
  const formik=useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      role:"user"
    },
    validationSchema:yup.object({
      name:yup.string().required(t("register.errors.nameRequired")).min(2,t("register.errors.nameMin")),
      phone:yup.string().required(t("register.errors.phoneRequired")).matches(/^\+?[1-9]\d{6,14}$/, t("register.errors.phoneInvalid")),
      email:yup.string().email(t("register.errors.emailInvalid")).required(t("register.errors.emailRequired")),
      password:yup.string().required(t("register.errors.passwordRequired")).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, t("register.errors.passwordPattern")),
      role: yup.string().oneOf(["user", "admin"]).required(),
    }),
    onSubmit:async(values)=>{
      
      try{
        const registerRes=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,
            values,
            {
            headers:{
              'Content-Type':'application/json',
            }
          }
        )
        if(registerRes.data.status === "success"){
          Cookies.set("token",registerRes.data.token,{expires:60})
          const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendCode`,
            {phone:values.phone},
            {
              headers:{
                'Content-Type':'application/json',
              }
            }
          )
          if(res.data.status === 'success'){
            toast.success(t("register.messages.codeSentSuccess"));
            setTimeout(()=>{
              setOpenCode("sendCode");
            },2000)
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(errors:any){
        if(i18n.language === "en"){
          toast.error(errors.response.data.messageEn || t("login.messages.somethingWentWrong"))
        }else{
          toast.error(errors.response.data.messageAr || t("login.messages.somethingWentWrong"))
        }
      }
    }
  })

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row justify-center items-center gap-14 px-10 pb-20">
      {openCode === "sendCode"?
        <CodeNumber setOpenCode={setOpenCode} phone={formik.values.phone} />:
        openCode === "changeStatus"?
        <ChangeStatusCode setOpenCode={setOpenCode} phone={formik.values.phone} />:
        null
        }
      <form onSubmit={formik.handleSubmit} className="w-[300px] md:w-[400px] mt-[120px] md:mt-0" >
        <h1 className="text-4xl font-semibold text-center mb-5 ">{t('register.title')}</h1>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal`} htmlFor="name">{t("register.labels.fullName")}</label>
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name"  className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.name && formik.errors.name ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="name" type="text" placeholder={t("register.placeholders.fullName")} />
          {(formik.touched.name || formik.submitCount > 0) && formik.errors.name &&
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal `} htmlFor="phone">{t("register.labels.phone")}</label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone"  className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.phone && formik.errors.phone ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="phone" type="text" placeholder={t("register.placeholders.phone")} />
          {formik.touched.phone && formik.errors.phone &&
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal`} htmlFor="email">{t("register.labels.email")}</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email"  className={`w-full outline-none bg-white border-[3px] ${formik.touched.email && formik.errors.email ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  rounded-2xl p-2 ${formik.touched.email && formik.errors.email ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="email" type="text" placeholder={t("register.placeholders.email")}/>
          {formik.touched.email && formik.errors.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal `} htmlFor="password">{t("register.labels.password")}</label>
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.password && formik.errors.password ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="password" type="password" placeholder={t("register.placeholders.password")}/>
          {formik.touched.password && formik.errors.password &&
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className="text-lg font-normal" htmlFor="role">{t("register.labels.role")}</label>
          <div className="flex justify-center items-center gap-10">
            <label  title="user" className="flex items-center gap-2 text-xl cursor-pointer font-medium">
              <input checked={formik.values.role === 'user'} onChange={formik.handleChange} name="role" value={'user'} type="radio"  title="user" />
              {t("register.labels.user")}
            </label>
            <label  title="admin" className="flex items-center gap-2 text-xl cursor-pointer font-medium">
              <input checked={formik.values.role === 'admin'} onChange={formik.handleChange} name="role" value={'admin'} type="radio" title="admin" />
              {t("register.labels.admin")}
            </label>
          </div>
        </div>
        <button type="submit" className="flex justify-center items-center gap-3 bg-gray-800 text-white w-[90%] mx-auto mt-5 p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300">
          {formik.isSubmitting &&
          <Spinner/>
          }
          
          {t("register.buttons.submit")}
        </button>
        <button className="mt-3 text-gray-700">{t("register.haveAccount")}<Link to={'/login'} className="font-semibold underline text-black">{t("login.title")}</Link></button>
      </form>
      <img loading="lazy" src={image} alt="register" width="550" height="600" className="rounded-xl hidden md:block mt-10"/>
    </div>
  )
}

export default Register
