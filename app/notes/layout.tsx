import type { ReactNode } from "react";

type NoteLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function NotesLayout({ children, modal }: NoteLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
