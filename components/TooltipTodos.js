import { Button, Checkbox, CheckboxGroup, CircularProgress, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { SliderTodo } from './todo'
import { StoredContext, createFilter, filterTodos } from '@/context'
import { getFilteredTodos } from '@/database'
import { loader } from '@/loader'

export const TooltipTodos = () => {
    const { setStored, memory: { todos, filters, session } } = StoredContext()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState([])
    const handleFilter = () => {
        const filters = createFilter(filter)
        setStored({ filters })
    }
    useEffect(() => {
        handleFilter()
    }, [filter])
    useEffect(() => {
        loader(getFilteredTodos('todos', filters), setLoading, (data) => {
            setStored({ todos: data })
        })
    }, [])
    return (
        <Tooltip className='text-foreground bg-background' closeDelay={session ? 500 : 5000} isOpen={open} onOpenChange={(open) => setOpen(open)} content={
            session ? (
                <div>
                    <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                        <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                        <Checkbox radius="full" value='done'>Completadas</Checkbox>
                    </CheckboxGroup>
                    {loading ? <CircularProgress size="md" className="mt-5" /> : <SliderTodo todos={filterTodos(todos, filters)}></SliderTodo>}
                </div>
            ) : ('Para ver las tareas antes tiene que iniciar sesion')
        }>
            <Button variant='light' color='danger' onClick={() => {
                setOpen((open) => !open)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
                Tareas</Button>
        </Tooltip>
    )
}
export const ModalTodos = () => {
    const { setStored, memory: { todos, filters, session } } = StoredContext()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState([])
    const handleFilter = () => {
        const filters = createFilter(filter)
        setStored({ filters })
    }
    useEffect(() => {
        handleFilter()
    }, [filter])
    useEffect(() => {
        loader(getFilteredTodos('todos', filters), setLoading, (data) => {
            setStored({ todos: data })
        })
    }, [])
    return (
        <div>
            <Button variant='light' color='danger' onPress={onOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                </svg>
                Tareas
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='center'>
                <ModalContent>
                    {
                        (onClose) => (
                            <>
                                <ModalHeader>
                                    Tareas
                                </ModalHeader>
                                <ModalBody>
                                    {
                                        session ? (
                                            <div>
                                                <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                                                    <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                                                    <Checkbox radius="full" value='done'>Completadas</Checkbox>
                                                </CheckboxGroup>
                                                {loading ? <CircularProgress size="md" className="mt-5" /> : <SliderTodo todos={filterTodos(todos, filters)}></SliderTodo>}
                                            </div>
                                        ) : ('Para ver las tareas antes tiene que iniciar sesion')
                                    }
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose}>Cerrar</Button>
                                </ModalFooter>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </div>
    )
}

