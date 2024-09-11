import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ClientItem from "./ClientItem.tsx"
import { ClientModelInGet } from "../../models/ClientModelInGet"
import Birthday from "./Birthday.tsx"
import { Box, Button, Heading, Stack, ChakraProvider } from "@chakra-ui/react"
import useAuth from "../utils/pin.tsx"

const ClientList = () => {
    useAuth()
    const BACKEND = process.env.REACT_APP_BACKEND
    const navigate = useNavigate()
    
    const [clients, setClients] = useState<ClientModelInGet[] | null>(null)

    const list = async () => {
        try {
            const response = await axios.get<ClientModelInGet[]>(`${BACKEND}/clients`)
            const sortedClients = response.data.sort((a, b) => a.name.localeCompare(b.name))
            
            setClients(sortedClients)
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!clients) {
        return (
            <Heading as="h1" size="xl" mb="8" textAlign="center">
                Carregando dados...
            </Heading>
        )
    }

    const handlePost = () => {
        navigate('/post')
    }

    return (
        <ChakraProvider>
            <Box p="6" maxW="800px" mx="auto">
                <Birthday />

                <br />

                <Stack mt="8" spacing={6} align="center">
                    <Button
                        onClick={handlePost}
                        size="lg"
                    >
                        Adicionar Cliente
                    </Button>
                </Stack>

                <br />

                <Heading as="h1" size="xl" mb="8" textAlign="center">
                    Clientes
                </Heading>

                <ClientItem clients={clients} />
            </Box>
        </ChakraProvider>
    )
}

export default ClientList