import Image from "next/image";
import DriveInfoSection from "./Components/DriveInfoSection";
import Footer from "./Components/Footer";
import HeroSection from "./Components/HeroSection";
import MoreInfoSection from "./Components/MoreInfoSection";
import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <DriveInfoSection />
      <MoreInfoSection />
      <Footer />
    </main>
  );
}
