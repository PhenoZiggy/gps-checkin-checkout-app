import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Map from "./components/map/Map";

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
