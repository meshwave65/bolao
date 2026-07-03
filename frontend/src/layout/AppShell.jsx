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

  const hideBottomNav = location.pathname === "/admin-login";

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
