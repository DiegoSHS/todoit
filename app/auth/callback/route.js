import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET (req){
    const requestURL = new URL(req.url)
    const code = requestURL.searchParams.get('code')
    const origin = requestURL.origin
    if(code){
        const supabase = createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(`${origin}/`)
}