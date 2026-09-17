// app/libros/[id]/page.tsx
import Link from "next/link";
// Usamos la ruta relativa que ya verificamos que funciona
import BotonFavorito from "../../components/BotonFavorito";

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion: number;
  disponible: number; // Cambiado a number porque tu API devuelve 0 o 3
}

// ¡IMPORTANTE! En Next.js 15+, params es una Promesa
export default async function LibroDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Debemos hacer await a params para obtener el id
  const { id } = await params;

  let libro: Libro | null = null;
  let error = false;

  try {
    // Asegúrate de que esta URL sea la que te funcionó (127.0.0.1:8000 o api-biblioteca.test)
    const res = await fetch(`http://127.0.0.1:8000/api/libros/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Libro no encontrado");
    }

    libro = await res.json();
  } catch (err) {
    error = true;
  }

  if (error) {
    return (
      <main style={{ padding: "2rem" }}>
        <p style={{ color: "red" }}>
          No se pudo cargar el detalle del libro o el ID no existe.
        </p>
        <Link href="/libros" style={{ color: "#0070f3" }}>
          Volver al listado
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <Link
        href="/libros"
        style={{
          textDecoration: "none",
          color: "#0070f3",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        ← Volver al listado
      </Link>
      <h1>{libro!.titulo}</h1>
      <p>
        <strong>Autor:</strong> {libro!.autor}
      </p>
      <p>
        <strong>Año de publicación:</strong> {libro!.anio_publicacion}
      </p>
      <p>
        <strong>Disponible:</strong>
        <span
          style={{
            color: libro!.disponible > 0 ? "green" : "red",
            marginLeft: "0.5rem",
          }}
        >
          {libro!.disponible > 0 ? "Sí" : "No"}
        </span>
      </p>

      {/* Desafío Opcional A: Botón de favorito */}
      <BotonFavorito />
    </main>
  );
}
