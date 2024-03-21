'use client'
import { useContext, createContext, useState } from "react"

export const defaultTodo = {
    title: "",
    description: "",
    done: false,
    important: false,
    date_limit: ""
}

export const Context = createContext()

export const StoredContext = () => useContext(Context)

export const MemoryProvider = ({ children }) => {
    const [memory, setMemory] = useState({
        filters: {},
        todos: [],
        session: null,
        editing: false,
        creating: false,
        validForm: false,
        errors: {},
        newTodo: defaultTodo,
        loginForm: {
            email: '',
            password: ''
        }
    })
    const setStored = (prop) => setMemory((prev) => ({ ...prev, ...prop }))
    const ctx = { memory, setStored, setMemory }
    return <Context.Provider value={ctx}>{children}</Context.Provider>
}
export const createFilter = (filters) => {
    return filters.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
}
export const filterTodos = (todos, filters) => {
    if (filters?.done == undefined && filters?.important == undefined) return todos
    const { important, done } = filters
    return todos.filter((todo) => {
        if (important && done) {
            return important == todo.important && done == todo.done
        }
        if (important) {
            return important == todo.important
        }
        if (done) {
            return done == todo.done
        }
        return true
    })
}

