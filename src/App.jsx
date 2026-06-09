import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import videojuegosData from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';

function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  const agregar = (juego) => {
    setVideojuegos([...videojuegos, juego]);
  };

  const eliminar = (id) => {
    setVideojuegos(videojuegos.filter((j) => j.id !== id));
  };

  const editar = (juegoEditado) => {
    setVideojuegos(
      videojuegos.map((j) => (j.id === juegoEditado.id ? juegoEditado : j))
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>🎮 Tienda de Videojuegos</h1>
        <Routes>
          <Route
            path="/"
            element={
              <TablaVideojuegos
                videojuegos={videojuegos}
                onEliminar={eliminar}
              />
            }
          />
          <Route
            path="/formulario"
            element={
              <FormularioVideojuego
                onAgregar={agregar}
                onEditar={editar}
              />
            }
          />
          <Route path="*" element={<PaginaNoEncontrada />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;