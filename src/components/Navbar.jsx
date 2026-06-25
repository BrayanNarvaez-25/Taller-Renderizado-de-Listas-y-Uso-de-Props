import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({nombreTienda,onSaludar}) {
  return (
    <nav className="navbar">
      <span className="navbar-brand">🎮 Tienda de Videojuegos</span>
      <div className="navbar-links">
        <Link to="/">Inventario</Link>
        <Link to="/formulario">Nuevo Juego</Link>
        <button onClick={()=> onSaludar(nombreTienda)}>
          Saludar Tienda
        </button>
      </div>
    </nav>
  );
}

export default Navbar;