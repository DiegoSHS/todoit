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
        promise.then(({ data, error }) => {
            if (error) {
                toast.error('No se pudieron cargar las tareas', {
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
    const setupTodos = async () => {
        loader(getTodos('todos'))
    }
    useEffect(() => {
        setupTodos()
    }, [])
    return (
        <div>
            {loading ? <CircularProgress size="lg"></CircularProgress> : <TodoList todos={todos} />}
        </div>
    )
}
