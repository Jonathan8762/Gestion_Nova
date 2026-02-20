import { NextResponse } from 'next/server';
import { addChapterToStory } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    
    const { title, content } = await request.json();
    
    console.log("-----------------------------------------");
    console.log("ID recuperado correctamente:", id);
    
    const newChapter = {
      id: Date.now().toString(),
      title,
      content,
    };

    const success = addChapterToStory(id, newChapter);

    if (success) {
      return NextResponse.json({ message: "Capítulo añadido" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Historia no encontrada" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}