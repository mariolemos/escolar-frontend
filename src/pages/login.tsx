import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    } as any);

    if (res && (res as any).error) {
      setError((res as any).error || "Erro ao autenticar");
      return;
    }

    router.push("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
      <form onSubmit={handleSubmit} style={{ width: 360 }}>
        <h2>Login</h2>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <div style={{ marginBottom: 8 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
