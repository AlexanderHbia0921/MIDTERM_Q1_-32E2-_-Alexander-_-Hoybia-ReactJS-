// src/apiclient.js
const API_BASE = import.meta.env.VITE_API_BASE || "https://localhost:5001";
const RES_API_BASE = import.meta.env.VITE_RES_API_BASE;

export async function login({ userName, password }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST", // 1. Method
    headers: { "Content-Type": "application/json" }, // 2. Header
    body: JSON.stringify({ userName, password }), // 3. Body
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  return { token: data.token };
}

export async function fetchRecipes(auth) {
  const res = await fetch(`${RES_API_BASE}/api/recipes`, {
    // GET is default
    headers: {
      Authorization: `Bearer ${auth.token}`, // The VIP Pass
    },
  });

  if (!res.ok) throw new Error("Failed to load recipes");

  return res.json();
}

// eslint-disable-next-line no-unused-vars
export async function logout(auth) {
  // Client-side only logout (forget tokens)
  return;
}
