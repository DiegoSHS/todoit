export const loader = (promise, setLoading, callback) => {
    setLoading(true)
    promise.then(({ data, error }) => {
        if (error) {
            toast.error('No se pudieron obtener las tareas', {
                id: 'load-error',
                duration: 3000,
                icon: '❌'
            })
            setLoading(false)
            return
        }
        callback(data)
        setLoading(false)
    })
}