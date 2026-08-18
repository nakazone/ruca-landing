import { ClaimsProcess } from "@/components/ClaimsProcess";
import { DamageSigns } from "@/components/DamageSigns";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { MobileCallBar } from "@/components/MobileCallBar";
import { ServiceArea } from "@/components/ServiceArea";
import { Testimonials } from "@/components/Testimonials";
import { WhyChooseRuca } from "@/components/WhyChooseRuca";

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <ClaimsProcess />
        <DamageSigns />
        <WhyChooseRuca />
        <ServiceArea />
        <Testimonials />
        <LeadForm />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
