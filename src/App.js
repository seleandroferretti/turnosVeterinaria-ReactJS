import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Turno from "./components/Turno";

function App() {
  // turnos en localstorage
  let turnosIniciales = JSON.parse(localStorage.getItem("turnos"));
  if (!turnosIniciales) {
    turnosIniciales = [];
  }

  // arreglo de turnos
  const [turnos, guardarTurnos] = useState(turnosIniciales);

  // useEffect
  useEffect(() => {
    localStorage.setItem("turnos", JSON.stringify(turnos));
  }, [turnos]);

  // funcion que tome los turnos actuales y agregue la nueva
  const crearTurno = (turno) => {
    guardarTurnos([...turnos, turno]);
  };

  // eliminar un turno por su id
  const eliminarTurno = (id) => {
    const nuevosTurnos = turnos.filter((turno) => turno.id !== id);
    guardarTurnos(nuevosTurnos);
  };

  // mensaje condicional
  const titulo =
    turnos.length === 0 ? "No hay Turnos" : "Administra tus Turnos";

  return (
    <Fragment>
      <h1>Administrador de Turnos</h1>;
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearTurno={crearTurno} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {turnos.map((turno) => (
              <Turno
                key={turno.id}
                turno={turno}
                eliminarTurno={eliminarTurno}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
