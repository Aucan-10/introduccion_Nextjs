// app/libros/page.tsx
import Link from "next/link";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion?: number;
  disponible?: number; // Cambiado a number
}

export default async function LibrosPage() {
  let libros: Libro[] = [];
  let error = false;

  try {
    const res = await fetch("http://127.0.0.1:8000/api/libros", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error en la respuesta de la API");
    }

    libros = await res.json();
  } catch (err) {
    error = true;
  }

  if (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "red", fontSize: "1.2rem" }}>
          No se pudieron cargar los libros. Intentá nuevamente más tarde.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Listado de Libros</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {libros.map((libro) => (
          <li
            key={libro.id}
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Link
              href={`/libros/${libro.id}`}
              style={{
                textDecoration: "none",
                color: "#0070f3",
                fontSize: "1.1rem",
              }}
            >
              <strong>{libro.titulo}</strong> - {libro.autor}
              {/* Desafío Opcional C: Mostrar si no está disponible (cuando es 0) */}
              {libro.disponible === 0 && (
                <span
                  style={{
                    color: "red",
                    marginLeft: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  (No disponible)
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
