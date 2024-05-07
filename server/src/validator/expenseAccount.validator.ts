// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidExpenseAccount = (reason: any, expenseDate: any, description: any, state: any) => {
    if (typeof reason !== 'string') return { valid: 0, message: 'Your reason is not correctly formatted.' }
    if (reason.length < 1 || reason.length >= 50) return { valid: 0, message: 'The size of your reason is not valid' }
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (description.length < 1 || description.length >= 200) return { valid: 0, message: 'The size of your description is not valid' }
    if (typeof state !== 'string') return { valid: 0, message: 'Your state is not correctly formatted.' }
    if (state.length < 4 || state.length >= 20) return { valid: 0, message: 'Your state size has to be bigger than 8.' }
    if (!(expenseDate instanceof Date)) return { valid: 0, message: 'Your expense date is not correctly formatted.' }

    return { valid: 1 }
}
