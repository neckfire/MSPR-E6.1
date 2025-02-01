import {
    Box,
    VStack,
    Button,
    // Icon,
    Text,
    Flex,
} from '@chakra-ui/react';

function Sidebar() {
    return (
        <Box
            position="fixed"
            left="0"
            top="0"
            as="nav"
            w={{ base: "25%", md: "20%", lg: "15%" }}
            h="100vh"
            bg="#124660"
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
                <Text fontSize="4xl" >
                    icone a-rosa-je
                </Text>
            </Flex>

            <VStack spacing="4" align="stretch" >
                <Button
                    padding={8}
                    as="a"
                    href="/another"
                    variant="ghost"
                    color={"white"}
                    leftIcon={<i className="fa-solid fa-home"></i>}
                    justifyContent="flex-start"
                    fontSize="2xl"
                    w="100%"
                    _hover={{
                        bg: "#127db2cc",
                        transform: "scale(1.05)",
                    }}
                >
                    Home
                </Button>

                <Button
                    as="a"
                    padding={8}
                    href="/stock"
                    variant="ghost"
                    color={"white"}
                    leftIcon={<i className="fa-solid fa-seedling"></i>}
                    justifyContent="flex-start"
                    w="100%"
                    fontSize="2xl"
                    _hover={{
                        bg: "#127db2cc",
                        transform: "scale(1.05)",
                    }}
                >
                    Plantsitting
                </Button>

                <Button
                    as="a"
                    padding={8}
                    href="/setting"
                    variant="ghost"
                    color=  "white"
                    leftIcon={<i className="fa-solid fa-gear"></i>}
                    justifyContent="flex-start"
                    w="100%"
                    fontSize="2xl"
                    _hover={{
                        bg: "#127db2cc",
                        transform: "scale(1.05)",
                    }}
                >
                    Settings
                </Button>
            </VStack>
        </Box>
    );
}

export default Sidebar;
