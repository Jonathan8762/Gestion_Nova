import Link from 'next/link';

//(Simulando que vienen de una base de datos)
const STORY_DATA = {
  id: "1",
  title: "Crónicas del Código",
  chapters: [
    { id: "1", title: "El primer Bug", content: "Era una noche oscura y el compilador no dejaba de gritar..." },
    { id: "2", title: "La Gran Refactorización", content: "Borrar código es más satisfactorio que escribirlo, pensó el protagonista..." },
    { id: "3", title: "Despliegue Final", content: "El servidor aceptó la petición. Todo estaba en silencio por fin." }
  ]
};

export default function ChapterPage({ params }: { params: { storyId: string, chapterNum: string } }) {
  const currentChapterIdx = parseInt(params.chapterNum) - 1;
  const chapter = STORY_DATA.chapters[currentChapterIdx];
  const totalChapters = STORY_DATA.chapters.length;

  // Si el capítulo no existe
  if (!chapter) return <div className="p-10 text-center">Capítulo no encontrado.</div>;

  return (
    <main className="max-w-2xl mx-auto p-6 md:p-12 font-serif min-h-screen flex flex-col">
      {/* Header de navegación superior */}
      <nav className="mb-12 flex justify-between items-center text-sm text-gray-500 uppercase tracking-widest font-sans">
        <Link href="/" className="hover:text-black">← Inicio</Link>
        <span>Capítulo {params.chapterNum} de {totalChapters}</span>
      </nav>

      {/* Título y Contenido */}
      <article className="flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
          {chapter.title}
        </h1>
        
        <div className="text-xl leading-relaxed text-gray-800 space-y-6">
          {/* Aquí el contenido del capítulo */}
          <p>{chapter.content}</p>
        </div>
      </article>

      {/* Controles de Navegación Agile */}
      <footer className="mt-16 pt-8 border-t flex justify-between font-sans">
        {currentChapterIdx > 0 ? (
          <Link 
            href={`/story/${params.storyId}/chapter/${currentChapterIdx}`}
            className="px-6 py-2 border hover:bg-black hover:text-white transition-colors"
          >
            ← Anterior
          </Link>
        ) : <div />}

        {currentChapterIdx < totalChapters - 1 ? (
          <Link 
            href={`/story/${params.storyId}/chapter/${currentChapterIdx + 2}`}
            className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
          >
            Siguiente →
          </Link>
        ) : (
          <span className="text-gray-400 italic">Fin de la historia</span>
        )}
      </footer>
    </main>
  );
}