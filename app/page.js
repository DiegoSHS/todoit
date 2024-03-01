'use client'

import { StoredContext } from "@/context"
import { Checkbox, CheckboxGroup, CircularProgress, Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { SliderTodo, TodoList } from "@/components/todo"
import { getFilteredTodos, getTodos } from "@/database"
export default function Index() {
    const [loading, setLoading] = useState(false)
    const { memory: { todos }, setStored } = StoredContext()
    const [filter, setFilter] = useState([])
    const loader = (promise) => {
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
            setStored({ todos: data })
            setLoading(false)
        })
    }
    const setupTodos = async () => {
        loader(getTodos('todos'))
    }
    const handleFilter = () => {
        const filters = filter.reduce((acc, curr) => {
            return ({ ...acc, [curr]: true })
        }, {})
        loader(getFilteredTodos('todos', filters))
    }
    useEffect(() => {
        setupTodos()
    }, [])
    useEffect(() => {
        handleFilter()
    }, [filter])
    return (
        <div className="pt-5 mt-5 top-10 absolute flex flex-col items-center justify-center gap-2">
            <p>Tareas pendientes más importantes</p>
            <SliderTodo todos={todos.filter(e=>e.important && !e.done)}></SliderTodo>
            <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                <Checkbox radius="full" value='done'>Completadas</Checkbox>
            </CheckboxGroup>
            <Divider />
            {loading ? <CircularProgress size="lg" className="mt-5" /> : <TodoList todos={todos} />}
        </div>
    )
}
