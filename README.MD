# Findoor

Portal inmobiliario simplificado para publicar y buscar propiedades en venta y alquiler.

## Stack
- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL
- **Frontend:** React, TypeScript, Tailwind CSS
- **Auth:** JWT con access + refresh tokens, rotación de refresh tokens, httpOnly cookies, logout local y global
- **Storage:** Cloudinary (fotos)
- **Email:** Resend
- **Seguridad:** Helmet, CORS, Rate limiting (global y en auth)
- **Deploy:** Railway (backend + DB) / Vercel (frontend)

## Arquitectura
Backend estructurado con Clean Architecture (Domain → Use Cases → Infrastructure → Presentation).
Separación estricta entre datasources, repositories y use cases con inyección de dependencias.

## Setup local
1. Clonar el repo
2. Copiar `.env.template` a `.env` y completar las variables
3. `docker-compose up -d` (levanta PostgreSQL)
4. `npm run migrate`
5. `npm run dev`

## Funcionalidades

### Auth
- Registro e inicio de sesión con JWT
- Cambio de contraseña autenticado
- Logout local (invalida el token actual) y global (invalida todos los tokens del usuario)

### Propiedades
- Feed público con paginación y filtros (precio, ciudad, tipo, operación, ambientes, superficie, cocheras)
- Publicar propiedad con fotos, descripción, precio y ubicación
- Tipos: Casa, Departamento
- Operaciones: Venta, Alquiler
- Ver detalle de propiedad

### Seekers
- Guardar y quitar propiedades de favoritos (toggle)
- Contactar al Owner mediante un mensaje

### Panel del Owner
- Un usuario se convierte en Owner al publicar su primera propiedad
- Ver y administrar sus propiedades (activar/desactivar/editar/eliminar)
- Subir y eliminar fotos de sus propiedades
- Ver ContactLeads recibidos (leídos / no leídos)

## Fuera de scope (v2)
- Mapa interactivo con búsqueda por radio geográfico
- Chat en tiempo real entre Seeker y Owner
- Sistema de reviews
- Planes pagos / destacados