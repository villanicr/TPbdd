// index.js o app.js
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/connection");  // Si usas la conexión a la base de datos
const tripsRoutes = require("./routes/trips");  // Importas las rutas de viajes

const app = express();
app.use(cors());  // Habilitamos CORS
app.use(express.json());  // Parseamos el cuerpo de las solicitudes a JSON

// Inicializar la base de datos
initializeDatabase().then(() => {
  console.log("Database initialized");
});

// Usar las rutas de viajes
app.use("/trips", tripsRoutes);

// Servidor en puerto 3003
app.listen(3003, () => {
  console.log("Backend running on http://localhost:3003");
});
