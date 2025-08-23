import { type JSX } from "react";

const ServiceContainer = ({title,icon,service,handleAddservice}:{title:string,icon:JSX.Element,service:string[],handleAddservice:(val:string)=>void}) => {
  
  console.log(service);
  return (
    <div  onClick={()=>handleAddservice(title)} className={`border-[1.5px]   rounded-lg w-[150px] md:w-[210px] h-[110px] py-2 px-5 hover:bg-gray-100 hover:border-black ${service.includes(title)?"border-black bg-gray-100":"border-gray-300"} transition-all duration-300 cursor-pointer`}>
      {icon}
      <h4 className="text-lg leading-5">{title}</h4>
    </div>
  )
}

export default ServiceContainer