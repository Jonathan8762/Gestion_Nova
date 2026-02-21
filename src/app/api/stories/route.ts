import { NextResponse } from 'next/server';
import { saveStory } from '@/lib/db';
import { Story } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body: Story = await request.json();

    // Validación básica Agile
    if (!body.title || !body.id) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const success = saveStory(body);

    if (success) {
      return NextResponse.json({ message: "Historia guardada con éxito" }, { status: 201 });
    } else {
      return NextResponse.json({ error: "Error al escribir en disco" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}