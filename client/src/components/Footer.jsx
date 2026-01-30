import React from 'react';
import { Box, Typography, Container, Link as MuiLink, Divider, Grid } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#0D1E20',
                color: 'white',
                py: 4,
                mt: 8
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* About Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            About BSI Wiki
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                            A comprehensive database documenting communities, politicians, 
                            corporations, and individuals involved in the Border Security Initiative.
                        </Typography>
                    </Grid>

                    {/* Quick Links Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Quick Links
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <MuiLink 
                                href="/wiki#communities" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                Communities
                            </MuiLink>
                            <MuiLink 
                                href="/wiki#politicians" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                Politicians
                            </MuiLink>
                            <MuiLink 
                                href="/wiki#corporations" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                Corporations
                            </MuiLink>
                            <MuiLink 
                                href="/wiki#profiteers" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                Profiteers
                            </MuiLink>
                            <MuiLink 
                                href="/wiki#resources" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                Resources
                            </MuiLink>
                        </Box>
                    </Grid>

                    {/* Contact Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <EmailIcon sx={{ fontSize: '1.2rem', opacity: 0.9 }} />
                                <MuiLink 
                                    href="mailto:info@bsiwiki.org" 
                                    color="inherit" 
                                    underline="hover"
                                    sx={{ opacity: 0.9 }}
                                >
                                    info@bsiwiki.org
                                </MuiLink>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <GitHubIcon sx={{ fontSize: '1.2rem', opacity: 0.9 }} />
                                <MuiLink 
                                    href="https://github.com/bsiwiki" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    color="inherit" 
                                    underline="hover"
                                    sx={{ opacity: 0.9 }}
                                >
                                    GitHub Repository
                                </MuiLink>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                {/* Bottom Bar */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CopyrightIcon sx={{ fontSize: '1rem', opacity: 0.7 }} />
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {new Date().getFullYear()} BSI Wiki. All rights reserved.
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <MuiLink 
                            href="#privacy" 
                            color="inherit" 
                            underline="hover"
                            variant="body2"
                            sx={{ opacity: 0.7 }}
                        >
                            Privacy Policy
                        </MuiLink>
                        <MuiLink 
                            href="#terms" 
                            color="inherit" 
                            underline="hover"
                            variant="body2"
                            sx={{ opacity: 0.7 }}
                        >
                            Terms of Use
                        </MuiLink>
                        <MuiLink 
                            href="#license" 
                            color="inherit" 
                            underline="hover"
                            variant="body2"
                            sx={{ opacity: 0.7 }}
                        >
                            License
                        </MuiLink>
                    </Box>
                </Box>

                {/* License Information */}
                <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Typography variant="caption" sx={{ opacity: 0.6, display: 'block', textAlign: 'center' }}>
                        Licensed under MIT License. Content available for educational and research purposes.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;