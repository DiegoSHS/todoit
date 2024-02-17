'use server'
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies()
const client = createClient(cookieStore)

export const deleteTodo = async (id, table, supabase = client) => {
    const { count } = await supabase.from(table).select().match({ id })
    if (count === 0) {
        return {
            error: {
                message: 'No se pudo eliminar la tarea'
            }
        }
    }
    return supabase.from(table).delete().match({ id })
}

export const getTodos = async (table, supabase = client) => {
    return supabase.from(table).select('*')
}

export const insertTodo = async (todo, table, supabase = client) => {
    return supabase.from(table).insert(todo)
}

export const updateTodo = async (id, todo, table, supabase = client) => {
    return supabase.from(table).update(todo).match({ id })
}

export const getDoneTodos = async (table, supabase = client) => {
    return supabase.from(table).select('*').eq('done', true)
}

export const getPendingTodos = async (table, supabase = client) => {
    return supabase.from(table).select('*').eq('done', false)
}

export const getTodosByTextSearch = async (table, text, supabase = client) => {
    const { data, error } = Promise.allSettled([
        supabase.from(table).select('*').textSearch('title', text),
        supabase.from(table).select('*').textSearch('description', text)
    ]).then((results) => {
        const data = results.map(({ value }) => value.data).flat()
        return { data }
    }).catch((error) => {
        return {
            error: {
                message: 'No se pudieron cargar las tareas'
            }
        }
    })
    if (error) {
        return {
            error: {
                message: 'No se pudieron cargar las tareas'
            }
        }
    }
    return { data }
}