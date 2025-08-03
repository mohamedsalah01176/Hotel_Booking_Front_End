import React, {  useRef, useState } from "react"
import { FaCamera, FaTrash } from "react-icons/fa"
const AddPhotos = ({images,setImages}:{images:File[],setImages:(val:File[])=>void}) => {
  const [done,setDone]=useState(false)
  const [openImages,setOpenImages]=useState(false)
  const fileInputRef=useRef<HTMLInputElement>(null)

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    setImages(selectedFiles);
    setDone(true);
    if(selectedFiles.length>=5){
      setOpenImages(true)
    }
  }
  
  const deleteImage=(name:string)=>{
    const update=images.filter(item=>item.name !== name)
    setImages(update)
  }
  return (
    <div className="py-10 h-[76vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">Add some photos of your house</h2>
        <p className="text-gray-600 mt-1 mb-10">You will need 5 photos to get started. You can add more or make changes later.</p>
      </div>
      <div onClick={()=>fileInputRef.current?.click()} className="h-[300px] md:h-[350px] w-[300px] md:w-[500px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 transition">
        <FaCamera className="text-4xl mb-4 text-gray-600" />
        <button className=" font-medium bg-white py-2 px-4 border border-gray-400 rounded hover:border-black transition ">Add Photo</button>
        {images.length<5 && done && <div className="text-red-600">Please select at least 5 images</div>}
        {images.length>=5 && done && 
          <>
            <div className="text-green-600">Images uploaded successfully!</div>
            <button onClick={(e)=>{e.stopPropagation(); setOpenImages(true)}} className="text-black mt-5 bg-gray-200 py-2 px-4 border rounded-xl hover:bg-gray-300 transition-all duration-300">Show Images</button>
          </>
        }
        
        <input type="file" accept="image/*" onChange={handleChange} minLength={5} multiple ref={fileInputRef} className="hidden" title="add photos" />
      </div>
      {openImages &&
      <div className="bg-black/20 fixed top-0 left-0 flex justify-center items-center h-full w-full animate-fade-in">
        {images.length > 0 && (
          <div className="mt-10  bg-white p-7 rounded-xl relative ">
            <h2 className="text-center text-3xl font-medium mb-2 ">All Photos</h2>
            <div onClick={()=>setOpenImages(false)} className="absolute top-7 right-10 text-2xl text-red-600 font-semibold cursor-pointer hover:rotate-180 transition-all duration-500">X</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-[400px] w-full p-4 overflow-y-scroll">
              {images.map((file, index) => (
                <div key={index} className="w-44 h-44 group rounded overflow-hidden relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded hover:scale-110 transition-all duration-300"
                  />
                  <div onClick={()=>deleteImage(file.name)} className="absolute inset-0 bg-red-500 bg-opacity-70 flex justify-center items-center opacity-0 group-hover:opacity-70 transition-all duration-300 cursor-pointer">
                    <FaTrash className="text-white text-2xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      }
    </div>
  )
}

export default AddPhotos