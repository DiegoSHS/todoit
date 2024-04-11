'use client';
import { Button, Divider, Input } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toastHandler } from "@/handlers/todos";
import { signIn, signUp } from "@/database/auth";
import { StoredContext } from "@/context";
import { validateLogin } from "@/validations";
import { useState } from "react";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const { setStored, memory: { loginForm, errors } } = StoredContext()
    const path = usePathname()
    const handleSignIn = ({ target }) => {
        toastHandler(signIn(loginForm), setLoading, async ({ data: { session } }) => {
            console.log(session)
            setStored({ session, loginForm: { email: '', password: '' } })
            target.reset()
        },{
            loading: 'Iniciando sesión...',
            success: 'Bienvenido',
        })
    }
    const handleSignUp = ({ target }) => {
        toastHandler(signUp(loginForm), setLoading, async () => {
            setStored({ loginForm: { email: '', password: '' } })
            target.reset()
        },{
            loading: 'Registrando...',
            success: 'Revise su correo para confirmar su cuenta',
        })
    }
    const handleChange = ({ target }) => {
        setStored({ loginForm: { ...loginForm, [target.name]: target.value }, errors: validateLogin(loginForm) })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (path == '/login') {
            handleSignIn(e)
            return
        }
        handleSignUp(e)
    }
    return (
        <div>
            <form className="flex flex-col gap-2" onChange={handleChange} onSubmit={handleSubmit}>
                <Input isRequired isDisabled={loading} value={loginForm.email} errorMessage={errors.email} name="email" type="email" label="Email" />
                <Input isRequired isDisabled={loading} value={loginForm.password} errorMessage={errors.password} name="password" type="password" label="Password" />
                <Button type="submit" isLoading={loading} color="primary">{path == '/login' ? 'Iniciar sesión' : 'Registrarse'}</Button>
                <Divider className="my-1" />
                <Link href={path == '/login' ? '/signup' : '/login'} legacyBehavior passHref>
                    <Button>{path == '/login' ? 'Registrarse' : 'Iniciar sesión'}</Button>
                </Link>
                <Divider></Divider>
                <Link href={'/mlink'} legacyBehavior passHref>
                    <Button variant="light">Olvidé mi contraseña</Button>
                </Link>
            </form>
        </div>
    )
}