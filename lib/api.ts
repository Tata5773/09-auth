import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: Note["tag"];
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params,
  });

  return response.data;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
}
