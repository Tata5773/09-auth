import type { Metadata } from "next";
import css from "./not-found.module.css";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
const SITE_URL = "https://notehub.com";

export const metadata: Metadata = {
  title: "Page not found - NoteHub",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
    title: "Page not found - NoteHub",
    description: "Sorry, the page you are looking for does not exist.",
    url: `${SITE_URL}/not-found`,
    images: [{ url: OG_IMAGE }],
  },
};

export default function NotFound() {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
