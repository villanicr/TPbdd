const { pool } = require("./connection");

// Consultas
const getAllTrips = async () => {
  try {
    const result = await pool.query("SELECT * FROM trips");
    return result.rows;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw error;
  }
};

const addTrip = async (trip) => {
  const { country, year, month, duration, cost, kmTravelled, hotel } = trip;
  try {
    const result = await pool.query(
      `INSERT INTO trips (country, year, month, duration, cost, km_travelled, hotel) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [country, year, month, duration, cost, kmTravelled, hotel]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding trip:", error);
    throw error;
  }
};

module.exports = { getAllTrips, addTrip };
