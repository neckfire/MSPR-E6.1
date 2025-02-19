import {Avatar, Box, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
const CardCurrentUser = () => {
    const navigate = useNavigate();
    return(
        <Box
            w={'20%'}
            h={80}
            position={'relative'}
            bg={'gray.400'}
            borderRadius={5}
        >
            <IconButton aria-label={''} variant={'ghost'} icon={<i
                className="fa-regular fa-heart" style={{ fontSize: "1.5rem", color: "black" }}/>}
                        size="lg"
            />
            <Flex
                bg={'#337418'}
                borderRadius={5}
                mt={"70%"} p={4}
                align={'center'}
                gap={3}
            >
                <Flex justifyContent={'center'} alignItems={'center'} gap={4} onClick={() => navigate('/setting')} cursor={'pointer'}>
                    <Avatar size={"md"}></Avatar>
                    <Text color={'white'} fontWeight={"bold"}>User</Text>
                </Flex>
                <Box ml={'auto'}>
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
                </Box>

            </Flex>
        </Box>
    )
}

export default CardCurrentUser;