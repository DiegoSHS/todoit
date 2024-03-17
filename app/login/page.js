"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import { signIn, signUp } from "@/database/auth"
import { useState } from "react"
import { StoredContext } from "@/context"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { toastHandler } from "@/handlers/todos"

export default function Login({ }) {
    const { setStored } = StoredContext()
    const path = usePathname()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleChange = ({ target }) => {
        setForm((prev) => ({ ...prev, [target.name]: target.value }))
    }
    const handleSignIn = ({ target }) => {
        toastHandler(signIn(form), setLoading, async ({ data: { session } }) => {
            setStored({ session })
            setForm({ email: '', password: '' })
            target.reset()
        }, {
            loading: 'Iniciando sesion...',
            success: 'Bienvenido',
        })
    }
    const handleSignUp = ({ target }) => {
        toastHandler(signUp(form), setLoading, () => {
            setForm({ email: '', password: '' })
            target.reset()
        }, {
            loading: 'Registrando...',
            success: 'Revisa tu correo para confirmar tu cuenta',
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        if (path == '/login') {
            handleSignIn(e)
            return
        }
        handleSignUp(e)
    }

    return (
        <div className="w-96">
            <form className="flex flex-col gap-2" onChange={handleChange} onSubmit={handleSubmit}>
                <Input isRequired name="email" type="email" label="Correo" isDisabled={loading} value={form.email} />
                <Input isRequired name="password" type="password" label="Contraseña" isDisabled={loading} value={form.password} />
                <Button type="submit" isLoading={loading} color="primary">{path == '/login' ? 'Iniciar sesion' : 'Registrar'}</Button>
                <Divider className="my-1" />
                <Link href={path == '/login' ? '/signup' : '/login'} legacyBehavior passHref>
                    <Button>
                        {path == '/login' ? 'Registrarse' : 'Iniciar sesión'}
                    </Button>
                </Link>
                <Divider></Divider>
                <Link href={'/login/mlink'} legacyBehavior passHref>
                    <Button variant="light" color="primary">
                        Olvidé mi contraseña
                    </Button>
                </Link>
            </form>
        </div>
    )
} 
