import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import { useFormik } from "formik";
import { IoClose } from "react-icons/io5";
import * as yup from "yup"
import type { IProperty } from "../../interface/property";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { TokenContext } from "../../util/TokenContext";
import { useTranslation } from "react-i18next";
import ShowImages from "../AddListing/ShowImages";
import Select from 'react-select'
import { options } from "../../util/options";

const UpdateProperty = ({setUpdateProperty,propertyId}:{setUpdateProperty:(val:boolean)=>void,propertyId:string}) => {
  const categories=["home","partment"];
  const {i18n}=useTranslation();
  const {token}=useContext(TokenContext);
  const queryClient = useQueryClient();
  const [openImages,setOpenImages]=useState(false)

  const getProperty=()=>{
    return axios.get(`${import.meta.env.VITE_BASE_URL}/api/property/${propertyId}?lang=${i18n.language}`)
  }
  const {data}=useQuery<
  AxiosResponse<{ property: IProperty }>,
  Error
  >({
    queryKey:["updateProperty",propertyId],
    queryFn:getProperty
  })
  const property=data?.data.property as IProperty

  const initialValues={
    title: property?.title ?? "",
    description: property?.description ?? "",
    category: property?.category ?? "",
    priceNigth: property?.nightPrice ?? 0,
    guestNumber: property?.guestNumber ?? 0,
    bathroomNumber: property?.bathroomNumber ?? 0,
    badroomNumber: property?.badroomNumber ?? 0,
    bedNumber: property?.bedNumber ?? 0,
    images: property?.images ?? [],
    services: property?.services ?? [],
    location: property?.location ?? ""
  }
  const formik=useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: yup.object({
      title: yup.string().required("Title is required").min(3, "Please enter at least 3 characters"),
      description: yup.string().required("Description is required").min(3, "Please enter at least 3 characters"),
      category: yup.string().required("Category is required"),
      priceNigth: yup.number().required("Price per night is required").min(1, "Minimum value is 1"),
      guestNumber: yup.number().required("Guest number is required").min(1, "Minimum value is 1"),
      bathroomNumber: yup.number().required("Bathroom number is required").min(1, "Minimum value is 1"),
      badroomNumber: yup.number().required("Bedroom number is required").min(1, "Minimum value is 1"),
      bedNumber: yup.number().required("Bed number is required").min(1, "Minimum value is 1"),
      images: yup.array().min(5, "You must upload at least 5 images").required("Images are required"),
      services: yup.array().min(1, "Select at least one service"),
    }),
    onSubmit:async(values)=>{
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("category", values.category);
        formData.append("nightPrice", String(values.priceNigth));
        formData.append("guestNumber", String(values.guestNumber));
        formData.append("bathroomNumber", String(values.bathroomNumber));
        formData.append("badroomNumber", String(values.badroomNumber));
        formData.append("bedNumber", String(values.bedNumber));
        
        values.images.forEach((img: File | string) => {
          if (typeof img !== "string") {
            formData.append("images", img);
          }
        });

        values.services.forEach((item, index) => {
          formData.append(`services[${index}].service`, item.service);
        });

        const res = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/property/${propertyId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data.status === "success") {
          toast.success("Property updated successfully");
          await queryClient.invalidateQueries({ queryKey: ["propertiesForAdmin"] });
          setUpdateProperty(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the property");
      }
    }
  })

  const handleChangeImages=(e:React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const imagesArray = Array.from(files);
      formik.setFieldValue("images", imagesArray);
    }
  }
  return (
    <div  className="fixed top-[56%]  left-[50%] py-5 px-10 -translate-[50%] bg-[#f7f7f7] rounded-2xl min-h-[70vh] min-w-[90%] md:min-w-[700px] ">
      <h2 className="text-center text-2xl font-medium text-[#02717e] mb-5">Upadata Property</h2>
      <button title="close" onClick={()=>setUpdateProperty(false)} className="absolute top-5 right-5 text-3xl font-medium text-red-700 transition-all duration-500 hover:rotate-180 cursor-pointer"><IoClose/> </button>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-5 px-1 sm:px-2 max-h-[57vh] overflow-y-auto">

        <div className="flex flex-col gap-1 ">
          <label className="block font-medium" htmlFor="title">Title</label>
          <input id="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur} name="title"   className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 " />
          {(formik.touched.title || formik.submitCount > 0) && formik.errors.title &&
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          }
        </div>
        
        <div className="flex flex-col gap-1 ">
          <label className="block font-medium" htmlFor="description">Description</label>
          <input id="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} name="description"   className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "  type="text" placeholder={"Enter Host Description"} />
          {(formik.touched.description || formik.submitCount > 0) && formik.errors.description &&
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          }
        </div>

        <div className="flex flex-col gap-1 ">
          <label htmlFor="select" className="block font-medium">Categories:</label>
          <select id="select" title="selection" name="category" value={formik.values.category } onChange={formik.handleChange} onBlur={formik.handleBlur}  className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "  >
              <option value="">Select Category</option>
                  {categories.map((cat) => (
                      <option key={cat} value={cat}>
                      {cat}
                      </option>
                  ))}
          </select>
          {(formik.touched.category || formik.submitCount > 0) && formik.errors.category && (
            <p className="text-red-500 text-sm">{formik.errors.category}</p>
          )}
        </div>
        
        <div className="flex flex-col gap-1 ">
          {openImages && <ShowImages images={formik.values.images} setOpenImages={setOpenImages}/>}
          <div className="flex justify-between itmes-center">
            <label htmlFor="image" className="block font-medium">Image:</label>
            {  formik.values.images?.length>0  &&<p className="text-sm text-green-600">you have {formik.values.images?.length} images <span className="cursor-pointer text-gray-700 font-semibold underline" onClick={()=>setOpenImages(true)}>Show Images</span></p>}
            {/* { formik.values.images?.length<=0 && <p className="text-sm text-red-600">you have not {formik.values.images?.length} images</p>} */}
          </div>
          <input id="image" type="file" name="images" accept="image/*" multiple onChange={handleChangeImages} onBlur={formik.handleBlur}   className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "/>
          {(formik.touched.images || formik.submitCount > 0) && formik.errors.images && (
            <p className="text-red-500 text-sm">{formik.errors.images}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priceNigth" className="block font-medium">Price/Night</label>
          <input
            id="priceNigth"
            type="number"
            name="priceNigth"
            value={formik.values.priceNigth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
          {(formik.touched.priceNigth || formik.submitCount > 0) && formik.errors.priceNigth && (
            <p className="text-red-500 text-sm">{formik.errors.priceNigth}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="services" className="block font-medium">Services</label>
          <Select
            options={options}
            isMulti
            value={
              formik.values.services
                ? formik.values.services.map(service => ({
                    value: service.service,
                    label: service.service
                  }))
                : [] 
            }
            onChange={(selectedOptions) =>
              formik.setFieldValue(
                "services",
                selectedOptions?.map(option => ({
                  service: option.value,
                }))
              )
            }
            menuPortalTarget={document.body}   
              styles={{ 
                menuPortal: base => ({ ...base, zIndex: 9999 }) 
              }}
          />
          {(formik.touched.services || formik.submitCount > 0) && formik.errors.services && (
            <p className="text-red-500 text-sm">{formik.errors.services}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="guestNumber" className="block font-medium">Guests</label>
          <input
            id="guestNumber"
            type="number"
            name="guestNumber"
            value={formik.values.guestNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
          {(formik.touched.guestNumber || formik.submitCount > 0) && formik.errors.guestNumber && (
            <p className="text-red-500 text-sm">{formik.errors.guestNumber}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bathroomNumber" className="block font-medium">Bathrooms</label>
          <input
            id="bathroomNumber"
            type="number"
            name="bathroomNumber"
            value={formik.values.bathroomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
          {(formik.touched.bathroomNumber || formik.submitCount > 0) && formik.errors.bathroomNumber && (
            <p className="text-red-500 text-sm">{formik.errors.bathroomNumber}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="badroomNumber" className="block font-medium">Bedrooms</label>
          <input
            id="badroomNumber"
            type="number"
            name="badroomNumber"
            value={formik.values.badroomNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
          {(formik.touched.badroomNumber || formik.submitCount > 0) && formik.errors.badroomNumber && (
            <p className="text-red-500 text-sm">{formik.errors.badroomNumber}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bedNumber" className="block font-medium">Beds</label>
          <input
            id="bedNumber"
            type="number"
            name="bedNumber"
            value={formik.values.bedNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
          {(formik.touched.bedNumber || formik.submitCount > 0) && formik.errors.bedNumber && (
            <p className="text-red-500 text-sm">{formik.errors.bedNumber}</p>
          )}
        </div>

        {/* <div className="flex flex-col gap-1">
          <label htmlFor="location" className="block font-medium">Location</label>
          <input
            id="location"
            type="text"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full outline-none bg-white border-[1.5px] border-gray-400 focus:border-blue-700 focus:border-[2px] rounded-2xl p-2  transition-all duration-300 "
          />
        </div> */}
        </div>

        <div className="md:col-span-2 mt-2 md:mt-7">
        <button
            type="submit"
            className="w-full bg-[#02717e] text-white py-2 px-4 rounded-2xl hover:bg-[#356065] transition-all cursor-pointer"
          >
            Update Property
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProperty