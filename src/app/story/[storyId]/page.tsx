import Link from 'next/link';
import { getStoryById } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function StoryDetailPage({ params }: { params: Promise<{ storyId: string }> }) {
  // En Next.js 15, params es una promesa que debemos esperar
  const { storyId } = await params; 
  const story = await getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-16 font-serif">
      {/* Botón Volver */}
      <Link href="/" className="text-sm font-sans text-gray-500 hover:text-black dark:hover:text-white mb-8 block transition-colors">
        ← Volver a la biblioteca
      </Link>

      <section className="border-b dark:border-zinc-800 pb-12">
        <h1 className="text-5xl font-bold mb-6 dark:text-white leading-tight">
          {story.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed italic">
          {story.description}
        </p>
        
        <div className="mt-8 flex gap-4 font-sans">
          {/* Solo mostramos "Comenzar a leer" si hay al menos un capítulo */}
          {story.chapters && story.chapters.length > 0 && (
            <Link 
              href={`/story/${storyId}/chapter/1`}
              className="bg-black dark:bg-white dark:text-black text-white px-8 py-3 rounded-md font-bold hover:opacity-90 transition-all shadow-lg active:scale-95"
            >
              Comenzar a leer
            </Link>
          )}
          
          <Link 
            href={`/story/${storyId}/add-chapter`}
            className="border border-gray-300 dark:border-zinc-700 dark:text-white px-8 py-3 rounded-md font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all active:scale-95"
          >
            + Añadir Capítulo
          </Link>
        </div>
      </section>

      {/* Índice de Capítulos */}
      <section className="mt-12 font-sans">
        <h2 className="text-2xl font-bold mb-6 dark:text-white uppercase tracking-widest text-sm text-gray-500">
          Índice de Capítulos
        </h2>
        
        {!story.chapters || story.chapters.length === 0 ? (
          <div className="p-10 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-xl text-center">
             <p className="text-gray-400 italic">Esta historia aún no tiene capítulos...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {story.chapters.map((chapter, index) => (
              <Link 
                key={chapter.id} 
                href={`/story/${storyId}/chapter/${index + 1}`}
                className="flex justify-between items-center p-4 border dark:border-zinc-800 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-200 dark:text-zinc-800 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-medium dark:text-gray-200">
                    {chapter.title}
                  </span>
                </div>
                <span className="text-gray-400 text-sm group-hover:text-black dark:group-hover:text-white transition-colors">
                  Leer →
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}