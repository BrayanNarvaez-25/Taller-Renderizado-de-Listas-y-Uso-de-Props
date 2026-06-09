import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <span className="navbar-brand">🎮 Tienda Videojuegos</span>
      <div className="navbar-links">
        <Link to="/">Inventario</Link>
        <Link to="/formulario">Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;