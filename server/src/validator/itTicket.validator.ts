// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isValidItTicket = (title: any, description: any, applicationConcerned: any, state: any) => {
    if (typeof description !== 'string') return { valid: 0, message: 'Your description is not correctly formatted.' }
    if (description.length < 1 || description.length >= 200) return { valid: 0, message: 'The size of your description is not valid' }
    if (typeof state !== 'string') return { valid: 0, message: 'Your state is not correctly formatted.' }
    if (state.length < 4 || state.length >= 20) return { valid: 0, message: 'Your state size has to be bigger than 4.' }
    if (typeof title !== 'string') return { valid: 0, message: 'Your title is not correctly formatted.' }
    if (title.length < 1 || title.length >= 20) return { valid: 0, message: 'Your title size has to be bigger than 4.' }
    if (typeof applicationConcerned !== 'string') return { valid: 0, message: 'Your application concerned is not correctly formatted.' }
    if (applicationConcerned.length < 1 || applicationConcerned.length >= 20) return { valid: 0, message: 'Your application concerned size has to be bigger than 8.' }

    return { valid: 1 }
}
