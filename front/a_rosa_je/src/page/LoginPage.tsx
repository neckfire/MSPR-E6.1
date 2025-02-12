import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
    InputGroup,
    InputRightElement,
    IconButton,
    Text,
    Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleToggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    const handleLogin = () => {
        navigate("/stock");
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgImage="url(/src/assets/LoginBg.png)"
            p={2}
            overflow="hidden"
        >
            <Box
                width="800px"
                height="500px"
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter={"blur(10px)"}
                borderRadius="lg"
                boxShadow="lg"
                overflow="hidden"
                position="relative"
            >
                <Flex
                    width="200%"
                    height="100%"
                    transform={isLoginMode ? "translateX(0)" : "translateX(-50%)"}
                    transition="transform 0.5s ease-in-out"
                >
                    {/* SECTION CONNEXION */}
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">
                            Connexion
                        </Heading>
                        <VStack spacing={8} w="80%">
                            <Input
                                placeholder="Identifiant"
                                variant="flushed"
                                colorScheme="green"
                                color="white"
                                fontSize="1.5rem"
                            />
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    variant="flushed"
                                    color="white"
                                    fontSize="1.5rem"
                                />
                                <InputRightElement width="4.5rem">
                                    <IconButton
                                        colorScheme="whiteAlpha"
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handlePasswordVisibility}
                                        aria-label="Afficher/masquer mot de passe"
                                        variant="ghost"
                                        _hover={{ bgColor: "none" }}
                                        icon={
                                            <i
                                                className={
                                                    showPassword
                                                        ? "fa-regular fa-eye-slash"
                                                        : "fa-regular fa-eye"
                                                }
                                                style={{
                                                    color: "white",
                                                }}
                                            />
                                        }
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Button colorScheme="green" onClick={handleLogin}>Se connecter</Button>
                            <Text
                                color="white"
                                mt={4}
                                cursor="pointer"
                                _hover={{ textDecoration: "underline" }}
                                onClick={handleToggleMode}
                            >
                                Pas encore de compte ? Créer un compte
                            </Text>
                        </VStack>
                    </Box>

                    {/* SECTION CREATION DE COMPTE */}
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">
                            Créer un compte
                        </Heading>
                        <VStack spacing={8  } w="80%">
                            <Input
                                placeholder="Identifiant"
                                variant="flushed"
                                colorScheme="green"
                                color="white"
                                fontSize="1.5rem"
                            />
                            <Input
                                placeholder="Email"
                                variant="flushed"
                                colorScheme="green"
                                color="white"
                                fontSize="1.5rem"
                            />
                            <InputGroup size="md">
                                <Input
                                    pr="4.5rem"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    variant="flushed"
                                    color="white"
                                    fontSize="1.5rem"
                                />
                                <InputRightElement width="4.5rem">
                                    <IconButton
                                        colorScheme="whiteAlpha"
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handlePasswordVisibility}
                                        aria-label="Afficher/masquer mot de passe"
                                        variant="ghost"
                                        _hover={{ bgColor: "none" }}
                                        icon={
                                            <i
                                                className={
                                                    showPassword
                                                        ? "fa-regular fa-eye-slash"
                                                        : "fa-regular fa-eye"
                                                }
                                                style={{
                                                    color: "white",
                                                }}
                                            />
                                        }
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <Button colorScheme="green" onClick={handleLogin} >Créer un compte</Button>
                            <Text
                                color="white"
                                mt={4}
                                cursor="pointer"
                                _hover={{ textDecoration: "underline" }}
                                onClick={handleToggleMode}
                            >
                                Déjà un compte ? Se connecter
                            </Text>
                        </VStack>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}
