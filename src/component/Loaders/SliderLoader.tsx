
const SliderLoader = ({name}:{name:string}) => {
  return (
    <div className="mt-7 w-[90%] mx-auto">
      <h2 className="text-xl font-bold mb-4 ">
        Popular homes in {name} <span className="text-rose-500">›</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
            <div className="w-full h-48 rounded animate-shimmer"></div>
            <div className="h-4 w-3/4 animate-shimmer rounded"></div>
            <div className="h-3 w-1/2 animate-shimmer rounded"></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
            <div className="w-full h-48 rounded animate-shimmer"></div>
            <div className="h-4 w-3/4 animate-shimmer rounded"></div>
            <div className="h-3 w-1/2 animate-shimmer rounded"></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
            <div className="w-full h-48 rounded animate-shimmer"></div>
            <div className="h-4 w-3/4 animate-shimmer rounded"></div>
            <div className="h-3 w-1/2 animate-shimmer rounded"></div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-lg space-y-3">
            <div className="w-full h-48 rounded animate-shimmer"></div>
            <div className="h-4 w-3/4 animate-shimmer rounded"></div>
            <div className="h-3 w-1/2 animate-shimmer rounded"></div>
        </div>
    </div>
    </div>
  )
}

export default SliderLoader