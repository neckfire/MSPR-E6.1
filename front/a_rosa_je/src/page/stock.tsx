import Card from "../component/generic/Card.tsx";
import {Box} from "@chakra-ui/react";


function Plantsitting() {
    return (
        <>
            <Box w={'100vw'} h={'100vh'} bgImage="url(/src/assets/bg.png)"  bgSize={"cover"} mt={0}>
                <Box backdropFilter='blur(10px)' h={'100vh'}>
                    <Box ml={'20%'} pt={28}  >
                        <Card/>
                    </Box>
                </Box>

            </Box>

        </>


    )
}

export default Plantsitting;