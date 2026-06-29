# TIC MVP Monorepo (Nest + React)

MVP base para sitio de agencia fotografica con enfoque brutalista.

## Stack

- Backend: NestJS (apps/api)
- Frontend: React + Vite (apps/web)
- Shared: tokens y tipos (packages/shared)
- Imagenes: base para Supabase Storage (placeholder)

## Estructura

- apps/api: API mock para health, services, projects, contact
- apps/web: sitio web MVP con layout, loader, formulario y animaciones base
- packages/shared: contrato compartido para tokens y tipos

## Requisitos

- Node.js 20+
- npm 10+

## Variables de entorno

Copia los archivos de ejemplo:

- .env.example
- apps/api/.env.example
- apps/web/.env.example

## Comandos (Windows PowerShell)

Instalar dependencias:

```bash
npm install
```

Levantar API y web en paralelo:

```bash
npm run dev
```

La consola imprime las URLs de arranque:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api
- Swagger: http://localhost:3000/frag-api-mailing

Levantar solo backend:

```bash
npm run dev:backend
```

Levantar solo frontend:

```bash
npm run dev:frontend
```

El frontend se sirve en http://localhost:5173.

El backend expone la API en http://localhost:3000/api y Swagger en http://localhost:3000/frag-api-mailing.

Compilar todo:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Tests de API:

```bash
npm run test
```

## Endpoints MVP

- GET /api/health
- GET /api/services
- GET /api/projects
- POST /api/contact

## Supabase (base)

- Backend usa SUPABASE_PUBLIC_BUCKET_URL para construir URLs publicas de imagen.
- Frontend incluye cliente de Supabase en src/lib/supabase.ts para integrar storage mas adelante.

## Nota de alcance

Este MVP prioriza estructura, consistencia visual y flujo funcional.
La integracion con Resend y zero-trust completo se agrega en el siguiente sprint.
