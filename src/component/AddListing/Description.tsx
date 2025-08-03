
const Description = ({description,setDescription}:{description:string,setDescription:(val:string)=>void}) => {
  return (
    <div className="py-10 h-[70vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">Create your description</h2>
        <p className="text-gray-600 mt-1 mb-7">Share what makes your place specail</p>
      </div>
      <div>
        <textarea title="description" value={description} maxLength={32} name="title" id="" onChange={(e)=>setDescription(e.target.value)}  className="border border-gray-400 rounded-xl w-[300px] md:w-[600px] h-[150px] md:h-[200px] p-4 text-xl bg-white"></textarea>
        <p>{description.length}/32</p>
      </div>
    </div>
  )
}

export default Description