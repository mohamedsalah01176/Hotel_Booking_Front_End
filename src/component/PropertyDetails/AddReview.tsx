import { useState } from "react"

const AddReview = ({setOpenAddReview,handleAddReview}:{setOpenAddReview:(val:boolean)=>void,handleAddReview:(val:{data:string,rate:number})=>void}) => {
  const [reviewContent,setReviewContent]=useState({data:"",rate:0});

  return (
    <div className="fixed w-full h-full bg-black/20 flex justify-center items-center z-20 animate-fade-in">
      <div className="bg-white px-7 py-14 w-[300px] md:w-[600px] min-h-[200px] relative rounded-xl">
        <button onClick={()=>{setOpenAddReview(false)}} className="text-2xl text-red-600 font-semibold hover:rotate-180 cursor-pointer transition-all duration-500 absolute top-3 right-5">X</button>
        <div>
          <label htmlFor="Review" className="mb-5 text-lg">Review</label>
          <input id="Review" type="text" placeholder="Add Your Comment" onChange={(e)=>setReviewContent({...reviewContent,data:e.target.value})} className="border-[1px] w-full p-2 rounded-xl outline-none hover:scale-105 transition-all duration-300"/>
        </div>
        <div className="mt-5">
          <label htmlFor="Review" className="mb-5 text-lg">Rate</label>
          <input type="number" max={5} min={0} title="rate" placeholder="0 to 5" onChange={(e)=>setReviewContent({...reviewContent,rate:parseInt(e.target.value) })} className="border-[1px] w-full p-2 rounded-xl outline-none hover:scale-105 transition-all duration-300"/>
        </div>
        <button onClick={()=>handleAddReview(reviewContent)}  className="w-full p-3 text-white bg-[#e77008] mt-7 rounded-xl text-[17px] hover:bg-[#02717e] transition-all duration-300 cursor-pointer">Submit</button>
      </div>
    </div>
  )
}

export default AddReview