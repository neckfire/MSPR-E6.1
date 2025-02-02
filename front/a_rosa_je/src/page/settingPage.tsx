import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    IconButton,
    Select,
    Switch,
    Text,
    useColorMode,
    VStack
} from "@chakra-ui/react";
import {FaKey, FaLock, FaSave, FaUser} from "react-icons/fa";

function SettingPage() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            height="100vh"
            ml="15%"
            bg={colorMode === "light" ? "white" : "gray.700"}
            p={8}
        >
            <Box
                w="100%"
                maxW="700px"
                bg={colorMode === "light" ? "white" : "gray.700"}
                borderRadius="lg"
                p={6}
            >
                <Heading size="lg" mb={6} textAlign="center">
                    Paramètres de l'application
                </Heading>

                
                <VStack align="start" mb={6} spacing={4}>
                    <Text fontWeight="bold" fontSize="lg">
                        Général
                    </Text>
                    <HStack justify="space-between" w="100%">
                        <Text>Mode sombre</Text>
                        <Switch
                            isChecked={colorMode === "dark"}
                            onChange={toggleColorMode}
                            colorScheme="green"
                        />
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <Text>Langue</Text>
                        <Select placeholder="Sélectionner la langue" colorScheme="green">
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                            <option value="es">Espagnol</option>
                        </Select>
                    </HStack>
                </VStack>
                <Divider />


                <VStack align="start" my={6} spacing={4}>
                    <Text fontWeight="bold" fontSize="lg">
                        Notifications
                    </Text>
                    <HStack justify="space-between" w="100%">
                        <Text>Notifications push</Text>
                        <Switch colorScheme="green" />
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <Text>Notifications email</Text>
                        <Switch colorScheme="green" />
                    </HStack>
                </VStack>
                <Divider />


                <VStack align="start" my={6} spacing={4}>
                    <Text fontWeight="bold" fontSize="lg">
                        Sécurité
                    </Text>
                    <HStack justify="space-between" w="100%">
                        <Text>Changer le mot de passe</Text>
                        <IconButton
                            aria-label="Modifier le mot de passe"
                            icon={<FaLock />}
                            variant="ghost"
                            colorScheme="green"
                        />
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <Text>Authentification à deux facteurs</Text>
                        <Switch colorScheme="green" />
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <Text>Clés API</Text>
                        <IconButton
                            aria-label="Gérer les clés API"
                            icon={<FaKey />}
                            variant="ghost"
                            colorScheme="green"
                        />
                    </HStack>
                </VStack>
                <Divider />


                <VStack align="start" my={6} spacing={4}>
                    <Text fontWeight="bold" fontSize="lg">
                        Compte
                    </Text>
                    <HStack justify="space-between" w="100%">
                        <Text>Gérer le compte</Text>
                        <IconButton
                            aria-label="Modifier le compte"
                            icon={<FaUser />}
                            variant="ghost"
                            colorScheme="green"
                        />
                    </HStack>
                    <HStack justify="space-between" w="100%">
                        <Text>Supprimer mon compte</Text>
                        <Button colorScheme="red" size="sm">
                            Supprimer
                        </Button>
                    </HStack>
                </VStack>


                <HStack justify="center" mt={6}>
                    <Button
                        colorScheme="green"
                        leftIcon={<FaSave />}
                        size="lg"
                    >
                        Enregistrer
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
}

export default SettingPage;