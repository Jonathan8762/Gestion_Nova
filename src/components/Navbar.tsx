import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { 
  BookOpen, 
} from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b dark:border-gray-800 bg-white dark:bg-zinc-950 px-6 py-4 flex justify-between items-center transition-colors">
      <BookOpen className="text-black dark:text-white" size={28} />
      <Link href="/" className="text-xl font-bold font-serif dark:text-white">
        Nova Historias
      </Link>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}