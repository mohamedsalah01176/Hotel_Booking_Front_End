import { useEffect } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import L from "leaflet";

export const SearchBar = ({ setCoords }: { setCoords: (val: { lat: number; lng: number }) => void }) => {
  const map = useMap();

    useEffect(() =>{
    const provider = new OpenStreetMapProvider();
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      showPopup: true,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result: any) => {
      const { location } = result;
      setCoords({ lat: location.y, lng: location.x });
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};
