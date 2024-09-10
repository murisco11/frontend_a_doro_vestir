import React from "react"
import { ClientIdProps } from "../../models/Props"
import axios from "axios"

import { Button, ChakraProvider } from "@chakra-ui/react"


const ClientDelete = (body: ClientIdProps) => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const id = body.id
    console.log('Delete', id)
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${BACKEND}/clients/${id}`)
            alert(response.data.message)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ChakraProvider>
            <Button onClick={handleDelete}>Deletar</Button>
        </ChakraProvider>
    )
}

export default ClientDelete