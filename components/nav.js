'use client'
import { StoredContext, createFilter, filterTodos } from '@/context'
import { getFilteredTodos } from '@/database'
import { Button, Checkbox, CheckboxGroup, CircularProgress, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, Tooltip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SliderTodo } from './todo'
import { usePathname } from 'next/navigation'
import { loader } from '@/loader'

export const Navigation = () => {
    const path = usePathname()
    const { setStored, memory: { todos, filters } } = StoredContext()
    const [filter, setFilter] = useState([])
    const [loading, setLoading] = useState(false)
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
        <Navbar>
            <NavbarBrand className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                </svg>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Link href="/" legacyBehavior passHref>
                        <Button variant="light" color='primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Tareas
                        </Button>
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/todo" legacyBehavior passHref>
                        <Button variant="light" color='primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nueva tarea
                        </Button>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                {path == '/' ? ('') : (
                    <NavbarItem>
                        <Tooltip closeDelay={5000} content={
                            <div>
                                <CheckboxGroup label='Filtro' orientation="horizontal" onValueChange={setFilter}>
                                    <Checkbox radius="full" value='important' color="danger">Favoritas</Checkbox>
                                    <Checkbox radius="full" value='done'>Completadas</Checkbox>
                                </CheckboxGroup>
                                {loading ? <CircularProgress size="md" className="mt-5" /> : <SliderTodo todos={filterTodos(todos, filters)}></SliderTodo>}
                            </div>}>
                            <Button variant='light' color='danger'>Tareas</Button>
                        </Tooltip>
                    </NavbarItem>
                )}
                <NavbarItem>


                    <Tooltip content={
                        <Link href='/about' legacyBehavior passHref>
                            <div className="px-1 py-2 text-foreground">
                                <div className="text-small font-bold">¿Como funciona?</div>
                                <div className="text-tiny flex items-center gap-1">
                                    Toca una tarea para editarla, usa los checkboxes para marcarla<Checkbox isSelected radius='full' />o añadirla a favoritos<Checkbox color='danger' isSelected radius='full' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>} />
                                </div>
                            </div>
                        </Link>
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </Tooltip>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
