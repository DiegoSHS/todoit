import { Button, Card, CardBody, CardHeader, Checkbox } from "@nextui-org/react"
import Link from "next/link"
import toast from "react-hot-toast"
import { updateTodo } from "@/database";
import { Empty } from '@/components/empty'
import { StoredContext } from "@/context";

export const TodoCard = ({ todo }) => {
    const { memory: { todos }, setStored } = StoredContext()
    const handleCheck = async () => {
        toast.promise(updateTodo(todo.id, { done: !todo.done }, 'todos'), {
            loading: 'Actualizando tarea...',
            success: () => {
                setStored({
                    todos: todos.map((t) => {
                        if (t.id === todo.id) {
                            return { ...t, done: !t.done }
                        }
                        return t
                    })
                })
                return 'Tarea actualizada'
            },
            error: 'No se pudo actualizar la tarea 😢',
        })
    }
    return (
        <Card>
            <CardHeader>{todo.title}</CardHeader>
            <CardBody>{todo.description}</CardBody>
            <Checkbox checked={todo.done} onClick={handleCheck} radius="full" />
            <Link href={`edit/${todo.id}`} passHref legacyBehavior>
                <Button>Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
                </Button>
            </Link>
        </Card>
    )
}

export const TodoList = ({ todos }) => {
    return (
        <div>
            {todos.length === 0 ? <Empty /> : todos.map((t) => <TodoCard key={t.id} todo={t}></TodoCard>)}
        </div>
    )
}