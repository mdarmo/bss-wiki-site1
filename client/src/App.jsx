import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import WikiPage from './pages/WikiPage';
import MapPage from './pages/MapPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: [
            'LeagueSpartan',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
        ].join(','),
        fontSize: 14,
        h1: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
        },
        h2: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 700,
            fontSize: '2.5rem',
        },
        h3: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 700,
            fontSize: '2rem',
        },
        h4: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 500,
            fontSize: '1.75rem',
        },
        h5: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 500,
            fontSize: '1.5rem',
        },
        h6: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 500,
            fontSize: '1.25rem',
        },
        body1: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        button: {
            fontFamily: 'LeagueSpartan, sans-serif',
            fontWeight: 500,
            textTransform: 'none',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/wiki" element={<WikiPage />} />
                    <Route path="/map" element={<MapPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;