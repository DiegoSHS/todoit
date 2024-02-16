'use client'
import { getTodos } from "@/database"
import { useContext, createContext, useState, useEffect } from "react"

export const defaultTodo = {
    title: "",
    description: "",
    done: false,
}

export const Context = createContext()

export const StoredContext = () => useContext(Context)

export const MemoryProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        todos: [],
        filter: "",
        editing: false,
        creating: false,
        validForm: false,
        newTodo: defaultTodo,
    })
    useEffect(() => {
        const { data, error } = getTodos('todos')
        setStored({ todos: data })
    }, [])
    const setStored = (prop) => setMemory((prev) => ({ ...prev, ...prop }))
    const ctx = { memory, setStored }
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
