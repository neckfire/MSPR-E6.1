import { Box, Grid, Flex } from "@chakra-ui/react";
import CardCurrentUser from "../component/generic/CardCurrentUser.tsx";
import { useEffect } from "react";
import KPI from "../component/specific/StatOverlay/KPI.tsx";

const HomePage = () => {



    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <Box
            w="100vw"
            h="100vh"
            bgImage="url(/src/assets/bg.png)"
            bgSize="cover"
            bgAttachment="fixed"
        >
            <Box backdropFilter="blur(10px)" h="100%">
                <Flex
                    gap="6"
                    pt={24}
                    overflowY="scroll"
                    h="100%"
                    sx={{
                        overflow: 'auto',
                        position: 'relative',

                        // Firefox scrollbar styling
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#888888 #f1f1f1',

                        // Webkit (Chrome, Safari, Edge) scrollbar styling
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888888',
                            borderRadius: '4px',
                            '&:hover': {
                                background: '#555555',
                            },
                        },

                        // Hide default arrows
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                        },
                    }}
                >

                    <Grid
                        templateColumns="repeat(3, 1fr)"
                        gap="10"
                        flex="1"
                        maxW="800px"
                        mx="auto"
                    >
                        {[...Array(9)].map((_, index) => (
                            <CardCurrentUser key={index} />
                        ))}
                    </Grid>
                    <KPI/>
                </Flex>
            </Box>
        </Box>
    );
};

export default HomePage;

