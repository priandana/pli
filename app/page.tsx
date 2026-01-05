import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Services from "../components/Services";
import SpreadsheetHub from "../components/SpreadsheetHub";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <SpreadsheetHub />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
