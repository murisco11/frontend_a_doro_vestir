const formatDateString = (dateString: any) => {
    const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ]

    const [day, month, year] = dateString.split('-').map(Number)

    return `${day} de ${months[month - 1]} de ${year}`
}

export default formatDateString