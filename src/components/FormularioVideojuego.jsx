import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function FormularioVideojuego({ onAgregar, onEditar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const juegoEditar = location.state;

  const [nombre, setNombre] = useState(juegoEditar?.nombre || '');
  const [plataforma, setPlataforma] = useState(juegoEditar?.plataforma || 'PC');
  const [genero, setGenero] = useState(juegoEditar?.genero || 'Acción');
  const [disponible, setDisponible] = useState(juegoEditar?.disponible || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const juego = { nombre, plataforma, genero, disponible };
    if (juegoEditar) {
      onEditar({ ...juego, id: juegoEditar.id });
    } else {
      onAgregar({ ...juego, id: Date.now() });
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{juegoEditar ? 'Editar Videojuego' : 'Registrar Videojuego'}</h2>

      <form onSubmit={handleSubmit}>

        {/* Input tipo text */}
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del videojuego"
            required
          />
        </div>

        {/* Input tipo select - Plataforma */}
        <div>
          <label>Plataforma:</label>
          <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
        </div>

        {/* Input tipo select - Género */}
        <div>
          <label>Género:</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="Acción">Acción</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Deportes">Deportes</option>
            <option value="Terror">Terror</option>
          </select>
        </div>

        {/* Input tipo checkbox */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
            Disponible en stock
          </label>
        </div>

        <button type="submit">
          {juegoEditar ? 'Guardar cambios' : 'Registrar juego'}
        </button>

        <button type="button" onClick={() => navigate('/')}>
          Cancelar
        </button>

      </form>
    </div>
  );
}

export default FormularioVideojuego;