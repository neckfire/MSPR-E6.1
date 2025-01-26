import {Box, Flex, Input, InputGroup, InputRightElement, Stack} from "@chakra-ui/react";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";
import GenericButton from "./genericButton.tsx";
import AvatarMenu from "./avatar.tsx";
import img from "../../assets/img.png"



function Header() {

    return(
            <Box
                h="10%"
                ml='15%'
                w='85%'
                bg='#124660'
                position="fixed"
                p={4}
                color='white'
                display='flex'
            >
                <Stack w='25%' direction='row' spacing={4} align='center' >
                    <InputGroup>
                    <Input placeholder="Rechercher..." size="lg" variant='outline' />
                        <InputRightElement  alignItems='center' >
                            <Search2Icon fontSize={20}/>
                        </InputRightElement>
                    </InputGroup>
                </Stack>
                <Flex ml={'auto'} gap={5} align='center'>
                    <GenericButton
                        label={'Ajouter'}
                        leftIcon={<AddIcon/>}
                    />
                    <AvatarMenu avatarUrl={img}/>

                </Flex>
            </Box>
        )
}

export default Header;