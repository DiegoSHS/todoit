import React from 'react'

export default function Mlink({ searchParams }) {
    return (
        <div>
            <form>
                <input type="text" name="email" placeholder="Correo" />
                <input type="password" name="password" placeholder="Contraseña" />
                <button type="submit" formAction={signIn}>Iniciar sesion</button>
                <button type="submit" formAction={signUp}>Registrar</button>
                {searchParams?.message && (<p className="mt-4 p-4 text-center">{searchParams.message}</p>)}
            </form>
        </div>
    )
}
