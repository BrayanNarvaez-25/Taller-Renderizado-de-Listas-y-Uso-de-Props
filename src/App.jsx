import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import videojuegosData from './data/videojuegos';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem('lista_videojuegos');
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosData;
  });

  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  const agregar = (juego) => {
    setVideojuegos([...videojuegos, juego]);
    setAlerta('Videojuego registrado con éxito.');
  };

  const eliminar = (id) => {
    setVideojuegos(videojuegos.filter((j) => j.id !== id));
    setAlerta('Videojuego eliminado.');
  };

  const editar = (juegoEditado) => {
    setVideojuegos(videojuegos.map((j) => (j.id === juegoEditado.id ? juegoEditado : j)));
    setAlerta('Videojuego actualizado con éxito.');
  };

  return (
    <BrowserRouter>
      <Navbar />
      {alerta && <AlertaNotificacion mensaje={alerta} onCerrar={() => setAlerta('')} />}
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