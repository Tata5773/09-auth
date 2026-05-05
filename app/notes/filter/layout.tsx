import type { ReactNode } from "react";
import css from "./layout.module.css";

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <main className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <section className={css.notes}>{children}</section>
    </main>
  );
}
