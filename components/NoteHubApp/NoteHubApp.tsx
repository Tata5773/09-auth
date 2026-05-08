"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "./NoteHubApp.module.css";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/noteService";

export default function NoteHubApp() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const queryParams = useMemo(
    () => ({
      page,
      search: search.trim(),
      perPage: 12,
    }),
    [page, search],
  );

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["notes", queryParams],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setInputValue(value);
    updateSearch(value);
  };

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearch} />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading ? <p className={css.message}>Loading notes...</p> : null}
      {isError ? (
        <p className={css.message}>
          {error instanceof Error ? error.message : "Request failed"}
        </p>
      ) : null}
      {!isLoading && !isError && notes.length === 0 ? (
        <p className={css.message}>No notes found.</p>
      ) : null}

      {notes.length > 0 ? <NoteList notes={notes} /> : null}

      {totalPages > 1 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : null}

      {isFetching && !isLoading ? (
        <p className={css.message}>Refreshing...</p>
      ) : null}
    </main>
  );
}
