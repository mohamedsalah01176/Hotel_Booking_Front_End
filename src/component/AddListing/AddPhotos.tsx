import React, {  useCallback, useRef, useState } from "react"
import { FaCamera } from "react-icons/fa"
import ShowImages from "./ShowImages"
import { useTranslation } from "react-i18next"
const AddPhotos = ({images,setImages}:{images:File[],setImages:(val:File[])=>void}) => {
  const [done,setDone]=useState(false)
  const [openImages,setOpenImages]=useState(false)
  const fileInputRef=useRef<HTMLInputElement>(null)
  const {t}=useTranslation();

  const handleChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files;
    if (!files) return;
    const selectedFiles = Array.from(files);
    setImages(selectedFiles);
    setDone(true);
    if(selectedFiles.length>=5){
      setOpenImages(true)
    }
  },[images])
  
  const deleteImage=useCallback((name:string)=>{
    const update=images.filter(item=>item.name !== name)
    setImages(update)
  },[images])
  return (
    <div className="py-10 h-[76vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">{t("addListing.addPhotos.title")}</h2>
        <p className="text-gray-600 mt-1 mb-10">{t("addListing.addPhotos.desc")}</p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="h-[300px] md:h-[350px] w-[300px] md:w-[500px] border-2 border-dashed border-gray-300 rounded-xl bg-gray-100 flex flex-col justify-center items-center cursor-pointer hover:bg-gray-200 transition"
      >
        <FaCamera className="text-4xl mb-4 text-gray-600" />
        <button className="font-medium bg-white py-2 px-4 border border-gray-400 rounded hover:border-black transition">
          {t("addListing.addPhotos.addBtn")}
        </button>

        {images.length < 5 && done && <div className="text-red-600">{t("addListing.addPhotos.error")}</div>}
        {images.length >= 5 && done && (
          <>
            <div className="text-green-600">{t("addListing.addPhotos.success")}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenImages(true);
              }}
              className="text-black mt-5 bg-gray-200 py-2 px-4 border rounded-xl hover:bg-gray-300 transition-all duration-300"
            >
              {t("addListing.addPhotos.showImages")}
            </button>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          multiple
          ref={fileInputRef}
          className="hidden"
          title="add photos"
        />
      </div>

      {openImages && (
        <ShowImages images={images} setOpenImages={setOpenImages} deleteImage={deleteImage} />
      )}
    </div>
  );
}

export default AddPhotos