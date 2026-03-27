import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Offerings from "@/components/Offerings";
import RecentWork from "@/components/RecentWork";
import AboutUs from "@/components/AboutUs";
import HowWeWork from "@/components/HowWeWork";
import OurStack from "@/components/OurStack";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Offerings />
      <RecentWork />
      <AboutUs />
      <HowWeWork />
      <OurStack />
      <CTA />
    </>
  );
}
