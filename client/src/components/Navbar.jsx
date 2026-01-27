import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgba(255, 167, 28, 0.75)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Button 
                    color="inherit" 
                    component={Link} 
                    to="/"
                    sx={{ 
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': { 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                        }
                    }}
                >
                    BSI Wiki
                </Button>
                <Box sx={{ mr: '15%' }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{ 
                            fontSize: '1.5rem',
                            py: 2,
                            px: 4,
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                            }
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/wiki"
                        sx={{ 
                            fontSize: '1.5rem',
                            py: 2,
                            px: 4,
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                            }
                        }}
                    >
                        Wiki
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/map"
                        sx={{ 
                            fontSize: '1.5rem',
                            py: 2,
                            px: 4,
                            '&:hover': { 
                                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
                            }
                        }}
                    >
                        Map
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;