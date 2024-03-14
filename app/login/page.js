"use client"
import { Button, Input } from "@nextui-org/react"
import { signIn, signUp } from "@/database/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Login({ searchParams }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const handleChange = ({ target }) => {
        setForm((prev) => ({ ...prev, [target.name]: target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        signIn(form)
    }
    useEffect(() => {
        if (searchParams?.message) {
            toast(searchParams?.message, {
                duration: 2000,
            })
        }
    }, [searchParams])
    return (
        <form className="flex flex-col gap-1" onChange={handleChange}>
            <Input name="email" type="email" label="Correo" />
            <Input name="password" type="password" label="Contraseña" />
            <Button type="submit" onClick={handleSubmit}>Iniciar sesion</Button>
            <Button type="submit" formAction={signUp}>Registrar</Button>
        </form>
    )
} 
