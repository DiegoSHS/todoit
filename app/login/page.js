import { Button } from "@nextui-org/react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Input } from "postcss"

export default function Login({ searchParams }) {
    const signIn = async (form) => {
        const email = form.get('email')
        const password = form.get('password')
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            return redirect("/login?message=No se pudo autenticar")
        }
        return redirect("/")
    }
    const signUp = async (form) => {
        const origin = headers().get('origin')
        const email = form.get('email')
        const password = form.get('password')
        const supabase = createClient()
        const { error } = await supabase.auth.signUp({
            email, password, options: {
                emailRedirectTo: `${origin}/auth/callback`
            }
        })
        if (error) {
            return redirect("/login?message=No se pudo registrar")
        }
        return redirect("/login?message=Revisa tu correo para confirmar tu cuenta")
    }
    return (
        <form>
            <Input name="email" type="email" placeholder="Correo" />
            <Input name="password" type="password" placeholder="Contraseña" />
            <Button type="submit" formAction={signIn}>Iniciar sesion</Button>
            <Button type="submit" formAction={signUp}>Registrar</Button>
            {searchParams?.message && (<p className="mt-4 p-4 text-center">{searchParams.message}</p>)}
        </form>
    )
} 
