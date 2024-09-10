import axios from "axios"
import React, {  useEffect, useState } from "react"
import formatDate from "../utils/formatDate.ts";
import { Box, Heading, Text, Stack, Divider, ChakraProvider } from "@chakra-ui/react"
import formatDateString from "../utils/formatDay.ts";

interface Transaction {
    _id: string;
    day: string;
    description: string;
    value: number;
    __v: number;
}

const TransactionsGet = (body: any) => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const id = body.id
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const getTransaction = async () => {
        try {
            const response = await axios.get(`${BACKEND}/transactions/client/${id}`)
            setTransactions(response.data)
        } catch (error) {
            // console.log(error)
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
        <Box m={10} maxW="600px" mx="auto" p="8" boxShadow="lg" borderRadius="md" bg="gray.50">
            {transactions.map((transaction) => (
                <Stack key={transaction._id} spacing={3} mb={6}>
                    <Heading as="h2" size="md">
                        Data: {formatDateString(formatDate(transaction.day))}
                    </Heading>
                    <Text fontSize="lg">
                        <strong>Descrição:</strong> {transaction.description}
                    </Text>
                    <Text fontSize="lg">
                        <strong>Valor:</strong> R$ {transaction.value.toFixed(2)}
                    </Text>
                    <Divider />
                </Stack>
            ))}
        </Box>
        </ChakraProvider>
    )
}

export default TransactionsGet
