import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const { data, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError || !data?.user) {
      setError("Credenciais inválidas");
      return;
    }

    const { data: profile } = await supabase
      .from("users")
      .select("role, user_name")
      .eq("auth_id", data.user.id)
      .single();

    if (!profile || profile.role !== "admin") {
      setError("Acesso negado");
      return;
    }

    localStorage.setItem(
      "session_user",
      JSON.stringify({
        user_id: data.user.id,
        role: profile.role,
        user_name: profile.user_name,
      })
    );

    navigate("/");
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h2 style={{ marginBottom: 10 }}>
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 12 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12 }}
        />

        <button
          onClick={handleLogin}
          style={{ padding: 12 }}
        >
          Entrar
        </button>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
