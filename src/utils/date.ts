
export function formatDate(date: string) {
    const newDate = new Date(date)

    return newDate.toLocaleDateString('pt-BR', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}