import { useEffect, } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { SearchBar } from "./MapSearchBar";

const MapComponenet = ({coords,setCoords}:{coords:{ lat: number; lng: number } | null ,setCoords:(val:{ lat: number; lng: number } )=>void}) => {
  

  const LocationMarker = ({ setCoords }: { setCoords: (val: { lat: number; lng: number }) => void }) => {
  useMapEvents({
    click(e) {
      setCoords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);

  if (!coords) return <p className="text-center">Getting your location...</p>;
  console.log(coords)
  return (
    <>
    {coords && (
      <div className=" w-[300px] md:w-[500px] h-[350px] rounded-2xl overflow-hidden -z-10">
        <MapContainer
          center={coords}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <LocationMarker setCoords={setCoords} />
          <SearchBar setCoords={setCoords}/>
          <Marker position={coords}>
            <Popup>You are here 👋</Popup>
          </Marker>
        </MapContainer>
      </div>
    )}
  </>

  );
};

export default MapComponenet;
