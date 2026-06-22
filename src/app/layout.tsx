import type { Metadata } from "next";
import { Cinzel, Crimson_Text } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n/language-context";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const crimson = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlantArt — Portafolio",
  description: "Ilustración · Furry Art · Comisiones",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cinzel.variable} ${crimson.variable}`}>
      <body>
        <div id="grain-overlay" />
        <div id="scanlines" />
        <div id="vignette" />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
