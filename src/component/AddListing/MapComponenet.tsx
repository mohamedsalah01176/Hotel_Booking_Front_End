import { useEffect, } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { SearchBar } from "./MapSearchBar";
import { useTranslation } from "react-i18next";

const MapComponenet = ({coords,setCoords}:{coords:{ lat: number; lng: number,city:string,address:string } | null ,setCoords:(val:{ lat: number; lng: number,city:string,address:string } )=>void}) => {
  const {t,i18n}=useTranslation();

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
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // call reverse geocoding API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${i18n.language}`
          );
          const data = await response.json();

          const city =
            (data.address.state ? data.address.state.replace(" Governorate", "") : "") ||
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "";

          const address =
            data.address.neighbourhood ||
            data.address.suburb ||
            data.address.city_district ||
            data.address.road ||
            "";

          setCoords({
            city,
            address,
            lat,
            lng,
          });

        } catch (error) {
          console.error("Reverse geocoding error:", error);
        }
      },
      (err) => {
        console.log("Location error:", err);
      }
    );
  }, [i18n.language]);
  
  useEffect(() => {
    if (coords) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}&accept-language=${i18n.language}`
          );
          const data = await response.json();

        const city =
          (data.address.state ? data.address.state.replace(" Governorate", "") : "") ||
          data.address.city ||
          data.address.town ||
          data.address.village ||
          "";

          const address =
            data.address.village ||
            data.address.suburb ||
            data.address.city_district ||
            data.address.road ||
            "";

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
  if (!coords) return <p className="text-center">{t("addListing.location.map.loading")}</p>;
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
            <Popup>{t("addListing.location.map.youAreHere")}</Popup>
          </Marker>
        </MapContainer>
      </div>
    )}
  </>

  );
};

export default MapComponenet;
