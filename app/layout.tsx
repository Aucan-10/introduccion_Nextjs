import type { Metadata } from 'next';
import './globals.css';
import { RegistroServiceWorker } from './components/RegistroServiceWorker';

export const metadata: Metadata = {
  title: 'Biblioteca App',
  description: 'Mi biblioteca personal',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
        {/* Aquí registramos el Service Worker */}
        <RegistroServiceWorker />
      </body>
    </html>
  );
}
