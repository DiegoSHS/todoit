'use client'

import { useState } from "react"
import toast from "react-hot-toast"

export default function Index() {
    const [loading, setLoading] = useState(true)
    const { memory: { todos }, setStored } = StoredContext()
    const loadTodos = (promise) => {
        promise.then(({data,error})=>{
            if (error){
                toast.error('No se pudieron cargar las tareas',{
                    duration: 4000,
                    icon: '❌'
                })
                setLoading(false)
                return
            }
            setStored({ todos: data })
            setLoading(false)
        })
    }
    
    return (
        <div>

        </div>
    )
}
