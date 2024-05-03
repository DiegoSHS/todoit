"use client"
import { Button, Input } from '@nextui-org/react';
import { toastHandler } from '@/handlers/todos'
import { useState } from 'react';
import { updatePassword } from '@/database/auth';

const validatePassword = (password, password_confirmation) => password === password_confirmation

export default function Restore() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [valid, setValid] = useState(false)
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setValid(validatePassword(form.password, form.password_confirmation))
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validatePassword(form.password, form.password_confirmation)) {
            toastHandler(updatePassword(form.password), setLoading, (res) => {
                console.log(res)
            }), {
                success: 'Contraseña actualizada',
                promiseError: 'Error al actualizar la contraseña'
            }
        } else {
            console.log('Las contraseñas no coinciden')
        }


    }
    return (
        <form className='flex flex-col gap-2 w-1/3' onSubmit={handleSubmit} onChange={handleChange}>
            <Input type='email' label='Correo' name='email' isDisabled={loading}></Input>
            <Input type='password' label='Contraseña' name='password' isDisabled={loading}></Input>
            <Input type='password' label='Confirmar contraseña' name='password_confirmation' isInvalid={!valid} errorMessage={'Las contraseñas no coinciden'} isDisabled={loading}></Input>
            <Button isLoading={loading} type='submit'>Restaurar contraseña</Button>
        </form>
    )
}
