import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './FormularioVideojuego.css';   // ← agregar

function FormularioVideojuego({ onAgregar, onEditar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const juegoEditar = location.state;

  const [titulo, setTitulo] = useState('');
  const [plataforma, setPlataforma] = useState('PC');
  const [genero, setGenero] = useState('Acción');
  const [precio, setPrecio] = useState('');
  const [disponible, setDisponible] = useState(false);
  const [fechaLanzamiento, setFechaLanzamiento] = useState(juegoEditar?.fechaLanzamiento || '');
  const [sinopsis, setSinopsis] = useState(juegoEditar?.sinopsis || '');
  const [calificacion, setCalificacion] = useState(juegoEditar?.calificacion || '');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (juegoEditar) {
      setTitulo(juegoEditar.titulo || '');
      setPlataforma(juegoEditar.plataforma || 'PC');
      setGenero(juegoEditar.genero || 'Acción');
      setPrecio(juegoEditar.precio || '');
      setDisponible(juegoEditar.disponible || false);
      setFechaLanzamiento(juegoEditar?.fechaLanzamiento || '');
      setSinopsis(juegoEditar?.sinopsis || '');
      setCalificacion(juegoEditar?.calificacion || '');
    } else {
      setTitulo('');
      setPlataforma('PC');
      setGenero('Acción');
      setPrecio('');
      setDisponible(false);
    }
  }, [location.state]);

  const validarFormulario = () => {
    const erroresActivos = {};

    if (!titulo.trim()) {
      erroresActivos.titulo = 'El título no puede estar vacío.';
    }
    if (!calificacion || calificacion < 1 || calificacion > 100) {
      erroresActivos.calificacion = 'La calificación debe estar entre 1 y 100.';
    }
    if (sinopsis.trim().length < 10) {
      erroresActivos.sinopsis = 'La sinopsis debe tener al menos 10 caracteres.';
    }

    return erroresActivos;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const juego = { titulo, plataforma, genero, precio: parseFloat(precio), disponible, fechaLanzamiento, sinopsis, calificacion: parseInt(calificacion) };
    if (juegoEditar) {
      onEditar({ ...juego, id: juegoEditar.id });
    } else {
      onAgregar({ ...juego, id: Date.now() });
    }
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresActivos = validarFormulario();
    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }
    setErrores({});
    const juego = { titulo, plataforma, genero, precio: parseFloat(precio), disponible, fechaLanzamiento, sinopsis, calificacion: parseInt(calificacion) };
    if (juegoEditar) {
      onEditar({ ...juego, id: juegoEditar.id });
    } else {
      onAgregar({ ...juego, id: Date.now() });
    }
    navigate('/');
  };

  return (
    <div className="formulario-container">
      <h2>{juegoEditar ? 'Editar Videojuego' : 'Registrar Videojuego'}</h2>

      <form onSubmit={handleSubmit}>

        <div className="formulario-campo">
          <label>Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del videojuego"
            required
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
        </div>

        <div className="formulario-campo">
          <label>Plataforma</label>
          <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
        </div>

        <div className="formulario-campo">
          <label>Género</label>
          <select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="Acción">Acción</option>
            <option value="Aventura">Aventura</option>
            <option value="RPG">RPG</option>
            <option value="Deportes">Deportes</option>
            <option value="Metroidvania">Metroidvania</option>
            <option value="Terror">Terror</option>
          </select>
        </div>

        <div className="formulario-campo">
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="formulario-campo campo-checkbox">
          <input
            type="checkbox"
            id="disponible"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
          <label htmlFor="disponible">Disponible en stock</label>
        </div>

        {/* Fecha de lanzamiento */}
        <div className="formulario-campo">
          <label>Fecha de lanzamiento</label>
          <input
            type="date"
            value={fechaLanzamiento}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
          />
        </div>

        {/* Sinopsis */}
        <div className="formulario-campo">
          <label>Sinopsis</label>
          <textarea
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
            placeholder="Escribe una reseña corta..."
            maxLength={250}
            rows={4}
          />
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
          <small>{sinopsis.length}/250 caracteres</small>
        </div>

        {/* Calificación */}
        <div className="formulario-campo">
          <label>Calificación (1-100)</label>
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            min="1"
            max="100"
            placeholder="Ej: 85"
          />
          {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
        </div>

        <div className="formulario-botones">
          <button type="submit" className="btn-submit">
            {juegoEditar ? 'Guardar cambios' : 'Registrar juego'}
          </button>
          <button type="button" className="btn-cancelar" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}

export default FormularioVideojuego;