import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useCurrentUserStore from "../store/CurrentUser";
// import { fetchUserInfo } from "../api/GetUserInfos";
import {loginUser, registerUser} from "../api/authQuery.ts";
import {LoginForm} from "../component/specific/login/loginForm.tsx";
import {RegisterForm} from "../component/specific/login/registerForm.tsx";

export default function LoginPage() {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formRegisterData, setFormRegisterData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        is_botanist: false
    });

    const navigate = useNavigate();
    const toast = useToast();
    const setCurrentUser = useCurrentUserStore(state => state.setCurrentUser);

    const handleToggleMode = () => {
        setIsLoginMode(prev => !prev);
        if (prev) {
            setFormData({ email: "", password: "" });
        } else {
            setFormRegisterData({
                username: "",
                email: "",
                phone: "",
                password: "",
                password2: "",
                is_botanist: false
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isLoginMode) {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormRegisterData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const loginCredentials = {
                email: formData.email,
                password: formData.password
            };

            const data = await loginUser(loginCredentials);

            if (data.access_token) {
                localStorage.setItem('token', data.access_token);

                setCurrentUser({
                    email: formData.email,
                    token: data.access_token
                });

                toast({
                    title: "Connexion réussie",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                navigate("/home");
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
            toast({
                title: "Erreur de connexion",
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

        // Vérifier les champs obligatoires
        if (!formRegisterData.username || !formRegisterData.email || !formRegisterData.phone || !formRegisterData.password) {
            toast({
                title: "Erreur",
                description: "Tous les champs sont obligatoires",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        // Vérifier que les mots de passe correspondent
        if (formRegisterData.password !== formRegisterData.password2) {
            toast({
                title: "Erreur",
                description: "Les mots de passe ne correspondent pas",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        try {
            // Créer l'objet à envoyer à l'API
            const userData = {
                username: formRegisterData.username,
                email: formRegisterData.email,
                phone: formRegisterData.phone,
                password: formRegisterData.password,
                is_botanist: formRegisterData.is_botanist || false
            };

            await registerUser(userData);
            toast({
                title: "Compte créé avec succès",
                description: "Vous pouvez maintenant vous connecter",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsLoginMode(true);
        } catch (error) {
            toast({
                title: "Erreur d'inscription",
                description: error.message || "Une erreur est survenue lors de l'inscription",
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
            bgSize="cover"
            p={2}
            overflow="hidden"
        >
            <Box
                width="800px"
                height={isLoginMode ? "400" : "800"}
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(10px)"
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
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">Connexion</Heading>
                        <LoginForm
                            formData={formData}
                            onSubmit={handleLogin}
                            onChange={handleInputChange}
                            isLoading={isLoading}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onToggleMode={handleToggleMode}
                        />
                    </Box>
                    <Box
                        width="50%"
                        bg="rgba(0, 0, 0, 0.6)"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        p={8}
                    >
                        <Heading mb={6} color="white">Créer un compte</Heading>
                        <RegisterForm
                            formData={formRegisterData}
                            onSubmit={handleRegister}
                            onChange={handleInputChange}
                            isLoading={isLoading}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onToggleMode={handleToggleMode}
                        />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}