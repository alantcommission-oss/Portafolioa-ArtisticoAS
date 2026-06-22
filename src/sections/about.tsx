const skills = [
  { name: "Digital Painting", level: 95 },
  { name: "Character Design", level: 90 },
  { name: "Concept Art", level: 85 },
  { name: "Traditional Drawing", level: 80 },
  { name: "Color Theory", level: 88 },
  { name: "Composition", level: 82 },
];

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-24 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-accent text-center mb-12 uppercase tracking-wider">
          About
        </h2>

        <div className="parchment-card p-6 md:p-8 mb-12">
          <p className="font-body text-lg leading-relaxed text-foreground/90 mb-4">
            I am a dark fantasy and character artist with over a decade of
            experience bringing haunting, beautiful worlds to life. My work
            explores the intersection of shadow and light, blending traditional
            techniques with digital media to create pieces that tell stories.
          </p>
          <p className="font-body text-lg leading-relaxed text-foreground/90">
            Specializing in character art, illustrations, and concept design, I
            work closely with clients to realize their visions — from TTRPG
            characters to book covers and personal commissions. Every piece is
            crafted with attention to mood, narrative, and the small details
            that make an image unforgettable.
          </p>
        </div>

        <h3 className="font-heading text-2xl text-accent text-center mb-8 uppercase tracking-wider">
          Skills & Expertise
        </h3>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="font-heading text-sm text-foreground/90">
                  {skill.name}
                </span>
                <span className="font-heading text-sm text-accent">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="skill-bar h-full bg-accent rounded-full"
                  style={{ "--skill-level": `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
