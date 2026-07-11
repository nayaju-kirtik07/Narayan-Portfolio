import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showreel from "@/components/Showreel";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import BTS from "@/components/BTS";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects, getServices, getTestimonials, getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, services, testimonials, siteData] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
    getSiteData(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero data={siteData.hero} />
        <About data={siteData.about} />
        <Showreel data={siteData.showreel} />
        <Portfolio projects={projects} />
        <Services services={services} />
        <BTS images={siteData.bts.images} />
        <Testimonials testimonials={testimonials} />
        <Contact data={siteData.contact} />
      </main>
      <Footer />
    </>
  );
}
