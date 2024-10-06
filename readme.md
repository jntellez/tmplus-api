````markdown
# Transporte Motorizado Plus (TMPlus)

Transporte Motorizado Plus (TMPlus) es una API que permite a los usuarios alquilar motos de forma sencilla y eficiente. Esta API gestiona las entidades principales, incluyendo usuarios, motos, reservas y calificaciones.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Uso de la API](#uso-de-la-api)
- [Ejemplos de Peticiones](#ejemplos-de-peticiones)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Registro y gestión de usuarios.
- Listado de motos disponibles para renta.
- Gestión de reservas de motos.
- Calificación de motos y comentarios.

## Tecnologías Utilizadas

- **Node.js**: Backend de la API.
- **Express.js**: Framework para crear aplicaciones web.
- **MySQL**: Base de datos para almacenar información.
- **Postman**: Herramienta para probar la API.

## Instalación

1. **Clonar el Repositorio**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd tmplus
   ```
````

2. **Instalar Dependencias**

   ```bash
   npm install
   ```

3. **Configurar la Base de Datos**

   - Crear una base de datos en MySQL llamada `tmplus_db`.
   - Ejecutar las consultas SQL para crear las tablas necesarias (puedes encontrar las consultas en la sección "Uso de la API").

4. **Configurar Variables de Entorno**

   - Crear un archivo `.env` en la raíz del proyecto y añadir las siguientes variables:
     ```
     PORT=5000
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=tmplus_db
     ```

5. **Ejecutar la Aplicación**
   ```bash
   npm start
   ```

## Uso de la API

La API está disponible en `http://localhost:5000/api`. Los endpoints disponibles son los siguientes:

### Usuarios

- **GET /api/users**: Obtener todos los usuarios.
- **GET /api/users/:id**: Obtener un usuario por ID.
- **POST /api/users**: Crear un nuevo usuario.
- **PUT /api/users/:id**: Actualizar un usuario existente.
- **DELETE /api/users/:id**: Eliminar un usuario.

### Motos

- **GET /api/motorcycles**: Obtener todas las motos.
- **GET /api/motorcycles/:id**: Obtener una moto por ID.
- **POST /api/motorcycles**: Crear una nueva moto.
- **PUT /api/motorcycles/:id**: Actualizar una moto existente.
- **DELETE /api/motorcycles/:id**: Eliminar una moto.

### Reservas

- **GET /api/rentals**: Obtener todas las reservas.
- **GET /api/rentals/:id**: Obtener una reserva por ID.
- **POST /api/rentals**: Crear una nueva reserva.
- **PUT /api/rentals/:id**: Actualizar una reserva existente.
- **DELETE /api/rentals/:id**: Eliminar una reserva.

### Calificaciones

- **GET /api/ratings**: Obtener todas las calificaciones.
- **GET /api/ratings/:id**: Obtener una calificación por ID.
- **POST /api/ratings**: Crear una nueva calificación.
- **PUT /api/ratings/:id**: Actualizar una calificación existente.
- **DELETE /api/ratings/:id**: Eliminar una calificación.

## Ejemplos de Peticiones

### Crear Usuario

```http
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "1234567890",
  "address": "123 Main St"
}
```

### Crear Moto

```http
POST /api/motorcycles
Content-Type: application/json

{
  "user_id": 1,
  "brand": "Yamaha",
  "model": "MT-07",
  "year": 2020,
  "rental_price": 100.00,
  "description": "Una moto deportiva muy cómoda."
}
```

### Crear Reserva

```http
POST /api/rentals
Content-Type: application/json

{
  "user_id": 1,
  "motorcycle_id": 1,
  "start_date": "2024-10-10",
  "end_date": "2024-10-15",
  "total_price": 500.00
}
```

### Crear Calificación

```http
POST /api/ratings
Content-Type: application/json

{
  "user_id": 1,
  "motorcycle_id": 1,
  "rating": 5,
  "comment": "Excelente moto, muy recomendable."
}
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agregada nueva característica'`).
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

```

```
