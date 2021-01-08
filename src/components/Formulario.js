import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Formulario = ({ crearTurno }) => {
  // state de turnos
  const [turno, actualizarTurno] = useState({
    mascota: "",
    dueño: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  // state error validacion
  const [error, actualizarError] = useState(false);

  // funcion que se ejecuta cada que el usuario escribe en un input

  const actualizarState = (e) => {
    actualizarTurno({
      ...turno,
      [e.target.name]: e.target.value,
    });
  };

  // extraer los valores
  const { mascota, dueño, fecha, hora, sintomas } = turno;

  // cuando se envia el form
  const submitTurno = (e) => {
    e.preventDefault();

    // validar

    if (
      mascota.trim() === "" ||
      dueño.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }

    // eliminar mensaje previo de error (si aplica)
    actualizarError(false);

    // asignar id (key)
    turno.id = uuidv4();

    // crear turno
    crearTurno(turno);

    // reiniciar el form
    actualizarTurno({
      mascota: "",
      dueño: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };

  return (
    <Fragment>
      <h2>Crear Turno</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitTurno}>
        <label>Nombre de la Mascota:</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la Mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre del Dueño:</label>
        <input
          type="text"
          name="dueño"
          className="u-full-width"
          placeholder="Nombre del Dueño de la mascota"
          onChange={actualizarState}
          value={dueño}
        />

        <label>Fecha:</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora:</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Síntomas:</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Turno
        </button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearTurno: PropTypes.func.isRequired,
};

export default Formulario;
