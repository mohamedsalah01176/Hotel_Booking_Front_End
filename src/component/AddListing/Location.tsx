import MapComponenet from "./MapComponenet"

const Location = ({coords,setCoords}:{coords:{ lat: number; lng: number } | null ,setCoords:(val:{ lat: number; lng: number } )=>void}) => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] mb-24  flex-col animate-fade-in ">
      <div>
        <h2 className="text-3xl font-semibold">Where<sup>,</sup>s your Place Locate</h2>
        <p className="text-gray-600 mt-1 mb-10">Your address is only shared with guests after they have made a reservation.</p>
      </div>
      <MapComponenet coords={coords} setCoords={setCoords}/>
    </div>
  )
}

export default Location