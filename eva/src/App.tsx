import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import {SetContextLink} from '@apollo/client/link/context';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PitchList from './pages/PitchList';
import PitchDetail from './pages/PitchDetail.tsx';
import LocationList from './pages/LocationList';
import LocationDetail from './pages/LocationDetail';
import {ThemeProvider} from "@mui/material";
import theme from "./theme/theme.ts";
import {ApolloProvider} from "@apollo/client/react";
import {Footer} from "./components/Footer.tsx";
import {AppBreadcrumbs} from "./components/AppBreadcrumbs.tsx";

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
});

const authLink = new SetContextLink(() => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Navbar/>
                        <AppBreadcrumbs />
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/pitches" element={<PitchList/>}/>
                            <Route path="/pitches/:id" element={<PitchDetail/>}/>
                            <Route path="/locations" element={<LocationList/>}/>
                            <Route path="/locations/:id" element={<LocationDetail/>}/>
                        </Routes>
                        <Footer/>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
