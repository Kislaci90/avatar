import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import {SetContextLink} from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PitchList from './pages/PitchList';
import PitchDetail from './pages/PitchDetail';
import LocationList from './pages/LocationList';
import LocationDetail from './pages/LocationDetail';
import {ThemeProvider} from "@mui/material";
import theme from "./theme/theme";
import {ApolloProvider} from "@apollo/client/react";
import {Footer} from "./components/Footer.tsx";

const httpLink = new HttpLink({
    uri: 'http://localhost:8080/graphql',
});

const authLink = new SetContextLink((_) => {
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
            <Router>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Navbar/>
                        <main className="container mx-auto px-4 py-8">
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/pitches" element={<PitchList/>}/>
                                <Route path="/pitches/:id" element={<PitchDetail/>}/>
                                <Route path="/locations" element={<LocationList/>}/>
                                <Route path="/locations/:id" element={<LocationDetail/>}/>
                            </Routes>
                        </main>
                        <Footer/>
                    </div>
                </ThemeProvider>
            </Router>
        </ApolloProvider>
    );
}

export default App;
