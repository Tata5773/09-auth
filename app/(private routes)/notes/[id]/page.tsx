import type { Metadata } from "next";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";

const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";
const SITE_URL = "https://notehub.com";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  const title = `${note.title} - NoteHub`;
  const description = note.content;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/notes/${id}`,
      images: [{ url: OG_IMAGE }],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
