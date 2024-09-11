import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { ClientModelInPost } from "../../models/ClientModelInPost"
import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Heading, ChakraProvider } from "@chakra-ui/react"
import HomeScreen from "./HomeScreen"

const ClientEdit = () => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const { id } = useParams()

    const [client,   setClient] = useState<ClientModelInPost | null>(null)
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState<string>(new Date().toISOString().split('T')[0])
    const [cpf, setCpf] = useState(0)
    const [identity, setIdentity] = useState("")
    const [balance, setBalance] = useState(0)
    const [telephone, setTelephone] = useState(0)
    const [status, setStatus] = useState(true)

    const getClient = async () => {
        try {
            const response = await axios.get<ClientModelInPost[]>(`${BACKEND}/clients/${id}`)
            const data = response.data[0]
            
            setClient(data)
            setName(data.name)
            setAddress(data.address)
            setBirthday(String(data.birthday))
            setCpf(data.cpf)
            setIdentity(data.identity)
            setBalance(data.balance)
            setTelephone(data.telephone)
            setStatus(data.status)

        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        getClient()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const handleSave = async () => {
        try {
            const updatedClient: ClientModelInPost = {
                name,
                address,
                birthday,
                cpf,
                identity,
                balance,
                telephone,
                status
            }

            await axios.put(`${BACKEND}/clients/${id}`, updatedClient)
            alert('Cliente atualizado!')
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <ChakraProvider>
            {client ? (
                <Box maxW="600px" mx="auto" p="8" boxShadow="xl" borderRadius="md" >
                    <HomeScreen />

                    <Heading textAlign='center' as="h1" size="xl" mb="6" >Editar Cliente</Heading>

                    <Stack spacing={5}>
                        <FormControl id="name">
                            <FormLabel>Nome:</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="address">
                            <FormLabel>Endereço:</FormLabel>
                            <Input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="cpf">
                            <FormLabel>CPF:</FormLabel>
                            <Input
                                type="number"
                                value={cpf}
                                onChange={(e) => setCpf(Number(e.target.value))}
                            />
                        </FormControl>

                        <FormControl id="identity">
                            <FormLabel>Identidade:</FormLabel>
                            <Input
                                type="text"
                                value={identity}
                                onChange={(e) => setIdentity(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="balance">
                            <FormLabel>Saldo:</FormLabel>
                            <Input
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(Number(e.target.value))}
                            />
                        </FormControl>

                        <FormControl id="telephone">
                            <FormLabel>Telefone:</FormLabel>
                            <Input
                                type="number"
                                value={telephone}
                                onChange={(e) => setTelephone(Number(e.target.value))}
                            />
                        </FormControl>

                        <FormControl id="status">
                            <FormLabel>Consórcio:</FormLabel>
                            <Select
                                value={status ? "Ativo" : "Inativo"}
                                onChange={(e) => setStatus(e.target.value === "Ativo")}
                            >
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </Select>
                        </FormControl>

                        <Button size="lg" onClick={handleSave}>
                            Salvar alterações
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <p>Carregando dados do cliente...</p>
            )}
        </ChakraProvider>
    )
}

export default ClientEdit