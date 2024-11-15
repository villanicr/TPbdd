// App.js (React)
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [inputData, setInputData] = useState({ name: '', age: '' });

  useEffect(() => {
    // Solicitar el mensaje inicial del backend
    fetch('http://localhost:3001/api')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Enviar los datos del formulario al backend
    fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),  // Los datos que se envían en el formulario
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);  // Muestra los datos devueltos por el backend
        setMessage(data.message);  // Muestra el mensaje en el frontend
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Frontend en React</h1>
      <p>Mensaje del backend: {message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="text"
            name="age"
            value={inputData.age}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default App;
