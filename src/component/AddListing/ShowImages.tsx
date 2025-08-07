import { FaTrash } from 'react-icons/fa'

const ShowImages = ({images,setOpenImages,deleteImage}:{images:File[] | string [],setOpenImages:(val:boolean)=>void,deleteImage?:(val:string)=>void}) => {
  return (
     <div className="bg-black/20 fixed top-0 left-0 flex justify-center items-center h-full w-full animate-fade-in z-10">
        {images.length > 0 && (
          <div className="mt-10  bg-white p-7 rounded-xl relative ">
            <h2 className="text-center text-3xl font-medium mb-2 ">All Photos</h2>
            <div onClick={()=>setOpenImages(false)} className="absolute top-7 right-10 text-2xl text-red-600 font-semibold cursor-pointer hover:rotate-180 transition-all duration-500">X</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-[400px] w-full p-4 overflow-y-scroll">
              {images.map((file, index) => (
                <div key={index} className="w-44 h-44 group rounded overflow-hidden relative">
                  <img
                    src={typeof file === "string" ?file : URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded hover:scale-110 transition-all duration-300"
                  />
                  <div onClick={()=>deleteImage?.(typeof file === "string" ?file:file.name)} className="absolute inset-0 bg-red-500 bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-70 transition-all duration-300 cursor-pointer">
                    <FaTrash className="text-white text-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  )
}

export default ShowImages