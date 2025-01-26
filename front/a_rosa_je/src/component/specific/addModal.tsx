import {useDisclosure } from "@chakra-ui/react";
import GenericModal from "../generic/genericModal.tsx";

const addModal = () => {
    const { isOpen, onClose } = useDisclosure();

    return (
            <GenericModal
                isOpen={isOpen}
                onClose={onClose}
                title="Ma Modal Générique"
                size="lg"
            >
AAAAAAAAAAA
            </GenericModal>
    );
};

export default addModal;
