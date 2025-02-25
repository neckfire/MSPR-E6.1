import {
    Card,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton,
    useDisclosure,
    Image,
    Heading,
    Badge,
} from "@chakra-ui/react";
import DrawerComment from "../specific/Comment/DrawerComment.tsx";

interface PlantProps {
    plant: {
        name: string;
        location: string;
        care_instructions: string;
        id: number;
        photo_url: string;
        owner_id: number;
        created_at: string;
        in_care: boolean;
        plant_sitting: number | null;
    }
}

const CardFeed = ({ plant }: PlantProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const getImageUrl = (url: string) => {

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }


        if (url && !url.startsWith('/')) {
            return `http://${url}`;
        }

        return url || "/placeholder-plant.jpg";
    };

    return (
        <>
            <Card
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                width={80}
                height={350}
                position="relative"
            >
                {/* Heart Icon */}
                <IconButton
                    icon={<i className="fa-solid fa-heart" style={{ fontSize: "1.25rem", color: "black" }}></i>}
                    variant="ghost"
                    position="absolute"
                    top="2"
                    right="2"
                    color="gray.600"
                    _hover={{ color: "red.500" }}
                    aria-label="Like"
                    size="sm"
                    zIndex="1"
                />
                {/* Main Card Body - Image Area */}
                <CardBody p={3}>
                    <Image
                    src={getImageUrl(plant.photo_url)}
                    alt={plant.name}
                    objectFit="cover"
                    height="200px"
                    width="100%"
                    fallbackSrc="/placeholder-plant.jpg"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-plant.jpg";
                    }}
                />
                    <Heading size="md" mb={1}>{plant.name}</Heading>

                    {plant.in_care && (
                        <Badge colorScheme="blue" mb={2}>En attente</Badge>
                    )}

                    <Text fontSize="sm" color="gray.600" mb={2}>
                        <b>Lieu:</b> {plant.location}
                    </Text>
                    {/* User Info Bar */}
                    <Flex justifyContent="space-between" alignItems="center" mt="auto">
                        <Flex alignItems="center">
                            <Avatar size="xs" mr={2} />
                            <Text fontSize="sm">Propriétaire #{plant.owner_id}</Text>
                        </Flex>
                    </Flex>
                </CardBody>
                <Flex
                    bg={'#337418'}
                    p="2"
                    align="center"
                    justify="space-between"
                    position="absolute"
                    bottom="0"
                    width="100%"
                >
                    <Flex align="center" gap="2">
                        <Avatar src="" />
                        <Text color="white" fontSize="sm">Owner</Text>
                    </Flex>
                    <IconButton
                        icon={<i className="fa-regular fa-comment-dots" style={{ fontSize: "1.25rem", color: "white" }}></i>}
                        variant="ghost"
                        onClick={onOpen}
                        colorScheme="green"
                        color={'white'}
                        aria-label="Commentaires"
                    />
                </Flex>
            </Card>
            <DrawerComment isOpen={isOpen} onClose={onClose} plantId={plant.id} />
        </>
    );
};

export default CardFeed;