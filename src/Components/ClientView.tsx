import React, { useEffect, useState } from "react";
import { ClientModelInPost } from "../../models/ClientModelInPost";
import { useParams } from "react-router-dom";
import axios from "axios";
import TransactionPost from "./TransactionList.tsx";
import TransactionsGet from "./TransactionsGet.tsx";
import formatDateString from "../utils/formatDay.ts";
import { Box, Text, Stack, Heading, Badge, ChakraProvider } from "@chakra-ui/react"
import HomeScreen from "./HomeScreen.tsx";
import useAuth from "../utils/pin.tsx";

const ClientView = () => {
    useAuth()
    const BACKEND = process.env.REACT_APP_BACKEND
    const { id } = useParams()
    
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [birthday, setBirthday] = useState("")
    const [cpf, setCpf] = useState(0)
    const [identity, setIdentity] = useState("")
    const [balance, setBalance] = useState(0)
    const [telephone, setTelephone] = useState(0)
    const [status, setStatus] = useState(true)

    const getClient = async () => {
        try {
            const response = await axios.get<ClientModelInPost[]>(`${BACKEND}/clients/${id}`)
            const client = response.data[0]
            setName(client.name)
            setAddress(client.address)
            setBirthday(formatDateString(client.birthday))
            setCpf(client.cpf)
            setIdentity(client.identity)
            setBalance(client.balance)
            setTelephone(client.telephone)
            setStatus(client.status)
        } catch (error) {
            // console.log(error)
        }
    }

    useEffect(() => {
        getClient()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <ChakraProvider>
            <Box m={10} maxW="600px" mx="auto" p="6" boxShadow="lg" borderRadius="md">
                <HomeScreen />
                <Heading as="h2" size="lg" mb="6" textAlign="center">
                    Detalhes do Cliente
                </Heading>

                <Stack spacing={3}>
                    <Box>
                        <Text fontWeight="bold">Nome:</Text>
                        <Text>{name}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">CPF:</Text>
                        <Text>{cpf}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Identidade:</Text>
                        <Text>{identity}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Endereço:</Text>
                        <Text>{address}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Data de Nascimento:</Text>
                        <Text>{birthday}</Text>
                    </Box>

                    <Box>
                        <Badge fontSize='lg' colorScheme={balance >= 0 ? "green" : "red"}>
                            {balance >= 0 ? 'Bônus' : 'Devendo'}: {balance.toFixed(2)} R$
                        </Badge>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Telefone:</Text>
                        <Text>{telephone}</Text>
                    </Box>

                    <Box>
                        <Text fontWeight="bold">Status:</Text>
                        <Badge colorScheme={status ? "green" : "red"}>
                            {status ? 'Consórcio' : 'Cliente'}
                        </Badge>
                    </Box>
                </Stack>

                <Box mt="6">
                    <TransactionPost id={id}/>
                    <TransactionsGet id={id} />
                </Box>
            </Box>
        </ChakraProvider>
    )
}

export default ClientView