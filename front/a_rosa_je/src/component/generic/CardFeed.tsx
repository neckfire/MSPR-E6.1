import { Avatar, Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";


const CardFeed = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box w={"20%"} h={80} position={"relative"} bg={"gray.400"} borderRadius={5}>
                <IconButton
                    aria-label={""}
                    variant={"ghost"}
                    icon={<i className="fa-regular fa-heart" style={{ fontSize: "1.5rem", color: "black" }} />}
                    size="lg"
                />
                <Flex bg={"#337418"} borderRadius={5} mt={"70%"} p={4} align={"center"} gap={3}>
                    <Avatar size={"md"} />
                    <Text color={"white"} fontWeight={"bold"}>
                        User
                    </Text>
                    <IconButton
                        aria-label={""}
                        variant={"ghost"}
                        icon={<i className="fa-regular fa-comment" style={{ fontSize: "1.5rem", color: "black" }} />}
                        size="lg"
                        ml={"auto"}
                        colorScheme={"green"}
                        onClick={onOpen}
                    />
                </Flex>
            </Box>


            <DrawerComment isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default CardFeed;
