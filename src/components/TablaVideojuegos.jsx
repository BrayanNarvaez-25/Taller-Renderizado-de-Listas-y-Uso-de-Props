import { useNavigate } from 'react-router-dom';
import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  return (
    <div className="tabla-container">
      <table className="tabla-juegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso</th>
            <th>Fecha</th>
            <th>Sinopsis</th>
            <th>Calificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.titulo}</td>
              <td>{juego.genero}</td>
              <td>{juego.plataforma}</td>
              <td>${juego.precio}</td>
              <td>{juego.disponible ? 'Sí' : 'No'}</td>
              <td>
                <progress value={juego.progreso} max={1} />
              </td>
              <td>{juego.fechaLanzamiento || '—'}</td>
              <td className="celda-sinopsis">{juego.sinopsis || '—'}</td>
              <td>{juego.calificacion ? `${juego.calificacion}/100` : '—'}</td>
              <td>
                <button onClick={() => navigate('/formulario', { state: juego })}>
                  Editar
                </button>
                <button onClick={() => onEliminar(juego.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;