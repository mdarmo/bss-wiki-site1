import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1a237e' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BSI Wiki - Border Security Initiative
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/list">Companies</Button>
                    <Button color="inherit" component={Link} to="/explorer">Explorer</Button>
                    <Button color="inherit" component={Link} to="/network">Network</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;