# Desarma2 — API (DE2-API) y Frontend

## Contribuidores
- FUENTES VILLANUEVA EDITH ALEJANDRA (documentación)
- CHIMAL ESCOBEDO AGUSTÍN (docuemntación)
- CONSUELO CERVANTES CESAR SERGIO (Backend)
- DUARTE DELGADO DAVID (Base de Datos)
- REYES ALCANTARÁ HERNÁN EDHERLO (Frontend)
- MARTINEZ ALONSO JOSHUA NATHANAEL (mocups)


## Mi participación en el proyecto
- Desarrollo de la API REST con Node.js y Express
- Diseño y manejo de la base de datos en MongoDB
- Integración del backend con el frontend

Proyecto full‑stack con API en Node/Express + MongoDB (DE2-API) y frontend en Next.js / Vite (desarma2).
Este repositorio contiene la API desarrollada por el autor de este repositorio y el cliente.

## Tecnologías
- Node.js, Express
- MongoDB / Mongoose
- express-validator, bcryptjs
- Swagger (swagger-jsdoc, swagger-ui-express)
- Frontend: Next.js (App Router) y/o Vite + React

## Variables de entorno importantes

### Backend
- `MONGO_URI` — cadena de conexión a MongoDB
- `PORT` — puerto donde corre la API (opcional)

### Frontend
- `NEXT_PUBLIC_API_URL` — URL base para el consumo de la API

## Instalación y ejecución (local)
1. API:
   - cd DE2-API
   - npm install
   - cp .env.example .env && editar `.env`
   - npm run dev || node server.js

2. Frontend:
   - cd desarma2
   - npm install
   - configurar `.env.local` con NEXT_PUBLIC_API_URL
   - npm run dev

## Documentación
- La API incluye documentación Swagger disponible en el servidor (ver configuración de Swagger en el proyecto).

