import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { Story } from '@/lib/db';

async function getStories(): Promise<Story[]> {
  const filePath = path.join(process.cwd(), 'data', 'stories.json');
  if (!fs.existsSync(filePath)) return [];
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function Home() {
  const stories = await getStories();

  return (
    <main className="max-w-4x5 mx-auto p-10 font-serif dark:bg-zinc-900">
      <div className="flex justify-between items-center mb-12">
        <header>
          <h1 className="text-4xl font-light italic dark:text-white">Nova Historia</h1>
          <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest font-sans">Tu biblioteca personal</p>
        </header>
        <Link 
          href="/new-story" 
          className="bg-black dark:bg-white dark:text-black text-white px-5 py-2 rounded-full text-sm font-sans hover:bg-gray-800 transition-colors"
        >
          + Nueva Historia
        </Link>
      </div>
      
      {stories.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
          <p className="text-gray-400 font-sans">Aún no hay historias. ¡Empieza a escribir la tuya!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <Link href={`/story/${story.id}`} key={story.id}>
              <div className="group border dark:border-zinc-800 p-6 hover:border-black dark:hover:border-white transition-all cursor-pointer bg-white dark:bg-zinc-900 h-full flex flex-col justify-between shadow-sm">
                <div>
                  <h2 className="text-2xl font-semibold mb-2 group-hover:underline dark:text-white">{story.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 font-sans text-sm italic">
                    {story.description}
                  </p>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 font-sans mt-4">
                  <span>{story.chapters?.length || 0} capítulos</span>
                  <span className="text-black dark:text-white font-bold uppercase tracking-tighter">Leer ahora →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}