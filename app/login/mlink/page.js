'use client'
import { Button, Input } from "@nextui-org/react";
import { restorePass } from '@/database/auth'
import { useState } from "react";
import { toastHandler } from "@/handlers/todos";
export default function Mlink() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        toastHandler(restorePass(email),setLoading,(res)=>{
            console.log(res)
        },{
            success: 'Se ha enviado un link a tu correo',
            error: 'Ha ocurrido un error, por favor intenta de nuevo'
        })
    }
    return (
        <form className="flex flex-col gap-2 w-3/4 sm:w-1/3" onChange={handleChange} onSubmit={handleSubmit}>
            <Input isRequired label='Correo' name="email" type="email" isDisabled={loading}></Input>
            <Button type="submit" isLoading={loading}>Enviar link a mi correo</Button>
        </form>
    )
}
