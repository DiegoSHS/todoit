"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers"

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
}

export const signIn = async (form) => {
    const email = form.get('email')
    const password = form.get('password')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
        return redirect("/login?message=No se pudo autenticar")
    }
    return redirect("/")
}
export const signUp = async (form) => {
    const origin = headers().get('origin')
    const email = form.get('email')
    const password = form.get('password')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
        email, password, options: {
            emailRedirectTo: `${origin}/auth/callback`
        }
    })
    if (error) {
        return redirect("/login?message=No se pudo registrar")
    }
    return redirect("/login?message=Revisa tu correo para confirmar tu cuenta")
}

export const getUser = async () => {
    const supabase = createClient();
    const {
        data: { session },
    } = await supabase.auth.getSession()
    return session
}