export interface Chapter {
  id: string;
  title: string;
  content: string; // Aquí irá el texto largo
  order: number;   // Para saber si es el Cap 1, 2, etc.
}

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage?: string; // Opcional para el toque minimalista
  chapters: Chapter[];
}