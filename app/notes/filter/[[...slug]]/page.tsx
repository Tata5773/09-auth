import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "../../Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function FilterNotesPage({ params }: Props) {
  const { slug } = await params;

  const selectedTag = slug?.[0];
  const tag =
    selectedTag === "all" ? undefined : (selectedTag as NoteTag | undefined);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", perPage: 12, tag }],
    queryFn: () => fetchNotes({ page: 1, search: "", perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "all"} tag={tag} />
    </HydrationBoundary>
  );
}
