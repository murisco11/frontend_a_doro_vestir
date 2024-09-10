import React, { useState } from "react"
import { TransactionModelInPost } from "../../models/TransactionModelInPost"
import axios from "axios"
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, ChakraProvider } from "@chakra-ui/react"

const TransactionPost = (body: any) => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const id = body.id

    const [day, setDay] = useState<string>(new Date().toISOString().split('T')[0])
    const [description, setDescription] = useState<string>("")
    const [value, setValue] = useState<string>("")

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (/^-?\d*\.?\d*$/.test(inputValue)) {
            setValue(inputValue)
        }
    }

    const handleSubmit = async () => {
        const numericValue = Number(value)

        if (!day || !description || isNaN(numericValue)) {
            alert("Complete todos os dados corretamente!")
            return
        }

        const newTransaction: TransactionModelInPost = {
            day: new Date(day),
            description,
            value: numericValue,
            client: id
        }

        try {
            const response = await axios.post(`${BACKEND}/transactions`, newTransaction)
            alert(response.data.message)
        } catch (error) {
            // console.log(error)
        }
    }

    return (
        <ChakraProvider>
        <Box maxW="500px" mx="auto" p="6" boxShadow="lg" borderRadius="md">
            <Heading as="h1" size="lg" mb="6" textAlign="center">
                Nova Transação
            </Heading>  

            <Stack spacing={4}>
                <FormControl id="description">
                    <FormLabel>Descrição:</FormLabel>
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormControl>

                <FormControl id="day">
                    <FormLabel>Dia:</FormLabel>
                    <Input
                        type="date"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                    />
                </FormControl>

                <FormControl id="value">
                    <FormLabel>Valor:</FormLabel>
                    <Input
                        type="text"
                        placeholder="Valor"
                        value={value}
                        onChange={handleValueChange}
                    />
                </FormControl>

                <Button onClick={handleSubmit}>
                    Enviar
                </Button>
            </Stack>
        </Box>
        </ChakraProvider>
    )
}

export default TransactionPost
