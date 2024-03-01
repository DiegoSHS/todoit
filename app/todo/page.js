'use client'

import { StoredContext, defaultTodo } from "@/context"
import { getTodoById, getTodos, insertTodo, updateTodo } from "@/database"
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { validateTodo } from "@/validations"

export default function TodoForm({ params }) {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const { memory: { newTodo, todos, validForm }, setStored } = StoredContext()
    const handleChange = (e) => {
        const { name, value } = e.target
        setStored({ newTodo: { ...newTodo, [name]: value }, validForm: Object.entries(errors).length === 0 })
        setErrors(validateTodo(newTodo))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validForm) {
            return
        }
        setLoading(true)
        if (params.id == undefined) {
            toast.promise(insertTodo(newTodo, 'todos'), {
                loading: 'Creando tarea...',
                success: ({ error, data }) => {
                    setLoading(false)
                    if (error) {
                        return 'Error al crear la tarea 😢'
                    }
                    setStored({ todos: [...todos, ...data], newTodo: defaultTodo })
                    return 'Tarea creada'
                },
                error: 'No se pudo crear la tarea 😢',
            }, {
                duration: 3000, id: 'create-todo'
            })
            setLoading(false)
            return
        }
        toast.promise(updateTodo(params.id, newTodo, 'todos'), {
            loading: 'Actualizando tarea...',
            success: async ({ error }) => {
                setLoading(false)
                if (error) {
                    return 'Error al al actualizar la tarea 😢'
                }
                const { data: todos } = await getTodos('todos')
                setStored({ todos })
                return 'Tarea actualizada'
            },
            error: 'No se pudo actualizar la tarea 😢',
        }, { duration: 3000, id: 'update-todo' })
    }
    const loadtodo = async (id) => {
        setLoading(true)
        toast.promise(getTodoById(id, 'todos'), {
            loading: 'Cargando tarea...',
            success: ({ data, error }) => {
                setLoading(false)
                if (error) {
                    return 'No se pudo cargar la tarea'
                }
                setStored({ newTodo: data[0] })
                return 'Tarea cargada'
            },
            error: 'Error al pedir la tarea'
        }, {
            duration: 3000,
            id: 'load-todo'
        })
    }
    useEffect(() => {
        if (params.id == undefined) {
            setStored({ newTodo: defaultTodo })
            return
        }
        loadtodo(params.id)
    }, [params.id])
    return (
        <form className="flex flex-col gap-2 mt-5 pt-5" onChange={handleChange} onSubmit={handleSubmit}>
            <Input isInvalid={errors.title} errorMessage={errors.title} type="text" isDisabled={loading} isRequired label='Título' name="title" placeholder="Mi tarea" value={newTodo.title} />
            <Textarea isInvalid={errors.description} errorMessage={errors.description} type="text" isDisabled={loading} isRequired label='Descripción' name="description" placeholder="Detalles de mi tarea" value={newTodo.description} />
            <Input isInvalid={errors.date_limit} errorMessage={errors.date_limit} type="date" isDisabled={loading} name="date_limit" onChange={handleChange} value={newTodo.date_limit}></Input>
            <Checkbox radius="full" isDisabled={params.id == undefined || loading} onClick={() => { setStored({ newTodo: { ...newTodo, done: !newTodo.done } }) }} name="done" isSelected={newTodo.done}>Completado</Checkbox>
            <Checkbox radius="full" isDisabled={loading} color="danger" icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            } onClick={() => { setStored({ newTodo: { ...newTodo, important: !newTodo.important } }) }} name="done" isSelected={newTodo.important}>Favorito</Checkbox>
            <Button type="submit" variant="shadow" color="primary" isLoading={loading}>Guardar</Button>
        </form >
    )
}