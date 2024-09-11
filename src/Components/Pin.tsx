import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Input, Button, Heading, ChakraProvider } from "@chakra-ui/react"
import axios from "axios"

const Pin = () => {
    const BACKEND = process.env.REACT_APP_BACKEND
    const navigate = useNavigate()

    console.log(BACKEND)

    const [password, setPassword] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${BACKEND}/pin`, { password })

            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                navigate('/')
            } else {    
                alert('Senha incorreta')
            }
        } catch (error) {
            console.error('Erro ao gerar o token', error)
        }
    }

    return (
        <ChakraProvider>
            <Box p="6" maxW="400px" mx="auto" mt="100px">
                <Heading as="h2" size="lg" mb="6" textAlign="center">
                    Digite a Senha do Sistema
                </Heading>
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button mt="4" width="full" onClick={handleSubmit}>
                    Entrar
                </Button>
            </Box>
        </ChakraProvider>
    )
}

export default Pin
