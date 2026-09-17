// app/components/BotonFavorito.tsx
"use client"; // ¡Obligatorio para usar useState y eventos!

import { useState } from "react";

export default function BotonFavorito() {
  const [esFavorito, setEsFavorito] = useState(false);

  return (
    <button
      onClick={() => setEsFavorito(!esFavorito)}
      style={{
        padding: "0.5rem 1rem",
        cursor: "pointer",
        backgroundColor: esFavorito ? "#facc15" : "#e5e7eb",
        border: "none",
        borderRadius: "5px",
        fontWeight: "bold",
        marginTop: "1rem",
      }}
    >
      {esFavorito ? "★ Favorito" : "☆ Marcar como favorito"}
    </button>
  );
}
