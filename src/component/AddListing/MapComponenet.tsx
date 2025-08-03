import { useEffect, } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { SearchBar } from "./MapSearchBar";
import { useTranslation } from "react-i18next";

const MapComponenet = ({coords,setCoords}:{coords:{ lat: number; lng: number,city:string,address:string } | null ,setCoords:(val:{ lat: number; lng: number,city:string,address:string } )=>void}) => {
  const {i18n}=useTranslation();

  const LocationMarker = ({ setCoords }: {setCoords:(val:{ lat: number; lng: number,city:string,address:string } ) => void }) => {
  useMapEvents({
    click(e) {
      setCoords({
        city:"",
        address:"",
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
          city:"",
          address:"",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, []);
  
useEffect(() => {
  if (coords) {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}&accept-language=${i18n.language}`
        );
        const data = await response.json();

        const city = data.display_name?.split(",")[data.display_name?.split(",").length-1] || "";
        const address = data.display_name?.split(",").slice(1, 3).join(",") || "";

        if (coords.city !== city || coords.address !== address) {
          setCoords({ ...coords, city, address });
        }
        console.log(data.display_name)
        console.log(city,"city")
        console.log(address,"adress")
      } catch (err) {
        console.error("Failed to fetch address:", err);
      }
    };
    fetchAddress();
  }
}, [coords?.lat, coords?.lng,setCoords, i18n.language]);
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
          <SearchBar  setCoords={setCoords}/>
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
