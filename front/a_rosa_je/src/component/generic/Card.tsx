import {Avatar, Box, Flex, IconButton, Text} from "@chakra-ui/react";

const Card = () => {
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
                bg={'#1B9476'}
                borderRadius={5}
                mt={"70%"} p={4}
                align={'center'}
                gap={3}
            >
                <Avatar size={"md"}></Avatar>
                <Text color={'white'} fontWeight={"bold"}>User</Text>
                <IconButton
                    aria-label={''}
                    variant={'ghost'}
                    icon={<i className="fa-regular fa-comment" style={{ fontSize: "1.5rem", color: "black" }}/>}
                    size="lg"
                    ml={'auto'}
                    colorScheme={'green'}
                />
            </Flex>
        </Box>
    )
}

export default Card;