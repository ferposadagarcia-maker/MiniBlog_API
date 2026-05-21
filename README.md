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

## ⚡ Deployment
El despliegue de esta aplicación se realizó integrando tres plataformas; **GitHub** para el control de versiones, **Railway** para el hosting del servidor y **PostgreSql** para la persistencia de datos en la nube.

### 1. Github
Para garantizar la integridad del código:

1. Se inicializó el repositorio localmente con `git init`.
2. Se configuro un archivo `.gitignore` para excluir carpetas pesadas y archivos sensibles (`node.modules` y `.env`).
3. Se vinculó el repositorio local con GitHub mediante:
``` bash
git remote add origin https://github.com/tu-usuario/MiniBlog_API.git
git push -u origin main
```
### 2. Configuración de Base de Datos en Railway
**1.** Se generó una instancia de db en la nube.
**2.** Migración de Esquema: Utilizando pgAdmin ejecutando lo siguiente:
- `db/init.sql`: Para la creacion de tablas, relaciones (FK) y constrains.
- `db/seed.sql`: Para la carga de datos literarios iniciales.

**3.** Se obtuvo la **DATABASE_PUBLIC_URL** para la conexión de herramientas externas y la comunicación interna del servicio.

### 3. Despliegue del Servidor (App Service)
La API se desplegó conectando directamente el repositorio de GitHub con un nuevo proyecto en Railway:

**1.Conexión de source:** Se vinculó la rama `main` del repositorio `Miniblog_API`.
**2.Variables de entorno:** Se configuraron los parámetros en la sección de *Variables* de la app para asegurar la conectividad 
- `DATABASE_PUBLIC_URL`: Pegando la cadena de conexión completa proporcionada por el servicio PostgreSQL.
- `PORT`: Establecido en 300 (el puerto que proporciona Railway).

### Verificación de Producción
Una vez finalizado el despliegue automático, la aplicación genera un dominio público permitiendo el acceso a:
- 👉🏻 **Salud del sistema:** `https://miniblogapi-production-00c8.up.railway.app/health`
- 👉🏻 **Documentación Interactiva:** `https://miniblogapi-production-00c8.up.railway.app/api-docs/`


*Autor: Fernanda Posada, PI_M2, SoyHenry.*


## 🤖 Registro de uso de AI
Para el desarrollo de este Proyecto Integrador, se utilizó Inteligencia Artificial como herramienta de apoyo pedagógico, depuración y optimización de procesos, bajo el siguiente esquema:

### 1. Áreas de aplicación
- **Explicación Conceptual:** Se utilizó la IA para profundizar en el entendimiento de la arquitectura de capas, el funcionamiento del Pool de conexiones y la lógica de los middlewares en Express.
- **Depuración (Debugging):** Asistencia técnica para resolver errores de entorno específicos de la implementación en macOS y errores de despliegue en Linux (Railway) relacionados con la sensibilidad a mayúsculas/minúsculas en el sistema de archivos.
- **Migración de Testing:** Apoyo en la transición de Jest a Vitest, asegurando la compatibilidad de los tests unitarios con el entorno de ejecución moderno.

### Validación de Código
Es importante destacar que **cada línea de código generada o sugerida fue revisada, probada y validada manualmente.** No se realizó una copia ciega de funciones; el uso de la IA se centró en acelerar la resolución de problemas técnicos y en mejorar la calidad de la documentación (OpenAPI y README).

### Herramienta Utilizada

- **GeminiStudio**