import { StoredContext } from "@/context";
import { signOut } from "@/database/auth";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthButton() {
  const { memory: { session }, setStored } = StoredContext()
  const router = useRouter()
  const handleOut = async () => {
    toast.promise(signOut(), {
      loading: 'Cerrando sesión...',
      success: ({ error }) => {
        if (error) {
          return 'No se pudo cerrar sesión'
        }
        setStored({ session: null })
        router.push('/login')
        return 'Sesión cerrada con éxito'
      },
      error: 'No se pudo cerrar sesión'
    }, {
      id: 'sign-out',
    })
  }
  return (
    <Tooltip content={
      session ? (
        <div className="flex items-center gap-4">
          Bienvenido, {session.user.email}!
          <Button size="sm" onClick={handleOut}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <Link
          href="/login"
          passHref
          legacyBehavior
        >
          <Button size="sm" variant="light" color="primary">
            Iniciar sesión
          </Button>
        </Link>
      )
    }>
      <Avatar size="sm" color="success" name={session ? session.user.email : ''} />
    </Tooltip >
  )
}
