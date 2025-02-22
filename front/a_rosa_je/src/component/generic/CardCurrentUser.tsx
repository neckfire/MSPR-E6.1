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
    MenuItem
} from "@chakra-ui/react";

const CardCurrentUser = () => {
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
            {/* Main Card Body - Image Area */}
            <CardBody p="0" />

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
                            New Window
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Card>
    );
};

export default CardCurrentUser;