
import {
    Box,
    VStack,
    Button,
    Text,
    Flex,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation(); // Hook pour obtenir l'URL actuelle

    const menuItems = [
        { id: 'home', label: 'Home', icon: 'fa-solid fa-home', href: '/home' },
        { id: 'plantsitting', label: 'Plantsitting', icon: 'fa-solid fa-seedling', href: '/plantsitting' },
        { id: 'setting', label: 'Settings', icon: 'fa-solid fa-gear', href: '/setting' }
    ];

    const isActive = (href) => {
        return location.pathname === href;
    };

    return (
        <Box
            position="fixed"
            left="0"
            top="0"
            as="nav"
            w={{ base: "25%", md: "20%", lg: "15%" }}
            h="100vh"
            bg="black"
            color="white"
            p="5"
            zIndex={1000}
        >
            <Flex
                mb="8"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Text fontSize="4xl">
                    icone a-rosa-je
                </Text>
            </Flex>

            <VStack spacing="4" align="stretch">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        padding={8}
                        as="a"
                        href={item.href}
                        variant="ghost"
                        color={isActive(item.href) ? "#5DD62C" : 'white'}
                        leftIcon={<i className={item.icon}></i>}
                        justifyContent="flex-start"
                        fontSize="2xl"
                        w="100%"
                        _hover={{
                            color: "#5DD62C",
                            transform: "scale(1.05)",
                        }}
                        sx={{
                            '&[data-active]': {
                                color: "#5DD62C !important",
                            }
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </VStack>
        </Box>
    );
}

export default Sidebar;