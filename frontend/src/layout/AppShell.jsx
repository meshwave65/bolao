import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useEvent } from "../contexts/EventContext";

import Header from "../components/Header";
import BottomNav from "../components/BottomNav";

export default function AppShell() {
  return (
    <>
      <AppInitializer />
      <AppLayout />
    </>
  );
}

function AppInitializer() {
  const { loadEventByCode } = useEvent();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      loadEventByCode(code);
    }
  }, [loadEventByCode]);

  return null;
}

function AppLayout() {
  const location = useLocation();

  // páginas que NÃO devem receber padding da "casca"
  const fullBleedRoutes = ["/admin-login"];

  const isFullBleed = fullBleedRoutes.includes(location.pathname);

  return (
    <div
      style={{
        minHeight: "100vh",
        boxSizing: "border-box",

        // 👇 aqui está o ponto crítico
        paddingTop: isFullBleed ? 0 : "70px",
        paddingBottom: isFullBleed ? 0 : "75px",
      }}
    >
      {/* Header só aparece fora de telas fullBleed se quiser */}
      {!isFullBleed && <Header />}

      <main
        style={{
          minHeight: isFullBleed
            ? "100vh"
            : "calc(100vh - 145px)",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </main>

      {/* BottomNav só aparece fora de fullBleed */}
      {!isFullBleed && <BottomNav />}
    </div>
  );
}
