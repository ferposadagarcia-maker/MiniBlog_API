# 📚 MiniBlog Literario API

Este repositorio contiene la versión inicial del servicio de contenidos MiniBlog, desarrollado para la startup DevSpark. Se trata de una API REST construida con Node.js, Express y PostgreSQL, diseñada para gestionar autores, publicaciones y comentarios bajo una arquitectura escalable y profesional.
## Descripición del Proyecto
La API permite realizar operaciones CRUD completas sobre autores y sus publicaciones, asegurando la integridad referencial y la persistencia de datos. El proyecto incluye un conjunto de datos curados con temática de literatura existencialista y clásica (Milan Kundera, José Saramago, Alejandra Pizarnik) para facilitar las pruebas de integración.

## 🛠️ Tecnologías utilizadas
- **Node.js** & **Express**
- **PostgreSQL** (Base de Datos)
- **Jest**, **Supertest** & **Vitest**(Testing automatizado)
- **SwaggerUI/OpenAPI** (Documentación)
- **Railway** & **GitHub** (Deployment)
## Arquitectura del Sistema
El proyecto sigue un patrón de diseño basado en la separación de responsabilidades:
-   **Routes:** Definición de puntos de entrada y asignación de middlewares.
-   **Controllers:** Manejo de la lógica de petición/respuesta y orquestación de servicios.
-   **Services:** Capa de acceso a datos y ejecución de consultas SQL.
-   **Middlewares:** Gestión centralizada de errores, validaciones y rutas no encontradas.
## Esquema de Carpetas
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
**3. Configurar el entorno**
``` bash
cp .env.example .env
```
*Editar .env con contraseñas personales de PostgreSQL*

**4. Iniciar la base de datos**
- Ejecutar `db/init.sql` para crear el esquema de tablas.
- Ejecutar `db/seed.sql` para cargar los datos de prueba.
**5. Iniciar**
``` bash
npm start
```
## Documentación de la API
La documentación interactiva se genera automaticamente a traves de Swagger UI la cual permite visualizar y probar todos los endpoints disponibles.
- URL Local: `http://localhost:3000/api-docs`

**Principales Endpoints**
- Authors: `GET`, `POST` en `/authors`
- Authors Id: `GET`, `PUT`, `DELETE authors/:Id`
- Post: `GET`, `POST` en `/post` 
- Post Id: `GET`, `PUT`, `DELETE posts/:Id`
- Author Posts: `GET /post/authors/:authorId`
- Comments: `POST /commets`
- Comments Id: `GET /comments/post/:postID`
## Testing

