import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, ChakraProvider } from "@chakra-ui/react"
import HomeScreen from "./HomeScreen"

const TransactionEdit = () => {
    const { id } = useParams()
    const BACKEND = process.env.REACT_APP_BACKEND

    // Definindo os estados para armazenar os dados da transação
    const [transaction, setTransaction] = useState<any | null>(null)
    const [description, setDescription] = useState<string>("")
    const [value, setValue] = useState<string>("")
    const [client, setClient] = useState<string>("")
    const [day, setDay] = useState<string>("")

    const getTransaction = async () => {
        try {
            const response = await axios.get(`${BACKEND}/transactions/data/${id}`)
            const data = response.data
            setTransaction(data)
            setDescription(data.description)
            setValue(String(data.value * -1))
            setClient(data.client)
            setDay(data.day.split("T")[0]) 
        } catch (error) {
            console.error("Erro ao carregar transação", error)
        }
    }

    const updateTransaction = async () => {
        if (isNaN(Number(value))) {
            alert ('O valor não é um número válido, verifique se há PONTO ao invés de vírgua')
            return
        }

        try {
            const updatedTransaction = {
                description,
                value: Number(value) * -1,
                client,
                day
            }

            await axios.put(`${BACKEND}/transactions/${id}`, updatedTransaction)
            alert("Transação atualizada com sucesso!")
        } catch (error) {
            console.error("Erro ao atualizar transação", error)
        }
    }

    useEffect(() => {
        if (id) {
            getTransaction()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <ChakraProvider>
            {transaction ? (
                <Box m={10} maxW="600px" mx="auto" p="6" boxShadow="lg" borderRadius="md">
                    <HomeScreen />
                    <Heading textAlign="center" as="h1" size="xl" mb="6">
                        Editar Transação
                    </Heading>

                    <Stack spacing={5}>
                        <FormControl id="description">
                            <FormLabel>Descrição:</FormLabel>
                            <Input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="value">
                            <FormLabel>Valor:</FormLabel>
                            <Input
                                type="string"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="day">
                            <FormLabel>Data:</FormLabel>
                            <Input
                                type="date"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                            />
                        </FormControl>

                        <Button size="lg" onClick={updateTransaction}>
                            Salvar alterações
                        </Button>
                    </Stack>
                </Box>
            ) : (
                <p>Carregando dados da transação...</p>
            )}
        </ChakraProvider>
    )
}

export default TransactionEdit
