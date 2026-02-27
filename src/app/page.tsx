import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import Offerings from "@/components/Offerings";
import AsphaltShowcase from "@/components/AsphaltShowcase";
import SynergyCloud from "@/components/SynergyCloud";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoCarousel />
      <Offerings />
      <AsphaltShowcase />
      <SynergyCloud />
      <Testimonials />
      <CTA />
    </>
  );
}