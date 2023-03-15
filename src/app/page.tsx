"use client"; // this is a client component 👈🏽
import { useEffect, useState } from "react";
import Map from "./components/map/Map";

export default function Home() {
  const [checkin, setCheckin] = useState<any>(null);
  const [checkout, setCheckout] = useState<any>(null);
  const [trigger, setTrigger] = useState<any>();
  const [trigger2, setTrigger2] = useState<any>();

  useEffect(() => {
    setTrigger(localStorage?.getItem("checkOutLng"));
    setTrigger2(localStorage?.getItem("checkinLat"));
  }, []);

  const buttonClass =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";

  const ceckOutHandler = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCheckout({
          lat: Number(position.coords.latitude),
          lng: Number(position.coords.longitude),
        });
        localStorage.setItem(
          "checkOutLat",
          position.coords.latitude.toString()
        );
        localStorage.setItem(
          "checkOutLng",
          position.coords.longitude.toString()
        );
      });
    }
  };

  const checkinHandler = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCheckout({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        localStorage.setItem("checkinLat", position.coords.latitude.toString());
        localStorage.setItem(
          "checkinLng",
          position.coords.longitude.toString()
        );
      });
    }
  };

  console.log(checkin);

  useEffect(() => {
    setCheckin({
      lat: localStorage.getItem("checkinLat"),
      lng: localStorage.getItem("checkinLng"),
    });
    setCheckout({
      lat: localStorage.getItem("checkOutLat"),
      lng: localStorage.getItem("checkOutLng"),
    });
  }, [trigger, trigger2]);

  console.log();

  return (
    <div>
      <div className="flex flex-row space-x-6">
        {checkin?.lat ? <Map location={checkin} /> : ""}
        {checkout?.lat ? <Map location={checkout} /> : ""}
      </div>
      <div className="flex flex-col space-y-3">
        <button
          className={buttonClass}
          onClick={() => {
            checkinHandler();
          }}
        >
          Set Checkin
        </button>
        <button
          className={buttonClass}
          onClick={() => {
            ceckOutHandler();
          }}
        >
          Set Checkout
        </button>
      </div>
    </div>
  );
}
