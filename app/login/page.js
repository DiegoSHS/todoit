"use client"
import { Button, Input } from "@nextui-org/react"
import { getSession, signIn, signUp } from "@/database/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { StoredContext } from "@/context"

export default function Login({ searchParams }) {
    const { setStored } = StoredContext()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = ({ target }) => {
        setForm((prev) => ({ ...prev, [target.name]: target.value }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        toast.promise(signIn(form), {
            loading: 'Iniciando sesion...',
            success: async ({ error }) => {
                setLoading(false)
                const session = await getSession()
                setStored({ session })
                if (error) {
                    return toast.error('No se pudo autenticar', { id: 'sign-in' })
                }
                setForm({ email: '', password: '' })
                return 'Sesion iniciada'
            },
            error: 'No se pudo autenticar, intenta de nuevo'
        }, {
            id: 'sign-in'
        })
    }
    const handleSignUp = () => {
        setLoading(true)
        toast.promise(signUp(form), {
            loading: 'Registrando...',
            success: ({ error }) => {
                setLoading(false)
                if (error) {
                    return 'No se pudo registrar'
                }
                setForm({ email: '', password: '' })
                return 'Revisa tu correo para confirmar tu cuenta'
            },
            error: 'No se pudo registrar, intenta de nuevo'
        }, {
            success: {
                duration: 4000,
                icon: false
            }
        })
    }
    return (
        <div>
            <form className="flex flex-col gap-1" onChange={handleChange} onSubmit={handleSubmit}>
                <Input name="email" type="email" label="Correo" isDisabled={loading} value={form.email} />
                <Input name="password" type="password" label="Contraseña" isDisabled={loading} value={form.password} />
                <Button type="submit" isLoading={loading}>Iniciar sesion</Button>
                <Button type="submit" onClick={handleSignUp} isLoading={loading}>Registrar</Button>
            </form>
        </div>
    )
} 
