import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page: 1, search: "", perPage: 12 }],
    queryFn: () => fetchNotes({ page: 1, search: "", perPage: 12 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
