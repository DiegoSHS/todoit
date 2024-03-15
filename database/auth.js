"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers"

export const signOut = async () => {
    const supabase = createClient()
    return supabase.auth.signOut()
}

export const signIn = async (form) => {
    const { email, password } = form
    const supabase = createClient()
    return supabase.auth.signInWithPassword({ email, password })
}
export const signUp = async (form) => {
    const origin = headers().get('origin')
    const {password, email} = form
    const supabase = createClient()
    return supabase.auth.signUp({
        email, password, options: {
            emailRedirectTo: `${origin}/auth/callback`
        }
    })
}

export const signInMagic = (form) => {
    const supabase = createClient()
    const email = form.get('email')
    const origin = headers().get('origin')
    supabase.auth.signInWithOtp({
        email, options: {
            shouldCreateUser: false,
            emailRedirectTo: `${origin}/auth/callback`
        }
    })
}

export const getSession = async () => {
    const supabase = createClient();
    const {
        data: { session }, error
    } = await supabase.auth.getSession()
    return session
}