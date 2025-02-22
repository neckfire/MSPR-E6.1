import CardFeed from "../component/generic/CardFeed.tsx";
import {Box} from "@chakra-ui/react";
import CardCurrentUser from "../component/generic/CardCurrentUser.tsx";


function HomePage() {
    return (
        <>
            <Box w={'100vw'} h={'100vh'} bgImage="url(/src/assets/bg.png)"  bgSize={"cover"} mt={0}>
                <Box backdropFilter='blur(10px)' h={'100vh'}>
                    <Box ml={'20%'} pt={28} >
                        <CardFeed/>
                        <CardCurrentUser/>
                    </Box>
                </Box>
            </Box>

        </>


    )
}

export default HomePage;