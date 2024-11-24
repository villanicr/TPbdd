// routes/trips.js
const express = require("express");
const { pool } = require("../db/connection");
const router = express.Router();

// Ruta para obtener todos los viajes
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM trips");  // Realizamos la consulta directamente
    res.json(result.rows);  // Enviamos la respuesta como JSON
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Error fetching trips" });
  }
});

// Ruta para agregar un nuevo viaje
router.post("/", async (req, res) => {
  const { country, year, month, duration, cost, km_travelled, hotel } = req.body;  // Desestructuramos los datos del cuerpo de la solicitud
  
  // Verificamos que los datos necesarios existan
  if (!country || !year || !month || !duration || !cost || !km_travelled || !hotel) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Mostramos los valores que vamos a insertar en la base de datos
  console.log("Datos recibidos para insertar:", { country, year, month, duration, cost, km_travelled, hotel });

  try {
    const result = await pool.query(
      `INSERT INTO trips (country, year, month, duration, cost, km_travelled, hotel) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [country, year, month, duration, cost, km_travelled, hotel]  // Valores a insertar
    );

    res.json({ message: "Trip added successfully", trip: result.rows[0] });  // Devolvemos el viaje agregado
  } catch (error) {
    console.error("Error adding trip:", error);
    res.status(500).json({ error: "Error adding trip" });
  }
});

module.exports = router;
