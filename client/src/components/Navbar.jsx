import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#0D1E20' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography 
                    variant="h6"
                    sx={{ 
                        fontSize: '1.6rem',
                        left: '10%',
                        marginLeft: '5%',
                        marginRight: '5%',
                        fontWeight: 'bold',
                        color: '#F5C06A'
                    }}
                >
                    Border and Surveillance Syndicate
                </Typography>
                <Box sx={{ mr: '15%' }}>
                    <Button 
                        component={Link} 
                        to="/"
                        sx={{ 
                            fontSize: '1.4rem',
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
                            fontSize: '1.4rem',
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
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;