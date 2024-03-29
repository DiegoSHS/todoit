'use client'
import { StoredContext } from '@/context'
import { Button, Checkbox, Link, Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Tooltip } from '@nextui-org/react'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AuthButton from './AuthButton'
import { getSession } from '@/database/auth'
import { TooltipTodos } from './TooltipTodos'

export const Navigation = () => {
    const path = usePathname()
    const { setStored, memory: { session } } = StoredContext()
    const setupUser = async () => {
        if (session) return
        const sesion = await getSession()
        setStored({ session: sesion })
    }
    useEffect(() => {
        setupUser()
    }, [])
    return (
        <Navbar>
            <NavbarContent>
                <NavbarMenuToggle className='sm:hidden'></NavbarMenuToggle>
            </NavbarContent>
            <NavbarContent justify="center" className='hidden sm:flex gap-4'>
                <NavbarItem>
                    <Link href="/" legacyBehavior passHref>
                        <Button variant="light" color='primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Inicio
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
                {path == '/' ? ('') : (
                    <NavbarItem>
                        <TooltipTodos />
                    </NavbarItem>
                )}
            </NavbarContent>
            <NavbarContent justify='end'>
                <NavbarItem className='hidden sm:flex'>
                    <Tooltip content={
                        <Link href='/about' legacyBehavior passHref>
                            <div className="px-1 py-2 ">
                                <div className="text-small font-bold">¿Como funciona?</div>
                                <div className="text-tiny flex items-center gap-1">
                                    Toca una tarea para editarla, usa los checkboxes para marcarla<Checkbox isSelected radius='full' />o añadirla a favoritos<Checkbox color='danger' isSelected radius='full' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>} />
                                </div>
                            </div>
                        </Link>
                    }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </Tooltip>
                </NavbarItem>
                <NavbarItem className='sm:hidden'>
                    <AuthButton />
                </NavbarItem>
                <NavbarItem className='hidden sm:flex'>
                    <AuthButton modal/>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem>
                    <Link href="/" legacyBehavior passHref>
                        <Button variant="light" color='primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Inicio
                        </Button>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link href="/todo" legacyBehavior passHref>
                        <Button variant="light" color='primary'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Nueva tarea
                        </Button>
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}
