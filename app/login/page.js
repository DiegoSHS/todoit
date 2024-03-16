"use client"
import { Button, Divider, Input } from "@nextui-org/react"
import { getSession, signIn, signUp } from "@/database/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { StoredContext } from "@/context"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Login({ searchParams }) {
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
                target.reset()
                return 'Sesion iniciada'
            },
            error: 'No se pudo autenticar, intenta de nuevo'
        }, {
            id: 'sign-in'
        })
    }
    const handleSignUp = ({ target }) => {
        toast.promise(signUp(form), {
            loading: 'Registrando...',
            success: ({ error }) => {
                setLoading(false)
                if (error) {
                    return 'No se pudo registrar'
                }
                setForm({ email: '', password: '' })
                target.reset()
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
        <div className="pt-5 mt-5 top-10">
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
            </form>
        </div>
    )
} 
