import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './component/generic/sidebar';
import ProductManagementPage from './page/stock.tsx';
import theme from './theme';
import AnotherPage from "./page/another";
import Header from "./component/generic/header.tsx";

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Sidebar />
                <Header/>
                <div style={{ width: '80%'  ,marginLeft: '10%'}}>
                    <Routes>
                        <Route path="/stock" element={<ProductManagementPage />} />
                        <Route path="/another" element={<AnotherPage/>} />
                    </Routes>
                </div>
            </Router>
        </ChakraProvider>
    );
}

export default App;
