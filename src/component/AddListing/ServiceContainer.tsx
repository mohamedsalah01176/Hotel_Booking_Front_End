import type { JSX } from "react";

const ServiceContainer = ({title,icon}:{title:string,icon:JSX.Element}) => {
  return (
    <div className='border-[1.5px]  border-gray-300 rounded-lg w-[150px] md:w-[210px] h-[110px] py-2 px-5 hover:bg-gray-100 hover:border-black transition-all duration-300 cursor-pointer'>
      {icon}
      <h4 className="text-lg leading-5">{title}</h4>
    </div>
  )
}

export default ServiceContainer