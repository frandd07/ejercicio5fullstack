'use client'

import Link from "next/link"
import { useEffect, useState } from "react"

export default function ListEvento(){
    const[eventos,setEventos] = useState([])

    async function fetchEventos(){
        const response = await fetch("/api/evento")
        const body = await response.json()
        setEventos(body)
    }

    useEffect(() => {
        fetchEventos()
    },[])

    async function deleteEvento(deleteID){
        
        
            const response = await fetch("/api/evento", {
                method: 'DELETE',
                headers: {"Content-Type":"application-json"},
                body: JSON.stringify({id: deleteID})
            })

            fetchEventos()
        
    
  
    

}

    return(
        <div>
            <h1>Lista de eventos</h1>
            {eventos.map(evento => 
                <p key={evento.id}>
                    <Link href={"/evento/" + evento.id}>{evento.titulo}</Link>
                   <button onClick={() => deleteEvento(evento.id)}>❌</button>
                    </p>
            )}

            <br/>
            <Link href={"/evento/create"}>Añadir evento</Link>
        </div>
    )
}