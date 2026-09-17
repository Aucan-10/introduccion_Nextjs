// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biblioteca Next.js",
  description: "Frontend para la API de Biblioteca",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
