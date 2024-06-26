/**
 * Validaciones de los datos de una tarea
 * @param {Object} todo la tarea a validar
 * @returns {Object} los errores encontrados
 */
export const validateTodo = (todo) => {
    const errors = {}
    if (!todo.title) {
        errors.title = 'El título es requerido'
    }
    if (!todo.date_limit) {
        errors.date_limit = 'La fecha límite es requerida'
    }
    if (!todo.description) {
        errors.description = 'La descripción es requerida'
    }
    if (todo.title.length > 50) {
        errors.title = 'El título no puede ser mayor a 50 caracteres'
    }
    if (todo.description.length > 200) {
        errors.description = 'La descripción no puede ser mayor a 200 caracteres'
    }
    return errors
}
/**
 * Valida los tipos de datos de una tarea
 * @param {Object} todo la tarea a validar
 * @returns {Object} los errores encontrados
 */
export const validateTodoTypes = (todo) => {
    const errors = {}
    if (typeof todo.title !== 'string') {
        errors.title = 'El título debe ser un texto'
    }
    if (typeof todo.date_limit !== 'string') {
        errors.date_limit = 'La fecha límite debe ser un texto'
    }
    if (typeof todo.description !== 'string') {
        errors.description = 'La descripción debe ser un texto'
    }
    const valid = (
        typeof todo.title === 'string' &&
        typeof todo.date_limit === 'string' &&
        typeof todo.description === 'string'
    )
    const error = valid ? false : {
        message: 'Los tipos de datos no son correctos',
        errors,
        code: 400
    }
    return { error }
}

export const validateLogin = (user) => {
    const errors = {}
    if (!user.email) {
        errors.email = 'El email es requerido'
    }
    if (!user.password) {
        errors.password = 'La contraseña es requerida'
    }
    if (user.email.length > 50) {
        errors.email = 'El email no puede ser mayor a 50 caracteres y no puede estar vacío'
    }
    if (user.password.length > 50 || user.password.length < 6) {
        errors.password = 'La contraseña tiene que tener una longitud de entre 6 y 50 caracteres'
    }
    return errors
}