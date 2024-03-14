import { StoredContext } from "@/context";
import { getUser, signOut } from "@/database/auth";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function AuthButton() {
  const { memory: { session } } = StoredContext()
  return session ? (
    <div className="flex items-center gap-4">
      Hey, {session.user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
