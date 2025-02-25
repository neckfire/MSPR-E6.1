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
    Image, Heading, Badge, useToast,
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

const CardCurrentUser = ({ plant}: CardCurrentUserProps) => {
    const toast = useToast();
    const getImageUrl = (url: string) => {

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        }


        if (url && !url.startsWith('/')) {
            return `http://localhost:8000/${url}`;
        }

        return url || "/placeholder-plant.jpg";
    };

    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${plant.name} ?`)) {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    toast({
                        title: "Erreur",
                        description: "Vous devez être connecté pour effectuer cette action",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                    return;
                }

                const response = await fetch(`http://localhost:8000/plants?plant_id=${plant.id}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Erreur lors de la suppression");
                }

                toast({
                    title: "Succès",
                    description: `La plante "${plant.name}" a été supprimée avec succès`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue";

                toast({
                    title: "Erreur de suppression",
                    description: errorMessage,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });

                console.error("Erreur lors de la suppression:", error);
            }
        }
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
                            className="fa-solid fa-trash"/>}
                                  onClick={handleDelete}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Card>
    );
};

export default CardCurrentUser;