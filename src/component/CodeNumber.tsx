import axios from "axios";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';


const CodeNumber = ({setOpenCode,phone}:{setOpenCode:(d:boolean)=>void,phone:string}) => {
  const [codeValue,setCodeValue]=useState("");
  const [errorMessage,setrrorMessage]=useState("");
  const router=useNavigate();
  const verfiyCode=async()=>{
    try{
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/verfyCode`,
        {code:codeValue,phone},
        {
          headers:{
            'Content-Type':'application/json',
          }
        }
      );
      console.log(res)
      if(res.data.status === "success"){
        toast.success("Welcome to Our Site")
        setTimeout(()=>{
          router("/home")
        },1500)
      }else{
        toast.error("Please make sure you input the right mobile number and code.jj")
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(errors:any){
      console.log(errors,"eeeeeeeeeeee");
      setrrorMessage(errors.response.data.message)
    }
  }
  return (
    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-full w-full bg-gray-800/20 flex justify-center items-center animate-fade-in">
      <ToastContainer/>
      <div className="relative bg-white py-5 rounded-xl w-[300px] sm:w-[500px] min-h-[260px] ">
        <div onClick={()=>setOpenCode(false)} className="border-b border-gray-800 px-4 pb-2">
          <FaArrowLeftLong  className=" cursor-pointer hover:text-red-700  hover:-translate-x-2 transition-all duration-300 text-2xl "/>
        </div>
        <div className="px-4 pt-4">
          <p className="mb-4 text-[18px]">Enter the code we sent over SMS to {phone}:</p>
          <input type="text" onChange={(e)=>{setCodeValue(e.target.value);setrrorMessage("")}} placeholder="--- ---" style={{ letterSpacing: '0.65em' }}  className="border-[1px] tracking-widest border-gray-800 px-4 py-3 rounded-xl  w-[150px] "/>
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </div>
        <div className="flex justify-between items-center h-[75px] border-t px-5 border-gray-300 mt-5">
          <button className="underline font-semibold cursor-pointer">Choose a different option</button>
          <button onClick={()=>verfiyCode()} className="px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition-all duration-300 cursor-pointer">Continue</button>
        </div>
      </div>
    </div>
  )
}

export default CodeNumber