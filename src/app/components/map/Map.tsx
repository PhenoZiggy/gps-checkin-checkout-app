import React, { useEffect, useState } from "react";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";

const Map = ({ location }: any) => {
  const libraries = useMemo(() => ["places"], []);
  const [place, setPlace] = useState<any>();
  const mapCenter = useMemo(
    () => ({ lat: 27.672932021393862, lng: 85.31184012689732 }),
    []
  );
  console.log(location);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPlace({
          lat: Number(location.lat),
          lng: Number(location.lng),
        });
      });
    }
  }, []);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <p>This is Sidebar...</p>
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={18}
        center={place}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "160px", height: "300px" }}
        onLoad={() => console.log("Map Component Loaded...")}
      >
        <MarkerF position={place} onLoad={() => console.log("Marker Loaded")} />
      </GoogleMap>
    </div>
  );
};

export default Map;
