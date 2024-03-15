import { StoredContext } from "@/context";
import { signOut } from "@/database/auth";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { memory: { session }, setStored } = StoredContext()
  const router = useRouter()
  const handleOut = async () => {
    const { error } = await signOut()
    if (error) return router.push("/login?message=No se pudo cerrar sesion")
    setStored({ session: null })
    return router.push("/login")
  }
  return (
    <Tooltip content={
      session ? (
        <div className="flex items-center gap-4">
          Bienvenido, {session.user.email}!
          <Button onClick={handleOut}>
            Cerrar sesión
          </Button>
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
