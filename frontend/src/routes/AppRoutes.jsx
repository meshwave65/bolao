import { Routes, Route } from "react-router-dom";

/* ================= LAYOUTS ================= */
import AppShell from "../layout/AppShell";

/* ================= PUBLIC PAGES ================= */
import Home from "../pages/Home";
import Login from "../pages/Login";
import Predictions from "../pages/Predictions";
import Ranking from "../pages/Ranking";
import EventHome from "../pages/EventHome";
import Register from "../pages/Register";

/* ================= ADMIN AUTH ================= */
import AdminLogin from "../pages/AdminLogin";

/* ================= ADMIN ================= */
import Admin from "../pages/Admin";
import AdminGuard from "../components/AdminGuard";
import AdminLayout from "../pages/admin/AdminLayout";

/* ================= ADMIN MODULES ================= */
import EventDashboard from "../pages/admin/EventDashboard";
import CadastrosHome from "../pages/admin/CadastrosHome";
import CadastrosTimes from "../pages/admin/CadastrosTimes";
import CadastrosEventos from "../pages/admin/CadastrosEventos";
import CadastrosFases from "../pages/admin/CadastrosFases";
import CadastrosRodadas from "../pages/admin/CadastrosRodadas";
import CadastroRounds from "../pages/admin/CadastrosRounds";
import CadastroParts from "../pages/admin/CadastrosParts";
import MapaPalpites from "../pages/admin/MapaPalpites";

/* ================= PUBLIC ROUTES ================= */
export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC APP (WITH SHELL) ================= */}
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/palpites" element={<Predictions />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventHome />} />
      </Route>

      {/* ================= ADMIN AUTH (SEPARATE LAYOUT) ================= */}
      <Route
        element={<AdminAuthLayout />}
      >
        <Route path="/admin-login" element={<AdminLogin />} />
      </Route>

      {/* ================= ADMIN PROTECTED AREA ================= */}
      <Route
        path="/admin/*"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        {/* DASHBOARD */}
        <Route index element={<Admin />} />

        {/* BASIC SECTIONS */}
        <Route path="resultados" element={<div>Resultados</div>} />
        <Route path="usuarios" element={<div>Usuários</div>} />
        <Route path="consultas" element={<div>Consultas</div>} />

        <Route path="palpites" element={<MapaPalpites />} />

        {/* CADASTROS */}
        <Route path="cadastros" element={<CadastrosHome />} />
        <Route path="cadastros/times" element={<CadastrosTimes />} />
        <Route path="cadastros/eventos" element={<CadastrosEventos />} />
        <Route path="cadastros/fases" element={<CadastrosFases />} />
        <Route path="cadastros/rodadas" element={<CadastrosRodadas />} />
        <Route path="cadastros/parts" element={<CadastroParts />} />

        {/* EVENT STRUCTURE */}
        <Route
          path="cadastros/eventos/:eventId/estrutura"
          element={<EventDashboard />}
        />

        <Route
          path="cadastros/eventos/:eventId/rounds"
          element={<CadastroRounds />}
        />

        {/* LEGACY ROUTE */}
        <Route
          path="cadastros/eventos/:eventId/parts"
          element={<CadastroParts />}
        />
      </Route>

    </Routes>
  );
}

/* ================= ADMIN AUTH LAYOUT ================= */
import { Outlet } from "react-router-dom";

function AdminAuthLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <Outlet />
    </div>
  );
}
