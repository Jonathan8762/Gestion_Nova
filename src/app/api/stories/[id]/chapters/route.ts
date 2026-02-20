import { NextResponse } from 'next/server';
import { addChapterToStory } from '@/lib/db';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json();
    const storyId = params.id;

    const newChapter = {
      id: Date.now().toString(),
      title,
      content,
    };

    const success = addChapterToStory(storyId, newChapter);

    if (success) {
      return NextResponse.json({ message: "Capítulo añadido" }, { status: 201 });
    }
    return NextResponse.json({ error: "Historia no encontrada" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}