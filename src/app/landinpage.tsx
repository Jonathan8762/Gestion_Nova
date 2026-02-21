import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  ChevronRight, 
  Feather, 
  Database, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight,
  Github,
  Zap,
  Layout,
  Code
} from 'lucide-react';

type FeatureCardProps = {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl group">
    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
  </div>
);

const TechBadge = ({ name }: { name: string }) => (
  <span className="px-4 py-2 bg-gray-50 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-full text-sm font-semibold border border-gray-200 dark:border-zinc-700">
    {name}
  </span>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Simulador de cambio de tema para la preview
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-gray-100 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <BookOpen size={20} />
              </div>
              <span className="text-xl font-black tracking-tighter">NOVA HISTORIA</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#features" className="hover:text-blue-600 transition-colors">Características</a>
              <a href="#tech" className="hover:text-blue-600 transition-colors">Tecnología</a>
              <a href="#process" className="hover:text-blue-600 transition-colors">Proceso Agile</a>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-80 transition-all">
                Explorar App
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in">
              <Zap size={14} /> Next.js 15 & Agile Scrum
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              Donde tus historias <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">cobran vida.</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              La plataforma de lectura y escritura minimalista diseñada para autores modernos. Enfocada en la inmersión, el rendimiento y la simplicidad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group">
                Comenzar a escribir <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-gray-200 dark:border-zinc-800 rounded-2xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-2">
                Ver Demo <Smartphone size={20} />
              </button>
            </div>

            {/* Mockup Preview */}
            <div className="mt-24 relative max-w-5xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl opacity-50"></div>
              <div className="relative bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden aspect-video flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-gray-400">
                  <Layout size={64} className="opacity-20" />
                  <p className="text-sm font-medium uppercase tracking-widest">Vista Previa de la App</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50 dark:bg-zinc-900/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">Experiencia de Usuario Inmersiva</h2>
              <p className="text-gray-600 dark:text-gray-400">Diseñada por y para amantes de los libros.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={Feather} 
                title="Escritura Fluida" 
                description="Un editor limpio que permite organizar tus obras por capítulos sin distracciones técnicas." 
              />
              <FeatureCard 
                icon={Moon} 
                title="Modo Lectura Pro" 
                description="Adapta la interfaz con temas claros y oscuros, optimizados para largas sesiones de lectura." 
              />
              <FeatureCard 
                icon={Zap} 
                title="Progreso en Vivo" 
                description="Indicador visual de progreso que te permite saber exactamente cuánto te falta para terminar." 
              />
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="tech" className="py-24 px-6 border-y border-gray-100 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-6">Poderosa pero <br /> Increíblemente Ligera</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Utilizamos las últimas innovaciones en el ecosistema web para garantizar una velocidad de carga instantánea y una seguridad de datos robusta sin necesidad de bases de datos complejas.
              </p>
              <div className="flex flex-wrap gap-3">
                <TechBadge name="Next.js 15" />
                <TechBadge name="React 19" />
                <TechBadge name="Tailwind v4" />
                <TechBadge name="TypeScript" />
                <TechBadge name="JSON Storage" />
                <TechBadge name="Agile Scrum" />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="p-8 bg-blue-600 rounded-3xl text-white">
                <div className="mb-4"><Database size={32} /></div>
                <h4 className="text-xl font-bold mb-2">JSON DB</h4>
                <p className="text-sm text-blue-100 opacity-80">Persistencia local rápida y eficiente sin latencia de red.</p>
              </div>
              <div className="p-8 bg-zinc-900 dark:bg-white rounded-3xl text-white dark:text-black">
                <div className="mb-4"><Code size={32} /></div>
                <h4 className="text-xl font-bold mb-2">Next.js 15</h4>
                <p className="text-sm opacity-60">Manejo avanzado de parámetros asíncronos y Server Components.</p>
              </div>
              <div className="p-8 bg-zinc-100 dark:bg-zinc-800 rounded-3xl col-span-2 flex items-center gap-6">
                <div className="p-4 bg-white dark:bg-zinc-700 rounded-2xl shadow-sm"><ShieldCheck size={32} className="text-green-500" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Seguridad Agile</h4>
                  <p className="text-sm text-gray-500">Validación de tipos estricta y control de errores en cada Sprint.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10"><BookOpen size={200} /></div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">¿Listo para escribir <br /> tu próximo éxito?</h2>
            <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl relative z-10">
              Crear mi primera historia
            </button>
            <p className="mt-8 text-blue-100 font-medium opacity-80 relative z-10">Únete a la nueva era del storytelling digital.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-100 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded text-white"><BookOpen size={16} /></div>
              <span className="text-lg font-black tracking-tighter">NOVA HISTORIA</span>
            </div>
            <p className="text-sm text-gray-500">© 2025 Nova Historia Project. Desarrollado bajo metodología Agile Scrum.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-sm font-bold text-blue-600 hover:underline">Documentación Técnica</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}