import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#1a237e', color: 'white', py: 3, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} BSI Wiki - Border Security Initiative
                </Typography>
                <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
                    This is a prototype of the BSI site
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;