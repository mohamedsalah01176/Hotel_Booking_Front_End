
const Title = ({category,title,setTitle}:{category:string,title:string,setTitle:(val:string)=>void}) => {
  return (
    <div className="py-10 h-[70vh] flex flex-col justify-center items-center animate-fade-in">
      <div className="md:w-[620px]">
        <h2 className="text-3xl font-semibold">Now, let<sup>,</sup>s give your {category || "house"} a title</h2>
        <p className="text-gray-600 mt-1 mb-7">Short title work best. Have fun with it-you can always change it later</p>
      </div>
      <div>
        <textarea title="title" maxLength={32} name="title" id="" onChange={(e)=>setTitle(e.target.value)}  value={title} className="border border-gray-400 rounded-xl w-[300px] md:w-[600px] h-[150px] md:h-[200px] p-4 text-xl bg-white"></textarea>
        <p>{title.length}/32</p>
      </div>
    </div>
  )
}

export default Title