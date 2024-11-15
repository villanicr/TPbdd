const express = require('express');
const { Client } = require('pg');

// Crear una aplicación Express
const app = express();
const port = 3003;

// Configuración para conectarse a PostgreSQL
const client = new Client({
  user: 'user',          // Usuario configurado en docker-compose
  host: 'localhost',     // Conexión a localhost (si ejecutas fuera de Docker)
  database: 'database',  // Base de datos configurada en docker-compose
  password: 'password',  // Contraseña configurada en docker-compose
  port: 5432,            // Puerto del contenedor de PostgreSQL
});

// Conectarse a PostgreSQL
client.connect()
  .then(() => {
    console.log('Conectado a la base de datos PostgreSQL');
    
    // Crear la tabla "users" si no existe
    return client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INT
      );
    `);
  })
  .then(() => {
    console.log('Tabla "users" creada o ya existe');
    
    // Insertar dos registros en la tabla "users"
    return client.query(`
      INSERT INTO users (name, age) VALUES 
      ('Juan', 30),
      ('Maria', 25);
    `);
  })
  .then(() => {
    console.log('Registros insertados correctamente');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos o al insertar los registros:', err);
  });

// Rutas de la API
app.get('/', (req, res) => {
  res.send('¡Servidor Express y PostgreSQL corriendo!');
});

app.listen(port, () => {
  console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
