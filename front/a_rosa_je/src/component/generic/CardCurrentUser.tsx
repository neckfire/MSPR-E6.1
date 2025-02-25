import {
    Card,
    CardBody,
    Flex,
    Avatar,
    Text,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image, Heading, Badge,
} from "@chakra-ui/react";

interface Plant {
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

interface CardCurrentUserProps {
    plant: Plant;
}

const CardCurrentUser = ({ plant }: CardCurrentUserProps) => {

    const getImageUrl = (url: string) => {

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }


        if (url && !url.startsWith('/')) {
            return `http://localhost:8000/${url}`;
        }

        return url || "/placeholder-plant.jpg";
    };


    return (
        <Card
            position="relative"
            variant="elevation"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            width={80}
            height={350}
        >
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

                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<i
                            className="fa-solid fa-bars" style={{ fontSize: "1.25rem", color: "black" }}/>}
                        variant={'ghost'}
                    />
                    <MenuList>
                        <MenuItem icon={<i
                            className="fa-solid fa-pen"/>}>
                            Edit
                        </MenuItem>
                        <MenuItem icon={<i
                            className="fa-solid fa-trash"/>} >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Card>
    );
};

export default CardCurrentUser;