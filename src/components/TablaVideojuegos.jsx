import { useNavigate } from 'react-router-dom';

function TablaVideojuegos({ juegos, onEliminar }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Plataforma</th>
          <th>Disponible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {juegos.map((juego) => (
          <tr key={juego.id}>
            <td>{juego.nombre}</td>
            <td>{juego.plataforma}</td>
            <td>{juego.disponible ? 'Sí' : 'No'}</td>
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
  );
}

export default TablaVideojuegos;