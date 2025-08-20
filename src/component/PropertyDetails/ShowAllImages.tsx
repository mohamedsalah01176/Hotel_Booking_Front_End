import defaultImage from "../../assets/default.jpg"

const ShowAllImages = ({images,setShowAll}:{images:string[],setShowAll:(val:boolean)=>void}) => {
  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-80 flex flex-col items-center justify-center z-50 animate-fade-in">
        <button
          onClick={() => setShowAll(false)}
          className="text-white text-lg mb-4 bg-red-500 px-4 py-2 rounded-lg"
        >
          ✕ Close
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 overflow-y-auto max-h-[90vh] modal-scroll">
          {images?.length > 0
            ? images.map((img, i) => (
                <img
                  key={i}
                  src={img || defaultImage}
                  alt={`image-${i}`}
                  className="w-full h-[250px] object-cover rounded-xl"
                />
              ))
            : null}
        </div>
      </div>
  )
}

export default ShowAllImages