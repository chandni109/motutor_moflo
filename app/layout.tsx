import type { Metadata } from 'next';
import './globals.css';
import { MoTutorProvider } from '../context/MoTutorContext';

export const metadata: Metadata = {
  title: 'MoTutor',
  description: 'MoTutor - lesson planning app inside MoFlo Cloud',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <MoTutorProvider>{children}</MoTutorProvider>
      </body>
    </html>
  );
}
