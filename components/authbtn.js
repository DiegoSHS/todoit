import { Button } from "@nextui-org/react";
import { getUser, signOut } from "@/database/auth";
import Link from "next/link";

export const AuthButton = () => {
    const user = getUser()
    return user?.email ? (
        <div className="flex items-center gap-4">
            Bienvenido, {user.email}!
            <form action={signOut}>
                <Button variant="light">Logout</Button>
            </form>
        </div>
    ) : (
        <Link
            href="/login"
            passHref
            legacyBehavior>
            <Button>Login</Button>
        </Link>
    );
}
