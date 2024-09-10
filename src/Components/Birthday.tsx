import React, { useEffect, useState } from "react"
import formatDate from "../utils/formatDate.ts"
import axios from "axios"
import { ClientModelInGet } from "../../models/ClientModelInGet.tsx"
import { ChakraProvider, Box, Heading, List, ListItem, Text } from "@chakra-ui/react"

const Birthday = () => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const date = formatDate(new Date())
    const [clients, setClients] = useState<ClientModelInGet[]>([])

    const list = async () => {
        try {
            const response = await axios.get<ClientModelInGet[]>(`${BACKEND}/clients/b/${date}`)
            setClients(response.data)
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        list()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <ChakraProvider>
            <Box maxW="500px" mx="auto" p="6" boxShadow="md" borderRadius="md" bg="gray.50">
                <Heading textAlign="center" as="h1" size="lg" mb="4">
                    Aniversariantes:
                </Heading>

                {clients.length > 0 ? (
                    <List spacing={3}>
                        {clients.map((client) => (
                            <ListItem
                                key={client._id}
                                p="3"
                                bg="white"
                                borderRadius="md"
                                boxShadow="sm"
                                _hover={{ bg: "gray.100", cursor: "pointer" }}
                            >
                                {client.name}
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Text textAlign="center" color="gray.500">
                        Não há aniversariantes hoje.
                    </Text>
                )}
            </Box>
        </ChakraProvider>
    )
}

export default Birthday
