import { Nav } from "@/components/nav";
import { HeroSection } from "@/sections/hero";
import { GallerySection } from "@/sections/gallery";
import { AboutSection } from "@/sections/about";
import { CommissionsSection } from "@/sections/commissions";
import { ContactSection } from "@/sections/contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <GallerySection />
        <AboutSection />
        <CommissionsSection />
        <ContactSection />
      </main>
    </>
  );
}
