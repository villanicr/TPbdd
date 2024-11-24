const { Pool } = require("pg");

// Crear un pool para manejar la conexión
const pool = new Pool({
  user: "user",
  host: "localhost", // Cambiar a "postgres" si estás dentro de un contenedor Docker
  database: "database",
  password: "password",
  port: 5432,
});

// Función para inicializar la tabla
const initializeDatabase = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS trips (
      id SERIAL PRIMARY KEY,
      country VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      month INT NOT NULL,
      duration INT NOT NULL,
      cost DECIMAL(10, 2) NOT NULL,
      km_travelled INT ,
      hotel VARCHAR(255) NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("Table 'trips' is ready");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Exportar el pool y la función de inicialización
module.exports = { pool, initializeDatabase };
