import React from "react";

const AddComment = () => {
  return (
    <div className="add-comment">
      <h2>Agregar Comentario</h2>
      <form>
        <label>
          Comentario:
          <textarea placeholder="Escribe tu comentario"></textarea>
        </label>
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default AddComment;
