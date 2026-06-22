"use client";

import { useState } from "react";
import ParticleBg from "@/components/particle-bg";
import TitleScreen from "@/components/title-screen";
import MainMenu from "@/components/main-menu";
import CommissionsScreen from "@/components/commissions-screen";
import GalleryScreen from "@/components/gallery-screen";
import ContactsScreen from "@/components/contacts-screen";

type Screen = "title" | "menu" | "commissions" | "gallery" | "contacts";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("title");

  const navigate = (s: Screen) => setScreen(s);

  return (
    <>
      <ParticleBg />
      {screen === "title" && <TitleScreen onStart={() => navigate("menu")} />}
      {screen === "menu" && (
        <MainMenu
          onSelect={(id) => {
            if (id === "commissions" || id === "comm-dibujo" || id === "comm-pagina") {
              navigate("commissions");
            } else if (id === "gallery") {
              navigate("gallery");
            } else if (id === "contacts") {
              navigate("contacts");
            }
          }}
        />
      )}
      {screen === "commissions" && <CommissionsScreen onBack={() => navigate("menu")} />}
      {screen === "gallery" && <GalleryScreen onBack={() => navigate("menu")} />}
      {screen === "contacts" && <ContactsScreen onBack={() => navigate("menu")} />}
    </>
  );
}
