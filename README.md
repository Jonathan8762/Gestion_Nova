# 📖 Nova Historia - Biblioteca Digital Personal

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Agile Methodology](https://img.shields.io/badge/Methodology-Agile%20Scrum-blueviolet?style=for-the-badge)](https://en.wikipedia.org/wiki/Scrum_(software_development))

**Nova Historia** es una plataforma minimalista diseñada para escritores y lectores que buscan una experiencia de biblioteca personal limpia y eficiente. Este proyecto ha sido desarrollado bajo un marco de trabajo **Agile**, priorizando la entrega de valor continua y la iteración rápida.

---

## 🎯 Visión del Producto
Proporcionar una herramienta de lectura y escritura digital que elimine las distracciones, permitiendo a los autores organizar sus obras por capítulos y a los lectores disfrutar de una interfaz adaptable (Modo Oscuro) con seguimiento de progreso en tiempo real.

---

## 🛠 Metodología de Desarrollo: Agile Scrum

Este proyecto se gestiona mediante ciclos iterativos para asegurar la calidad y adaptabilidad del código.

### 👥 User Stories (Historias de Usuario)
Como usuario de Nova Historia, quiero:
1. **Crear una Obra:** Registrar el título y sinopsis de mi nueva historia.
2. **Escribir por Capítulos:** Añadir contenido de forma organizada a mis obras existentes.
3. **Lectura Inmersiva:** Leer en un entorno limpio con barra de progreso y navegación lateral.
4. **Modo Noche:** Cambiar la apariencia visual para proteger mi vista durante lecturas nocturnas.

### 📋 Product Backlog
- [x] **Sprint 1: Cimientos & Persistencia** (Estructura de datos JSON, API de historias).
- [x] **Sprint 2: Core de Lectura** (Sidebar dinámico, navegación entre capítulos).
- [x] **Sprint 3: Experiencia de Usuario (UX)** (Modo Oscuro, Reading Progress Bar).
- [ ] **Sprint 4 (In Progress): Editor Avanzado** (Soporte para Markdown).
- [ ] **Sprint 5 (Backlog): Gamificación** (Contador de palabras y tiempo de lectura).

---

## 🏗 Arquitectura del Sistema

El proyecto utiliza una arquitectura basada en **Next.js App Router** con persistencia en sistema de archivos local para mayor velocidad en entornos de desarrollo personal.



### Stack Tecnológico
- **Frontend:** React 19, Tailwind CSS (UI/UX).
- **Backend:** Next.js 15 API Routes (Serverless ready).
- **Storage:** JSON File System (Database-less architecture).
- **Language:** TypeScript para robustez del código.

---

## 🚀 Instalación y Uso

Para desplegar este proyecto localmente y comenzar tu Sprint 0:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/nova-historia.git](https://github.com/tu-usuario/nova-historia.git)