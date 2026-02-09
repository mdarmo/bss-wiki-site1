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
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            About BSS Wiki
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.7 }}>
                            A comprehensive database documenting border communities as well as politicians, 
                            corporations, and individuals involved in the border security.
                        </Typography>
                    </Grid>

                    {/* Contact Section */}
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <EmailIcon sx={{ fontSize: '1.2rem', opacity: 0.9 }} />
                            <MuiLink 
                                href="mailto:info@bsswiki.org" 
                                color="inherit" 
                                underline="hover"
                                sx={{ opacity: 0.9 }}
                            >
                                info@bsswiki.org
                            </MuiLink>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                {/* Bottom Bar */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CopyrightIcon sx={{ fontSize: '1rem', opacity: 0.7 }} />
                        <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            {new Date().getFullYear()} BSS Wiki. All rights reserved.
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
                        Content available for educational and research purposes.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;