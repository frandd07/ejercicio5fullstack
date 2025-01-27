"use client";

import { useState } from "react";

export default function CreateEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [asistentes, setAsistentes] = useState(0);

  function isFechaValida(fecha) {
    const fechaActual = new Date();
    const fechaHabitual = new Date(fecha);

    fechaActual.setHours(0, 0, 0, 0);
    fechaHabitual.setHours(0, 0, 0, 0);

    return fechaHabitual >= fechaActual;
  }

  async function crearEvento(e) {
    e.preventDefault();

    if (
      titulo !== "" &&
      descripcion !== "" &&
      fecha !== "" &&
      ubicacion !== "" &&
      isFechaValida(fecha)
    ) {
      const response = await fetch("/api/evento", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          evento: {
            titulo: titulo,
            descripcion: descripcion,
            fecha: fecha,
            ubicacion: ubicacion,
            asistentes: asistentes,
          },
        }),
      });

      if (response.ok) {
        alert("Evento creado");
        setTitulo("");
        setDescripcion("");
        setFecha("");
        setUbicacion("");
        setAsistentes("");
      } else {
        alert("Error al crear el evento");
      }
    } else {
      alert("Algo está vacío");
    }
  }

  return (
    <div>
      <h1>Crear Evento</h1>
      <form onSubmit={crearEvento}>
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </label>
        <br />
        <label>
          Ubicación:
          <input
            type="text"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Asistentes:
          <input
            type="number"
            value={asistentes}
            onChange={(e) => setAsistentes(Number(e.target.value))}
            min="0"
            required
          />
        </label>
        <br />
        <input type="submit" value="Crear evento" />
      </form>
    </div>
  );
}
