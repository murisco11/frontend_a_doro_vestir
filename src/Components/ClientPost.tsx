import axios from "axios"
import React, { useState } from "react"
import { ClientModelInPost } from "../../models/ClientModelInPost"
import { ChakraProvider, Box, Button, FormControl, FormLabel, Input, Stack, Switch, Heading } from "@chakra-ui/react"
import HomeScreen from "./HomeScreen"
import useAuth from "../utils/pin"

const ClientPost = () => {
    useAuth()
    const BACKEND = process.env.REACT_APP_BACKEND
    
    const [name, setName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [birthday, setBirthday] = useState<string>(new Date().toISOString().split('T')[0])
    const [cpf, setCpf] = useState<number | string>("")
    const [identity, setIdentity] = useState<string>("")
    const [balance, setBalance] = useState<number | string>("")
    const [telephone, setTelephone] = useState<number | string>("")
    const [status, setStatus] = useState<boolean>(false)

    const handleSubmit = async () => {
        if (!name) {
            alert("Complete o nome!")
            return
        }

        const newClient: ClientModelInPost = {
            name,
            address,
            birthday: new Date(birthday),
            cpf: Number(cpf),
            identity,
            balance: Number(balance),
            telephone: Number(telephone),
            status
        }

        try {
            const response = await axios.post(`${BACKEND}/clients`, newClient)
            alert(response.data.message)
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <ChakraProvider>

            <Box m={10} p="6" maxW="500px" mx="auto" boxShadow="lg" borderRadius="md">
                <HomeScreen />
                <Heading as="h2" size="lg" mb="6" textAlign="center">
                    Novo Cliente
                </Heading>
                <Stack spacing={4}>
                    <FormControl id="name">
                        <FormLabel>Nome</FormLabel>
                        <Input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="address">
                        <FormLabel>Endereço</FormLabel>
                        <Input
                            type="text"
                            placeholder="Endereço"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="birthday">
                        <FormLabel>Aniversário</FormLabel>
                        <Input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="cpf">
                        <FormLabel>CPF</FormLabel>
                        <Input
                            type="text"
                            placeholder="CPF"
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="identity">
                        <FormLabel>Identidade</FormLabel>
                        <Input
                            type="text"
                            placeholder="Identidade"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="balance">
                        <FormLabel>Saldo</FormLabel>
                        <Input
                            type="text"
                            placeholder="Saldo"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                        />
                    </FormControl>

                    <FormControl id="telephone">
                        <FormLabel>Telefone</FormLabel>
                        <Input
                            type="text"
                            placeholder="Telefone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </FormControl>

                    <FormControl display="flex" alignItems="center" id="status">
                        <FormLabel>Consórcio</FormLabel>
                        <Switch
                            isChecked={status}
                            onChange={(e) => setStatus(e.target.checked)}
                        />
                    </FormControl>

                    <Button
                        onClick={handleSubmit}
                        size="lg"
                        w="full"
                    >
                        Enviar
                    </Button>
                </Stack>
            </Box>
        </ChakraProvider>
    )
}

export default ClientPost
