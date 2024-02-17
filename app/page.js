'use client'

import { StoredContext } from "@/context"
import { CircularProgress } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { TodoList } from "@/components/todo"
import { getTodos } from "@/database"
export default function Index() {
    const [loading, setLoading] = useState(true)
    const { memory: { todos }, setStored } = StoredContext()
    const loader = (promise) => {
        if (todos.length > 0) {
            setLoading(false)
            return
        }
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
            setStored({ todos: data })
            setLoading(false)
        })
    }
    const setupTodos = async () => {
        loader(getTodos('todos'))
    }
    useEffect(() => {
        setupTodos()
    }, [])
    return (
        <div className="pt-5 mt-5 top-10 absolute">
            {loading ? <CircularProgress size="lg" className="mt-5" /> : <TodoList todos={todos} />}
        </div>
    )
}
