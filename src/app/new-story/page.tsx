'use client'; // Este es necesario para usar formularios y estados en Next.js

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewStoryPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newStory = {
      id: Date.now().toString(), // Se generara un ID simple basado en el tiempo
      title,
      description,
      chapters: [] // Se empieza con la historia vacía
    };

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStory),
      });

      if (response.ok) {
        // Si se guarda, volvemos a la home para verla en la lista
        router.push('/');
        router.refresh(); // Refresca los datos de la home
      } else {
        alert("Hubo un error al guardar");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-4x5 mx-auto p-10 font-sans dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Escribir Nueva Historia</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Título de la obra</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="Ej: El misterio del servidor caído"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Sinopsis / Descripción</label>
          <textarea 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md h-32 focus:ring-2 focus:ring-black outline-none transition-all"
            placeholder="¿De qué trata tu historia?"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-3 bg-black text-white font-semibold rounded-md transition-opacity ${isSubmitting ? 'opacity-50' : 'hover:opacity-90'}`}
        >
          {isSubmitting ? 'Guardando...' : 'Crear Historia'}
        </button>

        <button 
          type="button"
          onClick={() => router.back()}
          className="w-full text-gray-500 text-sm hover:underline"
        >
          Cancelar
        </button>
      </form>
    </main>
  );
}