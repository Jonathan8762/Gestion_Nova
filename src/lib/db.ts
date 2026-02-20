import fs from 'fs';
import path from 'path';

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

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'stories.json');

// Función interna para asegurar que la carpeta y el archivo existan
function ensureFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8');
  }
}

export function getStoryById(id: string): Story | undefined {
  try {
    ensureFile();
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const stories: Story[] = JSON.parse(jsonData || '[]');
    // Forzamos comparación de strings por si acaso
    return stories.find((s) => String(s.id) === String(id));
  } catch (error) {
    console.error("Error leyendo la base de datos:", error);
    return undefined;
  }
}

export function saveStory(newStory: Story): boolean {
  try {
    ensureFile();
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const stories: Story[] = JSON.parse(jsonData || '[]');
    
    stories.push(newStory);
    
    fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error guardando historia:", error);
    return false;
  }
}

export function addChapterToStory(storyId: string, chapter: Chapter): boolean {
  try {
    ensureFile();
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const stories: Story[] = JSON.parse(jsonData || '[]');
    
    const index = stories.findIndex(s => String(s.id) === String(storyId));
    
    if (index === -1) {
      console.error(`Historia con ID ${storyId} no encontrada.`);
      return false;
    }

    // Aseguramos que 'chapters' sea un array (por si historias viejas no lo tienen)
    if (!stories[index].chapters) {
      stories[index].chapters = [];
    }

    stories[index].chapters.push(chapter);
    
    fs.writeFileSync(filePath, JSON.stringify(stories, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Error al añadir capítulo:", error);
    return false;
  }
}