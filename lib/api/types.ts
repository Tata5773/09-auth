import type { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
  perPage?: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

export interface AuthCreadentials {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
}
