import { cookies } from "next/headers";
import type { AxiosResponse } from "axios";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { api } from "./api";
import type { FetchNotesParams, FetchNotesResponse } from "./types";

async function getCookieHeader() {
  const cookiesStore = await cookies();
  return cookiesStore.toString();
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResponse> {
  const response: AxiosResponse<FetchNotesResponse> = await api.get("/notes", {
    params: {
      ...params,
      perPage: 12,
    },
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
}

export async function getMe(): Promise<User> {
  const response: AxiosResponse<User> = await api.get("/users/me", {
    headers: {
      Cookie: await getCookieHeader(),
    },
  });

  return response.data;
}

export async function checkSession(
  cookieHeader?: string,
): Promise<AxiosResponse<{ success: boolean }>> {
  return api.get("/auth/session", {
    headers: {
      Cookie: cookieHeader ?? (await getCookieHeader()),
    },
  });
}
