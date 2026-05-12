import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { api } from "./api";
import type {
  CreateNotePayload,
  FetchNotesParams,
  FetchNotesResponse,
  UpdateUserPayload,
} from "./types";

interface AuthCredentials {
  email: string;
  password: string;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      ...params,
      perPage: 12,
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
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

export async function register(credentials: AuthCredentials): Promise<User> {
  const response: AxiosResponse<User> = await api.post(
    "/auth/register",
    credentials,
  );
  return response.data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const response: AxiosResponse<User> = await api.post(
    "/auth/login",
    credentials,
  );
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<{ success: boolean }> {
  const response: AxiosResponse<{ success: boolean }> =
    await api.get("/auth/session");

  return response.data;
}

export async function getMe(): Promise<User> {
  const response: AxiosResponse<User> = await api.get("/users/me");

  return response.data;
}

export async function updateMe(payload: UpdateUserPayload): Promise<User> {
  const response: AxiosResponse<User> = await api.patch("/users/me", payload);

  return response.data;
}

export type {
  AuthCredentials,
  CreateNotePayload,
  FetchNotesParams,
  FetchNotesResponse,
  UpdateUserPayload,
};
