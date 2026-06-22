"use client";

import { useState } from "react";
import ParticleBg from "@/components/particle-bg";
import TitleScreen from "@/components/title-screen";
import MainMenu from "@/components/main-menu";
import CommissionsScreen from "@/components/commissions-screen";
import GalleryScreen from "@/components/gallery-screen";
import ContactsScreen from "@/components/contacts-screen";
import GameMode from "@/components/game-mode";
import CursorFollower from "@/components/cursor-follower";
import KeyboardTutorial from "@/components/keyboard-tutorial";
import CollectibleGame from "@/components/collectible-game";
import MusicPlayer from "@/components/music-player";
import ThemeToggle from "@/components/theme-toggle";
import { useLang } from "@/lib/i18n/language-context";

type Screen = "title" | "menu" | "comm-dibujo" | "comm-pagina" | "gallery" | "contacts";

export default function Home() {
  const { t } = useLang();
  const [screen, setScreen] = useState<Screen>("title");
  const [showGame, setShowGame] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  const navigate = (s: Screen) => {
    setShowGame(false);
    setScreen(s);
  };

  return (
    <>
      <ParticleBg />
      {!showGame && screen === "title" && <TitleScreen onStart={() => navigate("menu")} />}
      {!showGame && screen === "menu" && (
        <MainMenu
          onSelect={(id) => {
            if (id === "comm-dibujo") navigate("comm-dibujo");
            else if (id === "comm-pagina") navigate("comm-pagina");
            else if (id === "gallery") navigate("gallery");
            else if (id === "contacts") navigate("contacts");
            else if (id === "game") {
              setShowGame(true);
              setGameCount(0);
            }
          }}
          onBack={() => navigate("title")}
        />
      )}
      {!showGame && screen === "comm-dibujo" && <CommissionsScreen type="dibujo" onBack={() => navigate("menu")} />}
      {!showGame && screen === "comm-pagina" && <CommissionsScreen type="pagina" onBack={() => navigate("menu")} />}
      {!showGame && screen === "gallery" && <GalleryScreen onBack={() => navigate("menu")} />}
      {!showGame && screen === "contacts" && <ContactsScreen onBack={() => navigate("menu")} />}

      {showGame && (
        <>
          <GameMode onBack={() => { setShowGame(false); setScreen("menu"); }} count={gameCount} />
          <CollectibleGame onCollect={() => setGameCount((c) => c + 1)} />
        </>
      )}

      <MusicPlayer />
      <ThemeToggle />
      <CursorFollower />
      <KeyboardTutorial />
      <a
        href="/admin"
        className="fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--ink2)] border border-[var(--mag)]/30 text-[var(--mag)] hover:bg-[var(--mag)] hover:text-[var(--ink)] transition-all opacity-50 hover:opacity-100 text-lg"
        title={t("admin_panel")}
      >
        ⚙️
      </a>
    </>
  );
}
