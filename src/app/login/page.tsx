"use client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "null");

    if (!userData) {
      setError("No user data found. Please register.");
      router.push("/register");
      return;
    }

    if (new Date().getTime() > userData.expiry) {
      setError("User data expired. Please register again.");
      localStorage.removeItem("userData");
      router.push("/register");
      return;
    }

    if (
      (userData.username === identifier || userData.email === identifier) &&
      userData.password === password
    ) {
      router.push("/");
    } else {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="border p-2 mb-2 w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-64"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
    </div>
  );
}