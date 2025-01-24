import {Avatar, Box, Button, Icon, Input, Stack} from "@chakra-ui/react";
import {AddIcon, Search2Icon} from "@chakra-ui/icons";



function Header() {

    return(
            <Box
                ml='15%'
                w='85%'
                bg='#124660'
                position="fixed"
                p={4}
                color='white'
                display='flex'
            >
                <Stack w='25%' direction='row' spacing={4} align='center' >
                    <Input placeholder="Search" size="lg" variant='flushed'/>
                    <Icon as={Search2Icon}/>

                    <Stack>
                        <Button leftIcon={<AddIcon/>} bg='#1B9476' color='white'>
                            Ajouter
                        </Button>
                    </Stack>
                </Stack>
                <Stack marginLeft='auto' align='center' cursor='pointer'>
                    <Avatar name="lucas laliche"/>
                </Stack>



            </Box>
        )
}

export default Header;