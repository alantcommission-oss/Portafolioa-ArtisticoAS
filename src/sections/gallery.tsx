import { prisma } from "@/lib/prisma";

export async function GallerySection() {
  let artworks: Awaited<ReturnType<typeof prisma.artwork.findMany>> = [];
  try {
    artworks = await prisma.artwork.findMany({
      orderBy: { position: "asc" },
    });
  } catch {
    // DB not available during static generation
  }

  return (
    <section id="gallery" className="min-h-screen py-24 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-accent text-center mb-12 uppercase tracking-wider">
          Gallery
        </h2>

        {artworks.length === 0 ? (
          <p className="text-center text-foreground/60 font-body text-lg">
            Gallery coming soon...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div
                key={art.id}
                className="parchment-card overflow-hidden group"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-lg text-accent mb-1">
                    {art.title}
                  </h3>
                  {art.description && (
                    <p className="text-sm text-foreground/70 font-body">
                      {art.description}
                    </p>
                  )}
                  {art.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {art.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
