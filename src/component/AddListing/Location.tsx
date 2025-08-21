import MapComponenet from "./MapComponenet"

const Location = ({coords,setCoords}:{coords:{ lat: number; lng: number,city:string,address:string } | null ,setCoords:(val:{ lat: number; lng: number,city:string,address:string } )=>void}) => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] mb-24  flex-col animate-fade-in ">
      <div>
        <h2 className="text-3xl font-semibold">Where<sup>,</sup>s your Place Locate</h2>
        <p className="text-gray-600 mt-1 mb-10">Your address is only shared with guests after they have made a reservation.</p>
      </div>
      <MapComponenet coords={coords} setCoords={setCoords}/>
      {coords && (
        <div className="mt-6 bg-white shadow-md rounded-xl p-4 w-[300px] md:w-[500px] text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Location</h3>
          <p className="text-gray-700">
            <span className="font-medium">City/State: </span>
            {coords.city || "Not detected"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Address: </span>
            {coords.address || "Not detected"}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Lat: {coords.lat.toFixed(4)}, Lng: {coords.lng.toFixed(4)}
          </p>
        </div>
      )}
    </div>
  )
}

export default Location