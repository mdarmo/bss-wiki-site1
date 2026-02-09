import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import FeaturedArticles from '../components/FeaturedArticles';
import Footer from '../components/Footer';

const Homepage = () => {
    return (
        <Box sx={{ backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Box sx={{ py: 4, px: { xs: '5%', md: '15%' } }}>
                <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h3" gutterBottom align="center">
                        Welcome to the BSS Wiki
                    </Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary">
                        Border Communities Database
                    </Typography>
                </Paper>

                <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        About This Site
                    </Typography>
                    <Typography variant="body1" paragraph>
                    The <strong>Border and Surveillance Syndicate (BSS) Wiki</strong> is a public knowledge base that, in the simplest way possible, shows how politicians, corporations, profiteers, and influential players are connected and how those connections harm and exploit border communities.
This wiki exists because the border and surveillance industry relies on complexity, jargon, and distance to avoid accountability. We break that down. We document who is involved, who benefits, who makes the decisions, and who lives with the consequences.

                    </Typography>
                    <Typography variant="body1" paragraph>
                        What you will find here:
                    </Typography>
                    <Typography variant="body1" component="div">
                        <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                            <li>
                                <strong>Border Communities:</strong> Profiles of communities directly impacted by border enforcement, surveillance infrastructure, and militarization, including how policies affect daily life, land, safety, and movement.
                            </li>
                            <li>
                                <strong>Politicians:</strong> Elected officials who shape border policy, including their voting records, public statements, funding sources, and relationships with border and surveillance companies.
                            </li>
                            <li>
                                <strong>Corporations:</strong> Companies that build and sell surveillance technology, drones, artificial intelligence systems, detention services, weapons, and border infrastructure, along with their leadership and government contracts.
                            </li>
                            <li>
                                <strong>Profiteers:</strong> Executives, investors, and public figures who personally  benefit from border security and surveillance spending.
                            </li>
                            <li>
                                <strong>Influential Players:</strong> Famous, wealthy, or powerful individuals who operate in the same networks as politicians and corporations and help shape policy, funding, or public narratives.
                            </li>
                            <li>
                                <strong>Resources and Resistance:</strong> Grassroots groups, organizations, and people who are pushing back against the border and surveillance industry in their communities.
                            </li>
                        </Box>
                    </Typography>
                    <Typography variant="body1" paragraph>
                    Each entry is designed to make relationships visible. Profiles link people, companies, and institutions together, so it is easier to see patterns of power, profit, and harm.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This site is a prototype of the broader Border and Surveillance Industry project. It will continue to grow as documentation expands.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    If you want to understand how border harm is organized, funded, and normalized, this wiki is for you.
                    </Typography>
                </Paper>
                <FeaturedArticles />
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default Homepage;