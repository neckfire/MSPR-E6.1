import GenericModal from "../generic/genericModal.tsx";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Select,
    Textarea,
    VStack,
    Image, Flex, Switch, Text
} from "@chakra-ui/react";
import {useRef} from "react";

interface AddModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddModal = ({ isOpen, onClose }: AddModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleConfirm = () => {
        console.log("Action validée !");
        onClose();
    };
    const handleAdd = () => {
        console.log('wouf wouf')
        fileInputRef.current?.click();
    };


    const plantImages = [
        "/src/assets/img.png",
        "/src/assets/img.png",
        "/src/assets/img.png",
        "/src/assets/img.png",
        "/src/assets/img.png",
    ];

    return (
        <GenericModal
            isOpen={isOpen}
            onClose={onClose}
            title="Ajouter un post"
            size="lg"
            onConfirm={handleConfirm}
        >
            <VStack spacing={4} align="stretch">
                {/* Title Input */}
                <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input placeholder="Enter title" />
                </FormControl>

                {/* Resume Textarea */}
                <FormControl>
                    <FormLabel>Resume</FormLabel>
                    <Textarea placeholder="Enter resume" />
                </FormControl>

                {/* Location Input */}
                <FormControl isRequired>
                    <FormLabel>Location</FormLabel>
                    <HStack>
                        <Input placeholder="Enter location" />
                        <IconButton
                            aria-label="Search location"
                            icon={<i className="fa-solid fa-location-dot"></i>}
                        />
                    </HStack>
                </FormControl>
                <Flex>
                    <FormControl>
                        <Flex gap={5}>
                            <Text>Plantsitting</Text>
                            <Switch colorScheme={"green"}/>
                        </Flex>
                    </FormControl>
                    <FormControl>
                        <Flex gap={5}>
                            <Text>Botanist</Text>
                            <Switch colorScheme={"green"}/>
                        </Flex>
                    </FormControl>
                </Flex>

                {/* Add Button and Select */}
                <Flex gap={4}>
                    <Button leftIcon={<i className="fa-solid fa-plus"></i>} bg={"#337418"} colorScheme={"green"} onClick={handleAdd}>
                        Add
                    </Button>
                    <Select placeholder="Type of plant">
                        <option>Indoor</option>
                        <option>Outdoor</option>
                    </Select>
                </Flex>
                {/* Plant Images */}
                <HStack spacing={4} overflowX="auto" pt={2} sx={{
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#888",
                        borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        background: "#555",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "4px",
                    },
                }}>
                    {plantImages.map((src, index) => (
                        <Box
                            key={index}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            minW="120px"
                        >
                            <Image src={src} alt={`Plant ${index + 1}`} />
                        </Box>
                    ))}
                </HStack>
            </VStack>
        </GenericModal>
    );
};

export default AddModal;
