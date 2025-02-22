import {
    Card,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton,
    useDisclosure
} from "@chakra-ui/react";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";

const CardFeed = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <Card
            position="relative"
            variant="elevation"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            width={80}
            height={350}
        >
            {/* Heart Icon */}
            <IconButton
                icon={<i className="fa-solid fa-heart" style={{fontSize: "1.5rem", color: "black"}}/>}
                variant="ghost"
                position="absolute"
                top="2"
                left="2"
                color="gray.600"
                _hover={{ color: "red.500" }}
                aria-label="Like"
                size="sm"
            />

            {/* Main Card Body - Image Area */}
            <CardBody p="0" cursor="pointer"/>

            {/* User Info Bar */}
            <Flex
                bg={'#337418'}
                p="2"
                align="center"
                justify="space-between"
            >
                <Flex align="center" gap="2">
                    <Avatar  src="" />
                    <Text color="white" fontSize="sm">User</Text>
                </Flex>
                <IconButton
                    aria-label='Options'
                    icon={<i className="fa-regular fa-comment-dots" style={{ fontSize: "1.25rem", color: "white" }}/>}
                    variant={'ghost'}
                    onClick={onOpen}
                    colorScheme={'green'}
                />
            </Flex>
        </Card>
    <DrawerComment isOpen={isOpen} onClose={onClose} />
    </>
    );
};

export default CardFeed;