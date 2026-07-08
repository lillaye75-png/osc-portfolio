"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions/auth";

export default function AuthPage() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>OSC Admin</h1>
        <p style={styles.subtitle}>Sign in to manage your portfolio</p>
        <form action={formAction} style={styles.form}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            style={styles.input}
          />
          {state?.error && <p style={styles.error}>{state.error}</p>}
          <button type="submit" disabled={pending} style={styles.button}>
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    margin: "0 0 4px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    margin: "0 0 24px",
    fontSize: "14px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "15px",
    outline: "none",
  },
  button: {
    padding: "12px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  error: {
    color: "#e00",
    fontSize: "14px",
    margin: "0",
  },
};
