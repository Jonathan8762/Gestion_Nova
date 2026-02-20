import Link from 'next/link';
import { getStoryById } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function ChapterPage({ params }: { params: { storyId: string, chapterNum: string } }) {
  // 1. Llamamos a nuestra "DB" real usando el ID de la URL
  const story = await getStoryById(params.storyId);
  
  // Si la historia no existe en el JSON, mandamos al 404
  if (!story) {
    notFound();
  }

  const currentChapterIdx = parseInt(params.chapterNum) - 1;
  const chapter = story.chapters[currentChapterIdx];
  const totalChapters = story.chapters.length;

  // Si el número de capítulo no existe en esa historia
  if (!chapter) {
    return (
      <div className="p-20 text-center font-sans">
        <h2 className="text-2xl font-bold">Capítulo no encontrado</h2>
        <Link href={`/story/${params.storyId}`} className="text-blue-500 underline mt-4 block">
          Volver al índice de la historia
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      
      {/* --- SIDEBAR DINÁMICO --- */}
      <aside className="w-full md:w-72 bg-gray-50 dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 p-6 font-sans overflow-y-auto max-h-screen sticky top-0">
        <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-6 uppercase text-xs tracking-widest opacity-50">
          {story.title}
        </h2>
        <nav className="space-y-2">
          {story.chapters.map((ch, index) => {
            const isCurrent = currentChapterIdx === index;
            return (
              <Link 
                key={ch.id}
                href={`/story/${story.id}/chapter/${index + 1}`}
                className={`block text-sm p-3 rounded-lg transition-all ${
                  isCurrent 
                    ? "bg-black text-white dark:bg-white dark:text-black font-medium shadow-md" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="opacity-50 mr-2">{index + 1}.</span> {ch.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* --- CONTENIDO DE LECTURA --- */}
      <main className="flex-1 max-w-3xl mx-auto p-6 md:p-12 font-serif flex flex-col dark:text-gray-200">
        {/* Nav Superior */}
        <nav className="mb-12 flex justify-between items-center text-sm text-gray-500 uppercase tracking-widest font-sans">
          <Link href={`/story/${params.storyId}`} className="hover:text-black dark:hover:text-white font-bold transition-colors">
            ← Índice
          </Link>
          <span className="bg-gray-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-xs">
            {currentChapterIdx + 1} de {totalChapters}
          </span>
        </nav>

        <article className="flex-grow">
          <header className="mb-10">
            <span className="text-blue-600 dark:text-blue-400 font-sans text-sm font-black tracking-widest uppercase">
              Capítulo {params.chapterNum}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">
              {chapter.title}
            </h1>
          </header>
          
          {/* Renderizado de contenido con espaciado optimizado para lectura */}
          <div className="text-xl leading-relaxed space-y-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
            {chapter.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>

        {/* Footer de Navegación */}
        <footer className="mt-20 pt-8 border-t dark:border-zinc-800 flex justify-between font-sans items-center">
          {currentChapterIdx > 0 ? (
            <Link 
              href={`/story/${params.storyId}/chapter/${currentChapterIdx}`}
              className="px-8 py-3 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all rounded-md"
            >
              Anterior
            </Link>
          ) : <div />}

          {currentChapterIdx < totalChapters - 1 ? (
            <Link 
              href={`/story/${params.storyId}/chapter/${currentChapterIdx + 2}`}
              className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all rounded-md font-bold"
            >
              Siguiente
            </Link>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-400 italic mb-2">Has terminado la lectura</p>
              <Link href="/" className="text-sm font-bold underline">Volver al inicio</Link>
            </div>
          )}
        </footer>
      </main>
    </div>
  );
}