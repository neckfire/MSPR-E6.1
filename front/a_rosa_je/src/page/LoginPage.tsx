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
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUserStore from "../store/CurrentUser.ts";
import {fetchUserInfo} from "../api/GetUserInfos.tsx";

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formRegisterData, setFormRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const navigate = useNavigate();
    const toast = useToast();

    const handleToggleMode = () => {
        setIsLoginMode((prevMode) => !prevMode);
        setFormData({ username: "", password: "" });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (isLoginMode) {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormRegisterData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const setCurrentUser = useCurrentUserStore(state => state.setCurrentUser);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // On stocke d'abord un objet user minimal avec le token
                setCurrentUser({ username: formData.username }, data.key);

                // Ensuite on récupère les infos complètes
                const userInfo = await fetchUserInfo();
                console.log("User info retrieved:", userInfo); // Pour débugger

                toast({
                    title: "Connexion réussie",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                navigate("/home");
            } else {
                throw new Error(data.message || 'Erreur de connexion');
            }
        } catch (error) {
            toast({
                title: "Erreur",
                description: error.message || "Une erreur est survenue lors de la connexion",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/auth/registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formRegisterData.username,
                    email: formRegisterData.email,
                    password1: formRegisterData.password,
                    password2: formRegisterData.password2,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast({
                    title: "Compte créé avec succès",
                    description: "Vous pouvez maintenant vous connecter",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                setIsLoginMode(true);
            } else {
                throw new Error(data.non_field_errors?.join(", ") || "Erreur lors de la création du compte");
            }
        } catch (error) {
            toast({
                title: "Erreur",
                description: error.message || "Une erreur est survenue lors de la création du compte",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgImage="url(/src/assets/bg.png)"
            bgSize={"cover"}
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
                        <form onSubmit={handleLogin} style={{ width: '80%' }}>
                            <VStack spacing={8} w="100%">
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Identifiant"
                                    variant="flushed"
                                    colorScheme="green"
                                    color="white"
                                    fontSize="1.5rem"
                                    required
                                />
                                <InputGroup size="md">
                                    <Input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        pr="4.5rem"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mot de passe"
                                        variant="flushed"
                                        color="white"
                                        fontSize="1.5rem"
                                        required
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
                                <Button
                                    type="submit"
                                    colorScheme="green"
                                    isLoading={isLoading}
                                    width="100%"
                                >
                                    Se connecter
                                </Button>
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
                        </form>
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
                        <form onSubmit={handleRegister} style={{ width: '80%' }}>
                            <VStack spacing={8} w="100%">
                                <Input
                                    name="username"
                                    value={formRegisterData.username}
                                    onChange={handleInputChange}
                                    placeholder="Identifiant"
                                    variant="flushed"
                                    colorScheme="green"
                                    color="white"
                                    fontSize="1.5rem"
                                    required
                                />
                                <Input
                                    name="email"
                                    value={formRegisterData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    variant="flushed"
                                    colorScheme="green"
                                    color="white"
                                    fontSize="1.5rem"
                                    type="email"
                                    required
                                />
                                <InputGroup size="md">
                                    <Input
                                        name="password"
                                        value={formRegisterData.password}
                                        onChange={handleInputChange}
                                        pr="4.5rem"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mot de passe"
                                        variant="flushed"
                                        color="white"
                                        fontSize="1.5rem"
                                        required
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
                                <InputGroup size="md">
                                    <Input
                                        name="password2"
                                        value={formRegisterData.password2}
                                        onChange={handleInputChange}
                                        pr="4.5rem"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirmer le mot de passe"
                                        variant="flushed"
                                        color="white"
                                        fontSize="1.5rem"
                                        required
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
                                <Button
                                    type="submit"
                                    colorScheme="green"
                                    isLoading={isLoading}
                                    width="100%"
                                >
                                    Créer un compte
                                </Button>
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
                        </form>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}