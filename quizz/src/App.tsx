import {useEffect, useState} from 'react';
import './App.css';

function App() {

  const [nombre, setNombre] = useState<number>(0);

  useEffect(() => {

    const getNombre = async () => {
      const data = await fetch("http://localhost:8080/server/api");
      const res = await data.json();
      setNombre(res.nombre);
    }
    getNombre();
  }, []);

  return (
    <div className="App">
      nombre: {nombre}
    </div>
  );
}

export default App;
