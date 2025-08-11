import type { JSX } from "react";

const ServiceContainer = ({title,icon,service,setService}:{title:string,icon:JSX.Element,service:string[],setService:(val:string[])=>void}) => {
  const handleAddservice=()=>{
    if(service.includes(title)){
      const updaed=service.filter(item=>item !== title)
      setService(updaed)
    }else{
      setService([...service,title])
    }
  }
  
  console.log(service);
  return (
    <div onClick={()=>handleAddservice()} className={`border-[1.5px]   rounded-lg w-[150px] md:w-[210px] h-[110px] py-2 px-5 hover:bg-gray-100 hover:border-black ${service.includes(title)?"border-black bg-gray-100":"border-gray-300"} transition-all duration-300 cursor-pointer`}>
      {icon}
      <h4 className="text-lg leading-5">{title}</h4>
    </div>
  )
}

export default ServiceContainer