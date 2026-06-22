import { prisma } from "@/lib/prisma";

export async function CommissionsSection() {
  let categories: Awaited<ReturnType<typeof prisma.commissionCategory.findMany<{ orderBy: { sortOrder: "asc" }, include: { slots: true } }>>> = [];
  try {
    categories = await prisma.commissionCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { slots: true },
    });
  } catch {
    // DB not available during static generation
  }

  return (
    <section id="commissions" className="min-h-screen py-24 px-4 pt-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl text-accent text-center mb-4 uppercase tracking-wider">
          Commissions
        </h2>
        <p className="text-center text-foreground/70 font-body mb-12 max-w-2xl mx-auto">
          Each category has limited slots. Select a category to view
          type-specific pricing and availability.
        </p>

        {categories.length === 0 ? (
          <p className="text-center text-foreground/60 font-body text-lg">
            Commission info coming soon...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const totalSlots = cat.slots.length;
              const availableSlots = cat.slots.filter(
                (s) => s.status === "available"
              ).length;
              const isBooked = availableSlots === 0;

              return (
                <div
                  key={cat.id}
                  className={`parchment-card p-6 transition-all hover:border-accent/50 ${
                    isBooked ? "opacity-60" : ""
                  }`}
                >
                  <h3 className="font-heading text-2xl text-accent mb-2">
                    {cat.name}
                  </h3>
                  <p className="font-body text-sm text-foreground/60 mb-4">
                    Base price: ${Number(cat.basePrice).toLocaleString()}
                  </p>

                  {/* Type pricing */}
                  <div className="space-y-1 mb-4">
                    {cat.headshotPrice && (
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-foreground/70">Headshot</span>
                        <span className="text-accent">
                          ${Number(cat.headshotPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {cat.halfbodyPrice && (
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-foreground/70">Halfbody</span>
                        <span className="text-accent">
                          ${Number(cat.halfbodyPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {cat.fullbodyPrice && (
                      <div className="flex justify-between text-sm font-body">
                        <span className="text-foreground/70">Fullbody</span>
                        <span className="text-accent">
                          ${Number(cat.fullbodyPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Slot status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isBooked ? "bg-destructive" : "bg-green-500"
                      }`}
                    />
                    <span className="text-xs font-body text-foreground/60">
                      {isBooked
                        ? "Fully booked"
                        : `${availableSlots}/${totalSlots} slots available`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
