import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
const SITE_URL = "https://notehub.com";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A Next.js note management app",
  openGraph: {
    title: "NoteHub",
    description: "A Next.js note management app",
    url: SITE_URL,
    images: [{ url: OG_IMAGE }],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
