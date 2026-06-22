"use client";

import { useState } from "react";
import ParticleBg from "@/components/particle-bg";
import TitleScreen from "@/components/title-screen";
import MainMenu from "@/components/main-menu";
import CommissionsScreen from "@/components/commissions-screen";
import GalleryScreen from "@/components/gallery-screen";
import ContactsScreen from "@/components/contacts-screen";
import { useLang } from "@/lib/i18n/language-context";

type Screen = "title" | "menu" | "comm-dibujo" | "comm-pagina" | "gallery" | "contacts";

export default function Home() {
  const { t } = useLang();
  const [screen, setScreen] = useState<Screen>("title");

  const navigate = (s: Screen) => setScreen(s);

  return (
    <>
      <ParticleBg />
      {screen === "title" && <TitleScreen onStart={() => navigate("menu")} />}
      {screen === "menu" && (
        <MainMenu
          onSelect={(id) => {
            if (id === "comm-dibujo") navigate("comm-dibujo");
            else if (id === "comm-pagina") navigate("comm-pagina");
            else if (id === "gallery") navigate("gallery");
            else if (id === "contacts") navigate("contacts");
          }}
          onBack={() => navigate("title")}
        />
      )}
      {screen === "comm-dibujo" && <CommissionsScreen type="dibujo" onBack={() => navigate("menu")} />}
      {screen === "comm-pagina" && <CommissionsScreen type="pagina" onBack={() => navigate("menu")} />}
      {screen === "gallery" && <GalleryScreen onBack={() => navigate("menu")} />}
      {screen === "contacts" && <ContactsScreen onBack={() => navigate("menu")} />}

      <a
        href="/admin"
        className="fixed bottom-4 left-4 z-50 isaac-btn !text-[10px] !p-2 opacity-40 hover:opacity-80 transition-opacity"
      >
        {t("admin_panel")}
      </a>
    </>
  );
}
