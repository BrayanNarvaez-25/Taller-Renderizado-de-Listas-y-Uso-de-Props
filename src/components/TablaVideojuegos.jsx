import { useNavigate } from 'react-router-dom';

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Género</th>
          <th>Plataforma</th>
          <th>Precio</th>
          <th>Disponible</th>
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