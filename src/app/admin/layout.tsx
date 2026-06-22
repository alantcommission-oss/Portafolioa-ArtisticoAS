import Link from "next/link";
import { LogOut, ImageIcon, MessageSquare, LayoutDashboard, Palette } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-4 border-b border-border">
          <Link href="/admin" className="font-heading text-lg text-accent">
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent hover:bg-muted rounded transition-colors"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link
            href="/admin/artworks"
            className="flex items-center gap-3 px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent hover:bg-muted rounded transition-colors"
          >
            <ImageIcon size={16} />
            Gallery
          </Link>
          <Link
            href="/admin/commissions"
            className="flex items-center gap-3 px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent hover:bg-muted rounded transition-colors"
          >
            <Palette size={16} />
            Commissions
          </Link>
          <Link
            href="/admin/messages"
            className="flex items-center gap-3 px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent hover:bg-muted rounded transition-colors"
          >
            <MessageSquare size={16} />
            Messages
          </Link>
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <a href="/"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-accent/20 text-accent font-heading text-sm tracking-wider uppercase rounded transition-all duration-150 hover:bg-accent/30 hover:scale-105 active:scale-95 w-full"
          >
            ← Volver
          </a>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2 text-sm font-body text-foreground/70 hover:text-destructive hover:bg-muted rounded transition-colors w-full"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border flex items-center justify-between px-4 h-14">
        <Link href="/admin" className="font-heading text-lg text-accent">
          Admin Panel
        </Link>
        <details className="relative">
          <summary className="list-none cursor-pointer text-foreground/70 hover:text-accent">
            Menu
          </summary>
          <div className="absolute right-0 top-8 bg-card border border-border rounded shadow-lg p-2 w-48">
            <Link
              href="/admin"
              className="block px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent rounded"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/artworks"
              className="block px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent rounded"
            >
              Gallery
            </Link>
            <Link
              href="/admin/commissions"
              className="block px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent rounded"
            >
              Commissions
            </Link>
            <Link
              href="/admin/messages"
              className="block px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent rounded"
            >
              Messages
            </Link>
            <a href="/"
              className="block px-3 py-2 text-sm font-body text-foreground/70 hover:text-accent rounded font-heading tracking-wider uppercase"
            >
              ← Volver
            </a>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="block w-full text-left px-3 py-2 text-sm font-body text-destructive hover:bg-muted rounded"
              >
                Logout
              </button>
            </form>
          </div>
        </details>
      </div>

      {/* Main content */}
      <div className="flex-1 pt-14 md:pt-0">{children}</div>
    </div>
  );
}
