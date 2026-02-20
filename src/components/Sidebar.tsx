'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Chapter {
  id: string;
  title: string;
}

export default function Sidebar({ chapters }: { chapters: Chapter[] }) {
  const params = useParams();
  const currentChapterNum = params.chapterNum;

  return (
    <aside className="w-64 h-screen sticky top-0 border-r dark:border-zinc-800 p-6 hidden md:block overflow-y-auto bg-gray-50 dark:bg-zinc-900">
      <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-500">Capítulos</h3>
      <ul className="space-y-4">
        {chapters.map((chapter, index) => {
          const chapterNum = (index + 1).toString();
          const isActive = currentChapterNum === chapterNum;

          return (
            <li key={chapter.id}>
              <Link
                href={`/story/${params.storyId}/chapter/${chapterNum}`}
                className={`block text-sm transition-colors ${
                  isActive 
                    ? 'text-black dark:text-white font-bold underline' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {index + 1}. {chapter.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}