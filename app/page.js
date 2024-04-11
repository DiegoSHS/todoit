'use client'

import { StoredContext, createFilter, filterTodos } from "@/context"
import { Checkbox, CheckboxGroup, CircularProgress, Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { TodoList } from "@/components/todo"
import { getTodos } from "@/database"
import { loader, loadSession } from "@/loader"
import { useRouter } from "next/navigation"

export default function Index() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const { memory: { todos, filters }, setStored } = StoredContext()
    const [filter, setFilter] = useState([])
    const setupTodos = () => {
        loader(getTodos('todos'), setLoading, (data) => {
            setStored({ todos: data })
        })
    }
    const handleFilter = () => {
        const filters = createFilter(filter)
        setStored({ filters })
    }
    useEffect(() => {
        loadSession(router)
        setupTodos()
    }, [])
    useEffect(() => {
        handleFilter()
    }, [filter])

    return (
        <div className="absolute flex flex-col items-center justify-center gap-2">
            <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                <Checkbox radius="full" value='done'>Completadas</Checkbox>
            </CheckboxGroup>
            <Divider />
            {loading ? <CircularProgress size="lg" className="mt-5" /> : <TodoList todos={filterTodos(todos, filters)} />}
        </div>
    )
}
