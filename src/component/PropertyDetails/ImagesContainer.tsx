import image from "../../assets/R (1).jpg"



const ImagesContainer = () => {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-start my-5">
          <div className="md:w-1/2 h-[350px] md:h-[450px] mb-2  relative overflow-hidden group mr-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-2xl md:rounded-tr-none md:rounded-br-none">
            <img loading="lazy" src={image} alt="image" className=" w-full h-full mr-2 group-hover:translate-x-0 " />
            <div className="absolute top-0 left-0 w-full h-full bg-gray-700/15 -translate-x-[100%] group-hover:translate-x-0 transition-all duration-500"></div>
          </div>
          <div className=" md:w-1/2 h-[443px] flex">
            <div className=" w-1/2 h-full mr-2">
              <div className=" relative overflow-hidden group h-1/2 rounded-tl-2xl md:rounded-tl-none">
                <img loading="lazy" src={image} alt="image" className=" w-full h-full  group-hover:translate-x-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700/15 -translate-x-[100%] group-hover:translate-x-0 transition-all duration-500"></div>
              </div>
              <div className=" relative overflow-hidden group h-1/2 mt-2 rounded-bl-2xl md:rounded-bl-none">
                <img loading="lazy" src={image} alt="image" className=" w-full h-full  group-hover:translate-x-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700/15 -translate-x-[100%] group-hover:translate-x-0 transition-all duration-500"></div>
              </div>
            </div>
            <div className=" w-1/2 h-full ">
              <div className=" relative overflow-hidden group h-1/2 rounded-tr-2xl">
                <img loading="lazy" src={image} alt="image" className=" w-full h-full group-hover:translate-x-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700/15 -translate-x-[100%] group-hover:translate-x-0 transition-all duration-500"></div>
              </div>
              <div className=" relative overflow-hidden group h-1/2 mt-2 rounded-br-2xl">
                <img loading="lazy" src={image} alt="image" className=" w-full h-full group-hover:translate-x-0" />
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700/15 -translate-x-[100%] group-hover:translate-x-0 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ImagesContainer