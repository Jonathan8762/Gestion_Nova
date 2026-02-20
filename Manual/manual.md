# 📘 Manual Técnico y Guía de Usuario: Nova Historia

Versión: 1.0.0

Metodología: Agile Scrum (Iterative Lifecycle)

Tecnología Base: Next.js 15, TypeScript, Tailwind CSS v4

## 1. Introducción y Visión Agile

Nova Historia es una Single Page Application (SPA) evolucionada hacia una arquitectura de Server Components. El objetivo es proporcionar un entorno de lectura de alta fidelidad con persistencia de datos local, optimizado mediante ciclos de Sprint para garantizar un código escalable y limpio.

## 2. Arquitectura del Sistema (Sprint 1: Cimientos)

/nova-historia
├── /data                # Almacenamiento persistente
│   └── stories.json     # Base de datos local (NoSQL - JSON)
├── /src
│   ├── /app             # Rutas y Vistas (App Router)
│   │   ├── /api         # Capa de Servicios Backend
│   │   │   └── /stories
│   │   │       ├── route.ts              # POST - Crear historia
│   │   │       └── /[id]/chapters/route.ts # POST - Añadir capítulo
│   │   ├── /story       # Rutas Dinámicas de Lectura
│   │   │   └── /[storyId]
│   │   │       ├── /chapter/[chapterNum]
│   │   │       │   └── page.tsx          # Vista de lectura inmersiva
│   │   │       ├── /add-chapter
│   │   │       │   └── page.tsx          # Formulario de autoría
│   │   │       └── page.tsx              # Portada/Índice de historia
│   │   ├── /new-story   # Registro de obras
│   │   │   └── page.tsx
│   │   ├── layout.tsx   # Estructura global (Navbar & Theme)
│   │   ├── page.tsx     # Catálogo principal (Home)
│   │   └── globals.css  # Configuración Tailwind
│   ├── /components      # Módulos de Interfaz Reutilizables
│   │   ├── Navbar.tsx
│   │   ├── ReadingProgress.tsx
│   │   ├── Sidebar.tsx
│   │   └── ThemeToggle.tsx
│   └── /lib             # Utilidades de Lógica de Negocio
│       └── db.ts        # Motor de manipulación del JSON
├── package.json         # Gestión de dependencias
├── tsconfig.json        # Configuración de tipado estricto
├── postcss.config.mjs
├── package-lock.json
├── next.config.ts
└── eslint.config.mjs

### 2.1. Persistencia de Datos (Data Layer)

El sistema utiliza un motor de persistencia basado en File System (fs) sobre archivos JSON.

Path: /data/stories.json

Lógica: Implementación de funciones en src/lib/db.ts que garantizan la integridad de los datos mediante validaciones de tipo y normalización de identificadores (IDs).

Control de Concurrencia: Uso de operaciones síncronas de lectura/escritura para prevenir condiciones de carrera en entornos de desarrollo local.

### 2.2. API RESTful (Service Layer)

Se han desplegado endpoints dinámicos bajo el estándar de Next.js Route Handlers:

POST /api/stories: Registro de nuevas entidades de historia.

POST /api/stories/[id]/chapters: Inyección de sub-recursos (capítulos) mediante el método de desestructuración de promesas de parámetros.

## 3. Módulos del Software (Sprint 2: Gestión de Contenido)

### 3.1. Módulo de Creación de Historias

Permite la instanciación de nuevos objetos Story.

Validación Técnica: Se asegura la inicialización del array chapters: [] para evitar errores de puntero nulo (null pointer) en fases posteriores de lectura.

Generación de ID: Basada en Timestamps de alta precisión convertidos a String para compatibilidad universal.

### 3.2. Módulo de Gestión de Capítulos

Ubicado en la ruta /story/[storyId]/add-chapter.

Pipeline de Datos: El frontend captura la entrada, la sanitiza y la envía a la API, la cual realiza un unwrap de los params (necesario en Next.js 15) antes de proceder a la actualización del registro en el JSON.

## 4. Interfaz de Usuario y UX (Sprint 3: Experiencia Inmersiva)

### 4.1. Modo Oscuro (Theming Dinámico)

Implementado mediante Tailwind CSS v4 y una estrategia de clases en el elemento raíz (html).

Persistencia del Tema: Uso de localStorage para el almacenamiento de preferencias de usuario, mitigando el efecto de parpadeo (FOUC) mediante una inicialización temprana del estado.

Toggle de Clase: Inyección/Remoción de la clase .dark mediante un componente de cliente React.

### 4.2. Visualizador de Lectura (Reading View)

Barra de Progreso: Componente ReadingProgress que calcula el diferencial entre scrollY y el scrollHeight del documento en tiempo real.

Sidebar de Navegación: Generado dinámicamente a partir del índice del array de capítulos, permitiendo saltos directos entre nodos de lectura.

Tipografía y Legibilidad: Implementación de clases de espaciado optimizado y first-letter (capitulares) para mejorar la ergonomía visual.

## 5. Guía de Operación (User Flow)

Paso 1: Inicialización de la Biblioteca

Desde el dashboard principal (Home), el usuario puede visualizar todas las obras persistidas. Si la colección es nula, el sistema activa un Empty State con feedback visual.

Paso 2: Configuración de la Obra

Al seleccionar "+ Nueva Historia", se accede al formulario de metadatos. Es mandatorio completar el Título y la Sinopsis para habilitar el botón de envío.

Paso 3: Pipeline de Publicación

Dentro de la página de detalle de una historia, el usuario selecciona "+ Añadir Capítulo". Tras la publicación, el sistema emite una notificación (Toast) y redirige automáticamente al índice actualizado de la obra.

Paso 4: Experiencia de Lectura

Al ejecutar "Comenzar a leer", el software despliega la interfaz de lectura dividida. El usuario puede alternar entre el modo claro/oscuro en cualquier momento sin perder su posición de scroll o progreso actual.

## 6. Mantenimiento y Mejora Continua (Sprint 4: Backlog)

Para futuras iteraciones, se han identificado las siguientes oportunidades de mejora:

Refactorización a Markdown: Migrar el renderizado de texto plano a react-markdown para soportar enriquecimiento visual.

Optimización de Búsqueda: Implementar un algoritmo de filtrado en cliente para la búsqueda de historias por metadatos.

Internacionalización (i18n): Preparar el sistema para múltiples idiomas mediante diccionarios de traducción.

Manual generado bajo estándares de ingeniería de software para el proyecto Nova Historia.