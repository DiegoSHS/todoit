import { Card, CardBody, CardFooter, CardHeader, Checkbox, Chip, Tooltip } from "@nextui-org/react"
import Link from "next/link"
import { updateTodo } from "@/database"
import { Empty } from '@/components/empty'
import { StoredContext } from "@/context"
import Slider from "react-slick"
import { toastHandler } from "@/handlers/todos"

export const TodoCard = ({ todo }) => {
    const { memory: { todos }, setStored } = StoredContext()
    const handleCheck = async () => {
        toastHandler(updateTodo(todo.id, { done: !todo.done }), () => { }, ({ error }) => {
            setStored({
                todos: todos.map((t) => t.id === todo.id ? { ...t, done: !t.done } : t)
            })
        }, {
            loading: `${todo.done ? 'Desmarcando' : 'Marcando'} tarea...`,
        })
    }
    const handleImportant = async () => {
        toastHandler(updateTodo(todo.id, { important: !todo.important }), () => { }, ({ error }) => {
            setStored({
                todos: todos.map((t) => t.id === todo.id ? { ...t, important: !t.important } : t)
            })
        }, {
            loading: `${todo.important ? 'Quitando de favoritos' : 'Añadiendo a favoritos'}`,
            success: 'Tarea actualizada',
        })
    }
    return (
        <Link href={`/todo/${todo.id}`} passHref legacyBehavior>
            <Card isBlurred isPressable shadow="sm" className="bg-background/60 dark:bg-default-100/50 w-full">
                <CardHeader>{todo.title}</CardHeader>
                <CardBody className="flex flex-row">{todo.description}</CardBody>
                <CardFooter>
                    <div className="flex items-center justify-center">
                        <Tooltip content={todo.done ? 'Terminado' : 'Pendiente'}>
                            <div>
                                <Checkbox isSelected={todo.done} onClick={handleCheck} radius="full" />
                            </div>
                        </Tooltip>
                        <Tooltip content={todo.important ? 'Favorito' : 'No favorito'}>
                            <div>
                                <Checkbox isSelected={todo.important} color="danger" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>} onClick={handleImportant} radius="full" />
                            </div>
                        </Tooltip>
                        <Chip color="primary" size="sm">{new Date(todo.date_limit).toLocaleDateString()}</Chip>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}

export const TodoList = ({ todos }) => {
    return (
        todos.length === 0 ? <Empty /> : <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">{todos.map((t) => <TodoCard key={t.id} todo={t}></TodoCard>)}</div>
    )
}

export const SliderTodo = ({ todos }) => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        fade: true,
        autoplay: true,
        centerMode: true
    }
    return (
        <div className="items-center justify-center my-2" style={{ width: 370 }}>
            {
                todos.length === 0 ? <Empty /> : (
                    <Slider {...settings}>
                        {todos.map((t) => <TodoCard key={t.id} todo={t}></TodoCard>)}
                    </Slider>
                )
            }
        </div>
    )
}