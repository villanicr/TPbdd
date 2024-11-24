// src/services/sendFormSql.js
const API_BASE_URL = "http://localhost:3003"; // URL base del backend

const sendFormSql = {
  addTrip: async (tripData) => {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
    return response.json();
  },

  addComment: async (commentData) => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    });
    return response.json();
  },
  // Agrega otras funciones si las necesitas
};

export default sendFormSql; // Exportas el objeto sendFormSql