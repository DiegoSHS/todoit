import { StoredContext } from "@/context";
import { signOut } from "@/database/auth";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";

export default function AuthButton() {
  const { memory: { session } } = StoredContext()
  return (
    <Tooltip content={
      session ? (
        <div className="flex items-center gap-4">
          Bienvenido, {session.user.email}!
          <form action={signOut}>
            <Button>
              Cerrar sesión
            </Button>
          </form>
        </div>
      ) : (
        <Link
          href="/login"
          passHref
          legacyBehavior
        >
          <Button variant="flat" color="primary">
            Iniciar sesión
          </Button>
        </Link>
      )
    }>
      <Avatar color="success" name={session ? session.user.email : ''} />
    </Tooltip >
  )
}
