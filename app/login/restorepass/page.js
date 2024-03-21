import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { toastHandler } from "@/handlers/todos";
import { updatePass } from '@/database/auth'

export const validatePass = (pass, confirm) => {
    return pass === confirm
}

export default function Restore() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm: ''
    })
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validatePass(form.password, form.confirm)) {
            toastHandler(updatePass(form.password), setLoading, (res) => {
                console.log(res)
            }, {
                success: 'Contraseña actualizada',
                error: 'Ha ocurrido un error, por favor intenta de nuevo'
            })
        } else {
            console.log('Contraseñas no validas')
        }
    }
    return (
        <form className="flex flex-col gap-2 w-1/3" onChange={handleChange} onSubmit={handleSubmit}>
            <Input type='email' label='Correo'></Input>
            <Input type='password' label='Contraseña'></Input>
            <Input type='password' label='Confirmar contraseña'></Input>
            <Button type='submit'>Restaurar contraseña</Button>
        </form>
    )
}
