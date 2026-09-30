import axios from "axios";
import type { NewNote, Note } from "../types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
  page: number;
}

axios.defaults.baseURL = `https://notehub-public.goit.study/api`

export const fetchNotes = async (searchText: string, page: number, perPage: number) => {
    const response = await axios.get<NoteResponse>("/notes", {
        params: {
          search: searchText,
          page,
          perPage: perPage
        },

    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async(newNote: NewNote) => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}

export const deleteNote = async (noteId: string) => {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};
