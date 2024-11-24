import React, { useState } from "react";
import sendFormSql from "../services/SendFormSql";

const AddTrip = () => {
  const [trip, setTrip] = useState({
    country: "",
    year: "",
    month: "",
    duration: "",
    cost: "",
    km_travelled: "",
    hotel: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!trip.country.trim()) errors.country = "Country is required.";
    if (!trip.year || isNaN(trip.year) || trip.year <= 0)
      errors.year = "Year must be a valid number.";
    if (!trip.month || isNaN(trip.month) || trip.month < 1 || trip.month > 12)
      errors.month = "Month must be a number between 1 and 12.";
    if (!trip.duration || isNaN(trip.duration) || trip.duration <= 0)
      errors.duration = "Duration must be a positive number.";
    if (!trip.cost || isNaN(trip.cost) || trip.cost <= 0)
      errors.cost = "Cost must be a positive number.";
    if (!trip.km_travelled || isNaN(trip.km_travelled) || trip.km_travelled <= 0)
      errors.km_travelled = "Kilometers travelled must be a positive number.";
    if (!trip.hotel.trim()) errors.hotel = "Hotel is required.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await sendFormSql.addTrip(trip);
      console.log("Trip added:", response);
      setTrip({ country: "", year: "", month: "", duration: "", cost: "", km_travelled: "", hotel: "" });
      setErrors({});
    } catch (error) {
      console.error("Error adding trip:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Country"
        value={trip.country}
        onChange={(e) => setTrip({ ...trip, country: e.target.value })}
      />
      {errors.country && <p>{errors.country}</p>}

      <input
        type="number"
        placeholder="Year"
        value={trip.year}
        onChange={(e) => setTrip({ ...trip, year: e.target.value })}
      />
      {errors.year && <p>{errors.year}</p>}

      <input
        type="number"
        placeholder="Month (1-12)"
        value={trip.month}
        onChange={(e) => setTrip({ ...trip, month: e.target.value })}
      />
      {errors.month && <p>{errors.month}</p>}

      <input
        type="number"
        placeholder="Duration (days)"
        value={trip.duration}
        onChange={(e) => setTrip({ ...trip, duration: e.target.value })}
      />
      {errors.duration && <p>{errors.duration}</p>}

      <input
        type="number"
        placeholder="Cost (USD)"
        value={trip.cost}
        onChange={(e) => setTrip({ ...trip, cost: e.target.value })}
      />
      {errors.cost && <p>{errors.cost}</p>}

      <input
        type="number"
        placeholder="Kilometers Travelled"
        value={trip.km_travelled}
        onChange={(e) => setTrip({ ...trip, km_travelled: e.target.value })}
      />
      {errors.km_travelled && <p>{errors.km_travelled}</p>}

      <input
        type="text"
        placeholder="Hotel"
        value={trip.hotel}
        onChange={(e) => setTrip({ ...trip, hotel: e.target.value })}
      />
      {errors.hotel && <p>{errors.hotel}</p>}

      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrip;
