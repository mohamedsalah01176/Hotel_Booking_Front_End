import image from "../../assets/regiter.webp"
import {useFormik} from "formik"
import * as yup from "yup"
import CodeNumber from "../../component/CodeNumber"
import { useState } from "react"
import  axios  from "axios"
// import Spinner from "../../component/spinner"
import { ToastContainer, toast } from 'react-toastify';



const Register = () => {
  const [openCode,setOpenCode]=useState(false);
  
  const formik=useFormik({
    initialValues:{
      name:"",
      phone:"",
      email:"",
      password:"",
      role:"user"
    },
    validationSchema:yup.object({
      name:yup.string().required("Name is Required").min(2,"The Name must contain two Characters or more"),
      phone:yup.string().required("Phone is Required").matches(/^\+?[1-9]\d{6,14}$/, "Invalid phone number"),
      email:yup.string().email("The Email Not Valid").required("Email is Required"),
      password:yup.string().required("Phone is Required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must be at least 8 characters and include uppercase, lowercase, and a number"),
      role: yup.string().oneOf(["user", "admin"]).required(),
    }),
    onSubmit:async(values)=>{
      console.log(values);
      
      try{
        const registerRes=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/register`,
            values,
            {
            headers:{
              'Content-Type':'application/json',
            }
          }
        )
        console.log(registerRes);
        if(registerRes.data.status === "success"){
          const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/sendCode`,
          {phone:values.phone},
          {
            headers:{
              'Content-Type':'application/json',
            }
          }
        )
        console.log(res,"lllllll");
        if(res.data.status === 'success'){
          toast.success("Code sent successfully ✅");
          setTimeout(()=>{
            setOpenCode(true);
          },2000)
        }
        }
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch(errors:any){
        toast.error(errors.response.data.message)
        console.log(errors,"errors")
      }
    }
  })
console.log(import.meta.env.VITE_BASE_URL)

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row justify-center items-center gap-14 px-10">
      <ToastContainer />
      {openCode && <CodeNumber setOpenCode={setOpenCode} phone={formik.values.phone} /> }
      <form onSubmit={formik.handleSubmit} className="w-[300px] md:w-[400px] mt-[120px] md:mt-0" >
        <h1 className="text-4xl font-semibold text-center mb-5 ">Register</h1>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal ${formik.touched.name && formik.errors.name && "text-red-600"}`} htmlFor="name">Full Name</label>
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} name="name"  className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.name && formik.errors.name ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="name" type="text" placeholder="Please Enter Your Name" />
          {(formik.touched.name || formik.submitCount > 0) && formik.errors.name &&
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal ${formik.touched.phone && formik.errors.phone && "text-red-600"}`} htmlFor="phone">Phone</label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="phone"  className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.phone && formik.errors.phone ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="phone" type="text" placeholder="+20********" />
          {formik.touched.phone && formik.errors.phone &&
            <p className="text-red-500 text-sm">{formik.errors.phone}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal ${formik.touched.email && formik.errors.email && "text-red-600"}`} htmlFor="email">Emial</label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email"  className={`w-full outline-none bg-white border-[3px] ${formik.touched.email && formik.errors.email ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  rounded-2xl p-2 ${formik.touched.email && formik.errors.email ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="email" type="text" placeholder="Please Enter Your Email" />
          {formik.touched.email && formik.errors.email &&
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className={`text-lg font-normal ${formik.touched.password && formik.errors.password && "text-red-600"}`} htmlFor="password">Password</label>
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" className={`w-full outline-none bg-white border-[3px] border-gray-700 rounded-2xl p-2 ${formik.touched.password && formik.errors.password ?"border-red-600 placeholder:text-red-600":"border-gray-700"}  focus:scale-105 transition-all duration-300 hover:scale-105`} id="password" type="password" placeholder="************" />
          {formik.touched.password && formik.errors.password &&
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
          }
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <label className="text-lg font-normal" htmlFor="role">Role</label>
          <div className="flex justify-center items-center gap-10">
            <label title="user" className="flex items-center gap-2 text-xl font-medium">
              <input checked={formik.values.role === 'user'} onChange={formik.handleChange} name="role" value={'user'} type="radio"  title="user" />
              User
            </label>
            <label title="admin" className="flex items-center gap-2 text-xl font-medium">
              <input checked={formik.values.role === 'admin'} onChange={formik.handleChange} name="role" value={'admin'} type="radio" title="admin" />
              Admin
            </label>
          </div>
        </div>
        <button type="submit" className="flex justify-center items-center gap-3 bg-gray-800 text-white w-[90%] mx-auto mt-5 p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300">
          {/* {formik.isSubmitting &&
          <Spinner/>
          } */}
          
          Submit
        </button>
        {/* <input type="submit" value={'Submit'} className=" block bg-gray-800 text-white w-[90%] mx-auto mt-5 p-2 rounded-2xl text-lg cursor-pointer hover:bg-gray-950 transition-all duration-300"/> */}
      </form>
      <img loading="lazy" src={image} alt="register" width="550" height="600" className="rounded-xl hidden md:block mt-10"/>
    </div>
  )
}

export default Register
