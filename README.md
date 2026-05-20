# 💻 MiniBlog Literario API

Este repositorio contiene la versión inicial del servicio de contenidos MiniBlog, desarrollado para la startup DevSpark. Se trata de una API REST construida con Node.js, Express y PostgreSQL y una suite de pruebas automatizadas con Vitest; diseñada para gestionar autores, publicaciones y comentarios bajo una arquitectura escalable y profesional.
## 📖 Descripición y temática
La API permite realizar operaciones CRUD completas sobre autores y sus publicaciones. El proyecto incluye un conjunto de datos curados con temática de literatura existencialista y clásica (Milan Kundera, José Saramago, Alejandra Pizarnik) para facilitar las pruebas de integración.

## 🛠️ Tecnologías utilizadas
- **Node.js** & **Express**
- **PostgreSQL** (Base de Datos)
- **Jest**, **Supertest** & **Vitest**(Testing automatizado)
- **SwaggerUI/OpenAPI** (Documentación)
- **Railway** & **GitHub** (Deployment)
## 🏛️ Arquitectura y Diseño
El proyecto sigue un patrón de diseño basado en la separación de responsabilidades:
-   **Routes:** Definición de puntos de entrada y asignación de middlewares.
-   **Controllers:** Manejo de la lógica de petición/respuesta y orquestación de servicios.
-   **Services:** Capa de acceso a datos y ejecución de consultas SQL.
-   **Middlewares:** Gestión centralizada de errores, validaciones y rutas no encontradas.
## 🗂️ Esquema de Carpetas
```bash
├── db/                 # Scripts de inicialización y semillas SQL
├── docs/               # Especificación OpenAPI (Swagger)
├── src/
│   ├── config/         # Configuración de base de datos y entorno
│   ├── controllers/    # Controladores de la aplicación
│   ├── middlewares/    # Funciones de filtrado y manejo de errores
│   ├── routes/         # Definición de endpoints
│   ├── services/       # Lógica de negocio y consultas a PostgreSQL
│   └── app.js          # Configuración principal de Express
├── tests/              # Pruebas unitarias y de integración
├── .env.example        # Plantilla de variables de entorno
├── server.js           # Punto de entrada del servidor
└── package.json        # Dependencias y scripts
```

## 🚀 Instalación y uso local
**Prerequisitos**
- Node.js instalado.
- PostgreSQL activo.

**1. Clonar repositorio**
``` bash
git clone https://github.com/ferposadagarcia-maker/ProyectoM1_FernandaPosada.git
```
**2. Instalar dependencias**
``` bash
npm install
```
**3. Variables de Entorno**
``` bash
PORT=3000
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
```
**4. Iniciar la base de datos**
- Ejecutar `db/init.sql` para crear el esquema de tablas.
- Ejecutar `db/seed.sql` para cargar los datos de prueba.

## Documentación interactiva de la API
La documentación interactiva se genera automáticamente a tráves de Swagger UI la cual permite visualizar y probar todos los endpoints disponibles.
- URL Local: `http://localhost:3000/api-docs`

**Principales Endpoints**
- Authors: `GET`, `POST` en `/authors`
- Authors Id: `GET`, `PUT`, `DELETE authors/:Id`
- Post: `GET`, `POST` en `/post` 
- Post Id: `GET`, `PUT`, `DELETE posts/:Id`
- Author Posts: `GET /post/authors/:authorId`
- Comments: `POST /commets`
- Comments Id: `GET /comments/post/:postID`

## Ejemplos de uso (Api endpoints)

### Autores

#### Obtener todos los autores
```bash
curl https://mini-blog-literario.up.railway.app/authors
```
#### Crear un nuevo autor
```bash
curl -X POST https://mini-blog-literario.up.railway.app/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Milan Kundera",
    "email": "milan@kundera.cz",
    "bio": "Escritor checo, autor de La insoportable levedad del ser."
  }'
  ```
### Posts

#### Crear un post para (ID 1)
```bash
curl -X POST https://mini-blog-literario.up.railway.app/posts \
-H "Content-Type: application/json" \
-d '{
    "title": "La levedad del ser",
    "content": "Un análisis sobre el peso de las decisiones humanas.",
    "author_id": 1,
    "published": true
  }'
```
#### Obtener post de un autor específico
```bash
curl https://mini-blog-literario.up.railway.app/posts/author/1
```
### Comments

#### Crear un comentario
```bash
curl -X POST https://mini-blog-literario.up.railway.app/comments \
  -H "Content-Type: application/json" \
  -d '{
    "post_id": 1,
    "author_id": 2,
    "content": "Excelente reflexión sobre el existencialismo."
  }'
```
## 💯 Testing Automatizado
Se han creado **6 test unitarios** que cubren operaciones CRUD y casos de error (como validacion de emails duplicados, campos obligatorios e integridad referencial).

Para ejecutar:
```bash 
npm test
```
## 🔒 Seguridad y Validaciones
- **Prevención de SQL injection:** Uso estricto de consultas parametrizadas en la capa de servicios.
- **Validación de Equema:** Middlewares de validación para asegurar que los datos de entrada cumplan con los requisitos de negocio antes de tocar la persistencia.
- **Manejo de errores:** sistema centralizado que estandariza las respuestas ante errores de cliente (400, 404) y fallos de servidor (500), garantizando que no se fltre información sensible del stack tecnológico.

## ⚡Deployment
La apliación se encuentra desplegada y operativa en Railway.

👉🏻 **URL Pública:** *link*