'use client'

import { StoredContext, createFilter, filterTodos } from "@/context"
import { Checkbox, CheckboxGroup, CircularProgress, Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { TodoList } from "@/components/todo"
import { getTodos } from "@/database"
import { loader } from "@/loader"
import { useRouter } from "next/navigation"
import { getSession } from "@/database/auth"
import toast from "react-hot-toast"

export default function Index() {
    const router = useRouter()
    const handleSession = async () => {
        const session = await getSession()
        if (!session?.user) {
            toast('Inicia sesión antes',{
                duration: 3000, id: 'no-login'
            })
            router.push('/login')
        }
    }
    handleSession()
    const [loading, setLoading] = useState(false)
    const { memory: { todos, filters }, setStored } = StoredContext()
    const [filter, setFilter] = useState([])
    const setupTodos = async () => {
        loader(getTodos('todos'), setLoading, (data) => {
            setStored({ todos: data })
        })
    }
    const handleFilter = () => {
        const filters = createFilter(filter)
        setStored({ filters })
    }
    useEffect(() => {
        setupTodos()
    }, [])
    useEffect(() => {
        handleFilter()
    }, [filter])

    return (
        <div className="pt-5 mt-5 top-10 absolute flex flex-col items-center justify-center gap-2">
            <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                <Checkbox radius="full" value='done'>Completadas</Checkbox>
            </CheckboxGroup>
            <Divider />
            {loading ? <CircularProgress size="lg" className="mt-5" /> : <TodoList todos={filterTodos(todos, filters)} />}
        </div>
    )
}
