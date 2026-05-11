import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";

const title = "Create note - NoteHub";
const description = "Create a new note in NoteHub.";
const SITE_URL = "https://notehub.com";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
const url = `${SITE_URL}/notes/action/create`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url,
    images: [{ url: OG_IMAGE }],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
