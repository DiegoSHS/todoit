import { CircularProgress } from "@nextui-org/react";
import toast from "react-hot-toast";

const defaultMessages = {
    loading: 'Cargando...',
    success: 'Listo, terminado!',
    promiseError: 'Ups!, no pasó nada...',
    serverError: 'Ups! Algo salio mal...',
}
export const toastHandler = (
    promise,
    setLoading,
    callback,
    messages = defaultMessages
) => {
    messages = { ...defaultMessages, ...messages }
    setLoading(true)
    toast.promise(promise, {
        loading: messages.loading,
        success: async (result) => {
            setLoading(false)
            if (result?.error) {
                toast.error(messages.serverError, { id: 'server-error' })
                toast.remove('handler')
                return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            }
            callback(result)
            return messages.success
        },
        error: messages.promiseError,
    }, {
        id: 'handler',
    })
}