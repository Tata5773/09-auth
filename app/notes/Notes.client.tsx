"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.client.module.css";

import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

type NotesClientProps = {
  tag?: NoteTag;
};

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const queryParams = useMemo(
    () => ({
      page,
      search: search.trim(),
      perPage: 12,
      tag,
    }),
    [page, search, tag],
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
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onChange={handleSearch} />
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading ? <p>Loading notes...</p> : null}
      {isError ? (
        <p>{error instanceof Error ? error.message : "Request failed"}</p>
      ) : null}
      {!isLoading && !isError && notes.length === 0 ? (
        <p>No notes found.</p>
      ) : null}

      {notes.length > 0 ? <NoteList notes={notes} /> : null}

      {totalPages > 1 ? (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      ) : null}

      {isFetching && !isLoading ? <p>Refreshing...</p> : null}

      {isModalOpen ? (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      ) : null}
    </div>
  );
}
