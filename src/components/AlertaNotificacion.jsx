import { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCerrar();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="toast">
      ✅ {mensaje}
    </div>
  );
}

export default AlertaNotificacion;