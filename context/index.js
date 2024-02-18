'use client'
import { useContext, createContext, useState } from "react"

export const defaultTodo = {
    title: "",
    description: "",
    done: false,
    important: false,
}

export const Context = createContext()

export const StoredContext = () => useContext(Context)

export const MemoryProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        todos: [],
        editing: false,
        creating: false,
        validForm: false,
        newTodo: defaultTodo,
    })
    const setStored = (prop) => setMemory((prev) => ({ ...prev, ...prop }))
    const ctx = { memory, setStored, setMemory }
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
