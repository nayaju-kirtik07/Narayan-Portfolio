import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showreel from "@/components/Showreel";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import ReelsSection from "@/components/ReelsSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getProjects, getServices, getTestimonials, getReels, getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, services, testimonials, reels, siteData] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
    getReels(),
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
        <ReelsSection reels={reels} />
        <Testimonials testimonials={testimonials} />
        <Contact data={siteData.contact} />
      </main>
      <Footer />
    </>
  );
}
