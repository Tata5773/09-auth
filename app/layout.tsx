import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "A Next.js note management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <TanStackProvider>{children}</TanStackProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
