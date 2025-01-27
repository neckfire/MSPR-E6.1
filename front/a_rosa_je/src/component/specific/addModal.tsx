import {useDisclosure } from "@chakra-ui/react";
import GenericModal from "../generic/genericModal.tsx";

const AddModal = () => {
    const { isOpen, onClose } = useDisclosure();

    return (
            <GenericModal
                isOpen={isOpen}
                onClose={onClose}
                title="Ajouter un post"
                size="lg"
            >
jjjjjjjj
            </GenericModal>
    );
};

export default AddModal;
