import {Box, Button, Input, VStack, Heading, InputGroup, InputRightElement, IconButton} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleLogin = () => {

        navigate("/stock");
    };

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgImage="url(/src/assets/LoginBg.png)"
            p={2}
        >
            <Box
                backdropFilter="blur(10px)"
                p={8}
                boxShadow="lg"
                borderRadius="md"
                width="30%"
                textAlign="center"
            >
                <Heading mb={6} color={'white'}>Connexion</Heading>
                <VStack spacing={4}>
                    <Input placeholder="Identifiant"  variant={'flushed'} colorScheme={'green'} color={'white'} />
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            variant={'flushed'}
                            color={'white'}
                        />
                        <InputRightElement width='4.5rem'>
                            <IconButton
                                colorScheme={'whiteAlpha'}
                                h='1.75rem'
                                size='sm'
                                onClick={handleClick}
                                aria-label={'Login'}
                                variant={'ghost'}
                                _hover={{ bgColor: "none" }}
                                icon={<i
                                    className={show ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} style={{
                                        color: 'white'
                                }}
                                />}
                            />

                        </InputRightElement>
                    </InputGroup>
                    <Button colorScheme="green" onClick={handleLogin}>
                        Se connecter
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}
