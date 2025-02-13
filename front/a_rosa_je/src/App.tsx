import { Box, ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './component/generic/sidebar';
import ProductManagementPage from './page/stock.tsx';
import theme from './theme';
import AnotherPage from "./page/plantSittingPage.tsx";
import Header from "./component/generic/header.tsx";
import LoginPage from "./page/LoginPage";
import {ReactNode} from "react";
import SettingPage from "./page/settingPage.tsx";

function Layout({ children }: { children: ReactNode }) {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Sidebar />
            <Box>
                <Header />
            </Box>
            <Box>
                {children}
            </Box>
        </>
    );
}

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/plantsitting" element={<ProductManagementPage />} />
                        <Route path="/home" element={<AnotherPage />} />
                        <Route path="/setting" element={<SettingPage />} />
                    </Routes>
                </Layout>
            </Router>
        </ChakraProvider>
    );
}

export default App;
