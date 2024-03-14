import { Button, Input } from "@nextui-org/react"
import { signIn, signUp } from "@/database/auth"

export default function Login({ searchParams }) {
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
