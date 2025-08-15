import { useQuery } from "@tanstack/react-query"
import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../util/TokenContext"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { useFormik } from "formik"
import { jwtDecode } from "jwt-decode"
import type { JwtPayload } from "../interface/user"
import * as yup from "yup"
import type { IQuestions } from "../interface/questions"
import { toast } from "react-toastify"





const validationSchema=yup.object({
  name:yup.string().min(3, "Name must be at least 3 characters").max(50, "Name must be less than 50 characters").required("Name is required"),
  email:yup.string().email("Invalid email address").required("Email is required"),
  phone:yup.string().matches(/^\+?[1-9]\d{6,14}$/, "Enter a valid phone number").required("Phone is required"),
  message:yup.string().min(10, "Message must be at least 10 characters").max(500, "Message must be less than 500 characters").required("Message is required"),
})
const ContactUs = () => {
  const [userDecode,setUserDecode]=useState<JwtPayload>();
  const {token}=useContext(TokenContext);
  const {i18n}=useTranslation()
  const getAllQuestions=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions`,{headers:{"Authorization":`Bearer ${token}`}});
  }
  const {data}=useQuery({
    queryKey:["getAllQuestions"],
    queryFn:getAllQuestions
  })
  const questions=data?.data.questions
  
  
  useEffect(()=>{
    if(token){
      const user=jwtDecode(token!);
      setUserDecode(user as JwtPayload);
    } 
  },[token])
  console.log(userDecode)
  const formik=useFormik({
    enableReinitialize:true,
    initialValues:{
      name:userDecode?.name || "",
      email:userDecode?.email || "",
      phone:userDecode?.phone || "",
      message:""
    },
    validationSchema,
    onSubmit:async(values)=>{
      try{
        console.log(values);
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendQuestion`,values,{headers:{"Authorization":`Bearer ${token}`}});
        console.log(response);
        if(response.data.status === "success"){
          toast.success("Message sent successfully!")
        }
      }catch(errors){
        console.log(errors);
        toast.error("Something went wrong. Please try again.");
      }
    }
  })
  return (
    <div className=" bg-[#f7f7f7] py-10 ">
      <div className=" w-[90%] mx-auto ">
        <div className="flex flex-col md:flex-row justify-center items-center min-h-[60vh] gap-7">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Let<sup>,</sup>s Collabarate</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero earum nam pariatur enim, fugiat est nobis saepe architecto similique animi adipisci odit obcaecati fugit, assumenda ad corporis? Veniam, totam fuga.</p>
            <h2 className="text-2xl font-semibold mt-4 mb-2">WhatsApp</h2>
            <p className="text-gray-700">+20 10 6961 5316</p>
            <h2 className="text-2xl font-semibold mt-4 mb-2">Email</h2>
            <p className="text-gray-700">Mohamed@gmail.com</p>
          </div>
          <form onSubmit={formik.handleSubmit} action="" method="get" className="w-full md:w-1/2 bg-white p-7 px-5 rounded-xl">
            <h2 className="text-3xl mb-7 font-semibold text-center">Say Your Opinion</h2>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name" type="text" placeholder="Name:" className="outline-0 text-lg px-3 py-3 my-3 placeholder:text-lg placeholder:font-medium placeholder:text-black border-b border-gray-300 w-full"  />
            {formik.touched.name && formik.errors.name && <p className="text-red-500 text-sm">{formik.errors.name}</p>}

            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" type="email" placeholder="Email:" className="outline-0 text-lg px-3 py-3 my-3 placeholder:text-lg placeholder:font-medium placeholder:text-black border-b border-gray-300 w-full"  />
            {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}

            <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone" type="text" placeholder="Phone:" className="outline-0 text-lg px-3 py-3 my-3 placeholder:text-xl placeholder:font-medium placeholder:text-black border-b border-gray-300 w-full"  />
            {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}

            <input value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} name="message" type="text" placeholder="Message:" className="outline-0 text-lg px-3 py-3 my-3 placeholder:text-xl placeholder:font-medium placeholder:text-black border-b border-gray-300 w-full"  />
            {formik.touched.message && formik.errors.message && <p className="text-red-500 text-sm">{formik.errors.message}</p>}

            <input type="submit" value={"Submit"} className="w-full py-2 bg-[#02717e] hover:bg-[#e77008] transition-all duration-300 text-white cursor-pointer rounded-xl mt-7" />
          </form>
        </div>
        <div className="min-h-[10vh] my-14">
          <h2 className="text-4xl text-center font-semibold mb-10">Frequently Assked Questions</h2>
          {questions.length>0?
          questions.map((item:IQuestions,index:number)=>
            <div className="mt-10" key={index}>
              <h3 className={`text-xl font-medium ${i18n.language === "en"?"border-l-4 pl-4":"border-r-4 pr-4"}  border-[#02717e]  py-4 bg-[#e7e7e769]`}><span className="text-4xl text-[#02717e] font-semibold pr-2">Q.</span>{i18n.language === "en"?item.questionEn:item.questionAr}</h3>
              <p className={`  ${i18n.language === "en"?"border-l-4 pl-4":"border-r-4 pr-4"} border-gray-500 py-4 mt-2 text-gray-700`}> <span className="text-4xl font-semibold pr-2">A.</span>{i18n.language === "en"?item.answerEn:item.answerAr}</p>
            </div>
          )
          :
          <p className="text-center text-gray-500">
            No questions available.
          </p>
          }
        </div>
      </div>
    </div>
  )
}

export default ContactUs