import fs from 'fs';
import path from 'path';

// Definimos la estructura completa de la historia, incluyendo capítulos
export interface Chapter {
  id: string;
  title: string;
  content: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
}

const filePath = path.join(process.cwd(), 'data', 'stories.json');

export function getStoryById(id: string): Story | undefined {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const stories: Story[] = JSON.parse(jsonData);
    return stories.find((s) => s.id === id);
  } catch (error) {
    console.error("Error leyendo la base de datos:", error);
    return undefined;
  }
}

export function saveStory(newStory: Story): boolean {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const stories: Story[] = JSON.parse(jsonData);
    
    // Añadimos la nueva historia al array
    stories.push(newStory);
    
    // Guardamos de vuelta al archivo JSON
    fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error guardando en la DB:", error);
    return false;
  }
}