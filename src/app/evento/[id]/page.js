'use client'

import { use, useState, useEffect } from "react"

export default function Evento({params}){
    const {id} = use(params)
    const[evento,setEvento] = useState([])
    const[titulo,setTitulo] = useState("")
    const[descripcion,setDescripcion] = useState("")
    const[fecha,setFecha] = useState("")
    const[ubicacion,setUbicacion] = useState("")
    const[asistentes,setAsistentes] = useState(0)

    async function fetchEvento(){
        const url = "/api/evento/eventoind?id=" +id
        const response = await fetch(url)
        const ev = await response.json()
        setTitulo(ev.titulo)
        setDescripcion(ev.descripcion)
        setFecha(ev.fecha)
        setUbicacion(ev.ubicacion)
        setAsistentes(ev.asistentes)

        setEvento(ev)
    }

    useEffect(() => {
        fetchEvento()
    },[])


    return(
        <div>
            <h1>{titulo}</h1>
            <p>{descripcion}</p>
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Ubicación:</strong> {ubicacion}</p>
            <p><strong>Asistentes:</strong> {asistentes}</p>
        </div>
    )
}