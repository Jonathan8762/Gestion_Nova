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
    <main className="min-h-screen max-w-2x5 mx-auto p-6 md:p-10 font-sans transition-colors duration-300 bg-white dark:bg-zinc-950">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Escribir Nueva Historia
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Define los cimientos de tu próxima gran obra.
        </p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Campo de Título */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Título de la obra
          </label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
            placeholder="Ej: El misterio del Reino caído"
          />
        </div>

        {/* Campo de Descripción */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Sinopsis / Descripción
          </label>
          <textarea 
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl h-40 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 resize-none"
            placeholder="¿De qué trata tu historia?"
          />
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col gap-4 pt-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl transition-all shadow-lg active:scale-[0.98] ${isSubmitting ? 'opacity-50' : 'hover:opacity-90'}`}
          >
            {isSubmitting ? 'Guardando...' : 'Crear Historia'}
          </button>

          <button 
            type="button"
            onClick={() => router.back()}
            className="w-full py-2 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
          >
            Cancelar y volver
          </button>
        </div>
      </form>
    </main>
  );
}