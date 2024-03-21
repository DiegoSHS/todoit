"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers"


const cookieStore = cookies()
const client = createClient(cookieStore)

export const signOut = async (supabase = client) => {
    return supabase.auth.signOut()
}

export const signIn = async (form, supabase = client) => {
    const { email, password } = form
    return supabase.auth.signInWithPassword({ email, password })
}
export const signUp = async (form, supabase = client) => {
    const origin = headers().get('origin')
    const { password, email } = form
    return supabase.auth.signUp({
        email, password, options: {
            emailRedirectTo: `${origin}/auth/callback`
        }
    })
}

export const signInMagic = (email, supabase = client) => {
    const origin = headers().get('origin')
    return supabase.auth.signInWithOtp({
        email, options: {
            shouldCreateUser: false,
            emailRedirectTo: `${origin}/auth/callback`
        }
    })
}

export const restorePass = async (email, supabase = client) => {
    const origin = headers().get('origin')
    return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/login/restorepass`
    })
}

export const updatePass = async (newPassword, supabase = client) => {
    return supabase.auth.updateUser({ password: newPassword })
}

export const getSession = async (supabase = client) => {
    const {
        data: { session }
    } = await supabase.auth.getSession()
    return session
}