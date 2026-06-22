import { CrowLogo } from "@/components/crow-logo";

export function HeroSection() {
  return (
    <section
      id="title"
      className="min-h-screen flex flex-col items-center justify-center px-4 pt-14"
    >
      <CrowLogo className="w-32 h-32 md:w-48 md:h-48 mb-8" />
      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-accent text-center mb-4">
        Alan T
      </h1>
      <p className="font-heading text-lg md:text-xl text-foreground/80 text-center max-w-md mb-12 tracking-wider uppercase">
        Dark Fantasy & Character Art
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {[
          { id: "gallery", label: "Gallery" },
          { id: "about", label: "About" },
          { id: "commissions", label: "Commissions" },
          { id: "contact", label: "Contact" },
        ].map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="px-6 py-3 border border-accent text-accent font-heading text-sm tracking-widest uppercase transition-all hover:bg-accent hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
