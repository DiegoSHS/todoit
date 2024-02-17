'use client'

import { StoredContext } from "@/context"
import { Button, CircularProgress, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { TodoList } from "@/components/todo"
import { getDoneTodos, getFavoriteTodos, getTodos } from "@/database"
export default function Index() {
    const [loading, setLoading] = useState(false)
    const { memory: { todos }, setStored } = StoredContext()
    const loader = (promise) => {
        setLoading(true)
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
            console.log(data)
            setStored({ todos: data })
            setLoading(false)
        })
    }
    const setupTodos = async () => {
        loader(getTodos('todos'))
    }
    const handleFilter = (e) => {
        e.preventDefault()
        if (e.target.innerText == 'Completado') {
            setStored({ todos: todos.filter((todo) => todo.done) })
        }
        setStored({ todos: todos.filter((todo) => todo.important) })
    }
    useEffect(() => {
        setupTodos()
    }, [])
    return (
        <div className="pt-5 mt-5 top-10 absolute flex flex-col justify-center">
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="light">Filtros</Button>
                </DropdownTrigger>
                <DropdownMenu variant="flat" disallowEmptySelection selectionMode="single">
                    <DropdownItem key='done' value={'done'} onClick={handleFilter}>
                        Completado
                    </DropdownItem>
                    <DropdownItem key='completed' value={'done'} onClick={handleFilter}>
                        Favoritos
                    </DropdownItem>
                    <DropdownItem key='none' value={'none'} onClick={setupTodos}>
                        Borrar filtro
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {loading ? <CircularProgress size="lg" className="mt-5" /> : <TodoList todos={todos} />}
        </div>
    )
}
