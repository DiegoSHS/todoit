import { StoredContext } from "@/context";
import { signOut } from "@/database/auth";
import { toastHandler } from "@/handlers/todos";
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButton({ modal = false }) {
  const { memory: { session }, setStored } = StoredContext()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOut = async () => {
    toastHandler(signOut(), () => { }, () => {
      router.push('/login')
      setStored({ session: null })
    }, {
      loading: 'Cerrando sesión...',
      success: 'Sesión cerrada con éxito',
      serverError: 'No se pudo cerrar sesión',
      promiseError: 'No se pudo cerrar sesión'
    })
  }
  return (
    modal ? (
      <Tooltip content={
        session ? (
          <div className="flex items-center gap-4">
            Bienvenido, {session?.user?.email}!
            <div className="flex gap-2">
              <Link href='/restorepassword' legacyBehavior passHref>
                <Button size="sm">Cambiar contraseña</Button>
              </Link>
              <Button size="sm" onClick={handleOut}>
                Cerrar sesión
              </Button>
            </div>
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
    ) : (
      <>
        <Avatar onClick={onOpen} size="sm" color="success" name={session ? session?.user?.email : ''} />
        <Modal size="sm" backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
          {
            session ? (
              <ModalContent>
                {
                  (onClose) => (
                    <>
                      <ModalHeader>Cuenta</ModalHeader>
                      <ModalBody>
                        <div className="flex flex-col items-center gap-4">
                          Bienvenido, {session.user.email}!
                          <div className="flex gap-2">
                            <Link href='/restorepassword' legacyBehavior passHref>
                              <Button size="sm">Cambiar contraseña</Button>
                            </Link>
                            <Button size="sm" onClick={handleOut}>
                              Cerrar sesión
                            </Button>
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )
                }
              </ModalContent>
            ) : (
              <ModalContent>
                {
                  (onClose) => (
                    <ModalBody>
                      <Link
                        href="/login"
                        passHref
                        legacyBehavior
                      >
                        <Button size="sm" variant="light" color="primary">
                          Iniciar sesión
                        </Button>
                      </Link>
                    </ModalBody>
                  )
                }
              </ModalContent>
            )
          }
        </Modal>
      </>
    )
  )
}