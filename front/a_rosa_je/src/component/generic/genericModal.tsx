import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalProps,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface GenericModalProps extends Omit<ModalProps, "children"> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"; // Chakra UI modal sizes
    children: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       title = "Titre de la modal",
                                                       size = "md",
                                                       children,
                                                       ...modalProps
                                                   }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size} {...modalProps}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GenericModal;
