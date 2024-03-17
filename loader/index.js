'use client'
import { getSession } from "@/database/auth"
import toast from "react-hot-toast"

export const loader = (promise, setLoading, callback) => {
    setLoading(true)
    promise.then(({ data, error }) => {
        if (error) {
            toast.error('No se pudieron obtener las tareas', {
                id: 'load-error',
                duration: 3000,
                icon: '❌'
            })
            setLoading(false)
            return
        }
        callback(data)
        setLoading(false)
    })
}

export const loadSession = async ({ push }) => {
    const session = await getSession()
    if (!session?.user) {
        toast('Inicia sesión antes', {
            duration: 3000, id: 'no-login'
        })
        return push('/login')
    }
}