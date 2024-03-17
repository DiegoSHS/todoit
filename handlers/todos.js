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
            if (result.error) {
                return toast.error(messages.serverError, { id: 'handler' })
            }
            callback(result)
            return messages.success
        },
        error: messages.promiseError,
    }, {
        id: 'handler',
        success: {
            icon: false
        }
    })
}