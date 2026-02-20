'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Necesitarás instalar: npm install lucide-react

export default function ThemeToggle() {
// Inicializar desde localStorage para evitar setState en el efecto de montaje
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };
// ...existing code...
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-gray-300 transition-all"
      aria-label="Cambiar tema"
    >
      {darkMode ? (
        <Sun className="text-yellow-400 w-5 h-5" />
      ) : (
        <Moon className="text-gray-600 w-5 h-5" />
      )}
    </button>
  );
}