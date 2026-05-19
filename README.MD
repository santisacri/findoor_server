# Findoor

Portal inmobiliario simplificado para publicar y buscar propiedades en venta y alquiler.

## Stack
- **Backend:** Node.js, TypeScript, Express, Prisma, PostgreSQL
- **Frontend:** React, TypeScript, Tailwind CSS
- **Auth:** JWT con access + refresh tokens, rotación de refresh tokens, httpOnly cookies, logout local(por family) y global(por userId)
- **Storage:** Cloudinary (fotos)
- **Email:** Nodemailer + Gmail
- **Deploy:** Railway (backend + db) / Vercel (frontend)

## Arquitectura
Backend estructurado con Clean Architecture (Domain → Use Cases → Infrastructure → Presentation).
Separación estricta entre datasources, repositories y use cases con inyección de dependencias.

## Funcionalidades
- Users pueden ver y publicar propiedades
- Users pueden filtrar por: precio, lugar, tipo de propiedad y tipo de operacion
- Todos los Users por defecto son Seekers, se vuelven Owners cuando tienen propiedades en venta
- Para poder publicar o contactar a un Owner deben estar registrados
- Auth para proteccion de rutas
- Los Owners pueden subir fotos de su propiedad
- Los Owners tienen un panel basico donde pueden ver ContactLeads, visitas y administrar sus propiedades

## Setup local
1. Clonar el repo
2. Copiar `.env.template` a `.env` y completar las variables
3. `docker-compose up -d` (levanta PostgreSQL)
4. `npm run migrate`
5. `npm run dev`

### Usuarios
- Registro e inicio de sesión con JWT
- Todo usuario es Seeker por defecto
- Un usuario se convierte en Owner al publicar su primera propiedad

### Propiedades
- Publicar propiedad con fotos, descripción, precio y ubicación
- Tipos: Casa, Departamento
- Operaciones: Venta, Alquiler
- Filtros: precio, ubicación, tipo de propiedad, tipo de operación
- Ver detalle de propiedad

### Seekers
- Guardar propiedades en favoritos
- Contactar al Owner mediante un mensaje

### Panel del Owner
- Ver y administrar sus propiedades (activar/desactivar/editar)
- Ver ContactLeads recibidos (leídos / no leídos)

## Fuera de scope (v2)
- Mapa interactivo
- Chat en tiempo real
- Sistema de reviews
- Búsqueda por radio geográfico
- Planes pagos / destacados