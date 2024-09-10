import React, { useState } from "react"
import { ClientItemProps } from "../../models/Props.tsx"
import { useNavigate } from "react-router-dom"
import ClientDelete from "./ClientDelete.tsx"
import { ChakraProvider, Box, Button, Heading, List, ListItem, Text, Stack, Input } from "@chakra-ui/react"

const ClientItem = (props: ClientItemProps) => {
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState("")

    const handleEdit = (id: any) => {
        navigate(`/edit/${id}`)
    }

    const handleView = (id: any) => {
        navigate(`/view/${id}`)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const filteredClients = props.clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <ChakraProvider>
            <Box mb="4">
                <Input
                    placeholder="Buscar cliente pelo nome"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    mb="4"
                    bg="gray.50"
                />
            </Box>

            <List spacing={6}>
                {filteredClients.map((client) => (
                    <ListItem key={client._id} p="4" bg="gray.50" boxShadow="md" borderRadius="md">
                        <Box mb="4">
                            <Heading as="h3" size="md">
                                {client.name}
                            </Heading>
                            <Text fontSize="lg" mt="2">
                                Saldo: R$ {client.balance.toFixed(2)}
                            </Text>
                            <Text fontSize="lg">Telefone: {client.telephone}</Text>
                        </Box>

                        <Stack direction="row" spacing={4}>
                            <Button
                                onClick={() => handleEdit(client._id)}
                            >
                                Editar
                            </Button>
                            <Button
                                onClick={() => handleView(client._id)}
                            >
                                Visualizar
                            </Button>
                            <ClientDelete id={client._id} />
                        </Stack>
                    </ListItem>
                ))}
            </List>
        </ChakraProvider>
    )
}

export default ClientItem