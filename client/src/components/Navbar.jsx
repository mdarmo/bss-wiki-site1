import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#0D1E20' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Button 
                    component={Link} 
                    to="/"
                    sx={{ 
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        color: '#F5C06A',
                        '&:hover': { 
                            backgroundColor: 'rgba(245, 192, 106, 0.1)' 
                        }
                    }}
                >
                    BSI Wiki
                </Button>
                <Box sx={{ mr: '15%' }}>
                    <Button 
                        component={Link} 
                        to="/"
                        sx={{ 
                            fontSize: '1.3rem',
                            py: 2,
                            px: 4,
                            color: '#F5C06A',
                            '&:hover': { 
                                backgroundColor: 'rgba(245, 192, 106, 0.1)' 
                            }
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        component={Link} 
                        to="/wiki"
                        sx={{ 
                            fontSize: '1.3rem',
                            py: 2,
                            px: 4,
                            color: '#F5C06A',
                            '&:hover': { 
                                backgroundColor: 'rgba(245, 192, 106, 0.1)' 
                            }
                        }}
                    >
                        Wiki
                    </Button>
                    <Button 
                        component={Link} 
                        to="/map"
                        sx={{ 
                            fontSize: '1.3rem',
                            py: 2,
                            px: 4,
                            color: '#F5C06A',
                            '&:hover': { 
                                backgroundColor: 'rgba(245, 192, 106, 0.1)' 
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