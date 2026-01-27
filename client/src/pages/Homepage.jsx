import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import FeaturedArticles from '../components/FeaturedArticles';

const Homepage = () => {
    return (
        <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h3" gutterBottom align="center">
                    Welcome to the BSI Wiki
                </Typography>
                <Typography variant="subtitle1" align="center" color="text.secondary">
                    Border Security Initiative - Company Intelligence Database
                </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    About This Site
                </Typography>
                <Typography variant="body1" paragraph>
                    The BSI Wiki serves as a comprehensive knowledge base for companies involved in border 
                    security, defense technology, and related sectors. This platform provides detailed 
                    information about key players in the industry, including their leadership, capabilities, 
                    and market presence.
                </Typography>
                <Typography variant="body1" paragraph>
                    Explore our database to discover companies working on unmanned aerial systems (UAS), 
                    surveillance technology, AI-powered analytics, defense systems, and border security 
                    infrastructure. Each company profile includes executive information, headquarters location, 
                    mission statements, and key operational details.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This is a prototype of the BSI site
                </Typography>
            </Paper>

            <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Research Methodology
                </Typography>
                <Typography variant="body1" paragraph>
                    Our research is grounded in evidence-based methodology, utilizing exclusively open-source 
                    and publicly available information. We are committed to transparency, accuracy, and 
                    educational value in all content presented on this platform.
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    Core Principles
                </Typography>
                <Typography variant="body1" component="div">
                    <Box component="ul" sx={{ pl: 2 }}>
                        <li>
                            <strong>Open Source Intelligence (OSINT):</strong> All information is gathered from 
                            publicly accessible sources including corporate filings, press releases, news articles, 
                            government databases, and official company websites.
                        </li>
                        <li>
                            <strong>Evidence-Based Research:</strong> Each data point is verified through multiple 
                            credible sources to ensure accuracy and reliability.
                        </li>
                        <li>
                            <strong>Educational Purpose:</strong> This database is designed to inform the public 
                            about the border security industrial complex, promote transparency, and support 
                            informed civic engagement.
                        </li>
                        <li>
                            <strong>Ethical Standards:</strong> We maintain strict ethical guidelines, respecting 
                            privacy while providing factual information about public figures and organizations 
                            involved in border security operations.
                        </li>
                        <li>
                            <strong>Continuous Updates:</strong> Information is regularly reviewed and updated to 
                            reflect the latest publicly available data.
                        </li>
                    </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    If you identify any inaccuracies or have additional public information to contribute, 
                    please contact us to help maintain the integrity of this resource.
                </Typography>
            </Paper>

            <FeaturedArticles />
        </Box>
    );
};

export default Homepage;