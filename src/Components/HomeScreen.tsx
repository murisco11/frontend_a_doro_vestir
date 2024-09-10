import React from "react"
import { Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const HomeScreen = () => {

    const navigate = useNavigate()

    const handleHomeScreen = () => {
        navigate('/')
    }

    return (
        <Flex 
            justify="center"
            align="center"
            m='2'
        >
            <Button
                onClick={handleHomeScreen}
                size="lg"
            >
                Página Inicial
            </Button>
        </Flex>
    )
}

export default HomeScreen