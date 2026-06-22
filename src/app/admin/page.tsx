import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [artworkCount, messageCount, unreadCount, slotCount] =
    await Promise.all([
      prisma.artwork.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.commissionSlot.count(),
    ]);

  return (
    <div className="p-6">
      <h1 className="font-heading text-2xl text-accent mb-8 uppercase tracking-wider">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="parchment-card p-6">
          <p className="text-sm font-body text-foreground/60 mb-1">Artworks</p>
          <p className="text-3xl font-heading text-accent">{artworkCount}</p>
          <p className="text-xs font-body text-foreground/40 mt-1">
            / 24 max
          </p>
        </div>
        <div className="parchment-card p-6">
          <p className="text-sm font-body text-foreground/60 mb-1">
            Messages
          </p>
          <p className="text-3xl font-heading text-accent">{messageCount}</p>
          <p className="text-xs font-body text-foreground/40 mt-1">
            {unreadCount} unread
          </p>
        </div>
        <div className="parchment-card p-6">
          <p className="text-sm font-body text-foreground/60 mb-1">
            Commission Slots
          </p>
          <p className="text-3xl font-heading text-accent">{slotCount}</p>
          <p className="text-xs font-body text-foreground/40 mt-1">total</p>
        </div>
        <div className="parchment-card p-6">
          <p className="text-sm font-body text-foreground/60 mb-1">Capacity</p>
          <p className="text-3xl font-heading text-accent">
            {Math.round((artworkCount / 24) * 100)}%
          </p>
          <p className="text-xs font-body text-foreground/40 mt-1">
            gallery used
          </p>
        </div>
      </div>
    </div>
  );
}
