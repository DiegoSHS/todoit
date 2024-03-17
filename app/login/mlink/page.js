'use client'
import { Button, Input } from "@nextui-org/react";
import { signInMagic } from '@/database/auth'
import { useState } from "react";
export default function Mlink() {
    const [form, setForm] = useState({ email: '', password: '' })
    const handleChange = (e) => {
        setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email } = form
        const { error } = await signInMagic(email)
    }
    return (
        <div>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <Input label='email' name="email" type="email"></Input>
                <Input label='password' name="password" type="password"></Input>
                <Button>Aceptar</Button>
            </form>
        </div>
    )
}
