'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AddChapterPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Mensaje de éxito
  
  const router = useRouter();
  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // USAMOS storyId porque así se llama tu carpeta en /story/[storyId]
      const res = await fetch(`/api/stories/${params.storyId}/chapters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });

      if (res.ok) {
        setShowSuccess(true);
        
        // Esperamos 2 segundos para que vea el mensaje y redirigimos
        setTimeout(() => {
          router.push(`/story/${params.storyId}`); 
          router.refresh();
        }, 2000);
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Error en el fetch:", err);
      alert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-10 font-sans relative">
      {/* Mensaje de éxito tipo Toast */}
      {showSuccess && (
        <div className="fixed top-20 right-10 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ¡Capítulo guardado con éxito! ✨
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 dark:text-white">Escribir nuevo capítulo</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input 
          type="text" 
          placeholder="Título del capítulo..."
          className="w-full text-2xl font-bold p-4 bg-transparent border-b dark:border-zinc-800 outline-none dark:text-white focus:border-black dark:focus:border-white transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea 
          placeholder="Comienza tu historia aquí..."
          className="w-full h-96 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg outline-none dark:text-gray-200 font-serif text-lg border border-transparent focus:border-gray-200 dark:focus:border-zinc-700 transition-all"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-4">
          <button 
            type="submit" 
            disabled={loading || showSuccess}
            className="flex-1 bg-black dark:bg-white dark:text-black text-white py-4 rounded-lg font-bold hover:opacity-80 disabled:opacity-50 transition-all"
          >
            {loading ? 'Guardando...' : showSuccess ? '¡Listo!' : 'Publicar Capítulo'}
          </button>
          
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-6 py-4 text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}