import type { Metadata } from "next";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const selectedTag = slug[0];

  const title =
    selectedTag === "all"
      ? "All notes - NoteHub"
      : `${selectedTag} notes - NoteHub`;

  const description =
    selectedTag === "all"
      ? "Browse all personal notes in NoteHub."
      : `Browse notes tagged with ${selectedTag} in NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/app/notes/filter/${selectedTag}`,
      images: [OG_IMAGE],
    },
  };
}

export default async function FilterNotesPage({ params }: Props) {
  const { slug } = await params;

  const selectedTag = slug[0];
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
