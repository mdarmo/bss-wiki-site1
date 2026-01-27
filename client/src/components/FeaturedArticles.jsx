import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Link as MuiLink, Chip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import api from '../services/api';

const FeaturedArticles = () => {
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRandomEntities();
    }, []);

    const fetchRandomEntities = async () => {
        setLoading(true);
        try {
            // Fetch all entities
            const [communities, companies, politicians, people] = await Promise.all([
                api.getAllCommunities(),
                api.getAllCompanies(),
                api.getAllPoliticians(),
                api.getAllPeople()
            ]);

            // Create arrays for each entity type
            const communityEntities = communities.map(c => ({
                id: c.id,
                type: 'community',
                name: c.name,
                description: `Population: ${c.population?.toLocaleString()} | ${c.distance_from_border} from border`,
                icon: LocationOnIcon,
                color: 'success'
            }));

            const politicianEntities = politicians.map(p => ({
                id: p.id,
                type: 'politician',
                name: p.name,
                description: `${p.party} ${p.position || 'politician'} with focus on border security and related legislation`,
                icon: PeopleIcon,
                color: p.party === 'Democratic' ? 'primary' : p.party === 'Republican' ? 'error' : 'default'
            }));

            const companyEntities = companies.map(c => ({
                id: c.id,
                type: 'company',
                name: c.company_name,
                description: c.mission_statement?.substring(0, 100) + '...' || 'Defense and border security company',
                icon: BusinessIcon,
                color: 'primary'
            }));

            const peopleEntities = people.map(p => ({
                id: p.id,
                type: 'person',
                name: p.name,
                description: `${p.role} ${p.company_name ? 'at ' + p.company_name : ''}`,
                icon: PersonIcon,
                color: 'info'
            }));

            // Select one random entity from each required category
            const selected = [];

            // First: Random community
            if (communityEntities.length > 0) {
                const randomCommunity = communityEntities[Math.floor(Math.random() * communityEntities.length)];
                selected.push(randomCommunity);
            }

            // Second: Random politician
            if (politicianEntities.length > 0) {
                const randomPolitician = politicianEntities[Math.floor(Math.random() * politicianEntities.length)];
                selected.push(randomPolitician);
            }

            // Third: Random company or person
            const thirdOptions = [...companyEntities, ...peopleEntities];
            if (thirdOptions.length > 0) {
                const randomThird = thirdOptions[Math.floor(Math.random() * thirdOptions.length)];
                selected.push(randomThird);
            }
            
            setFeatured(selected);
        } catch (err) {
            console.error('Failed to load featured entities:', err);
        }
        setLoading(false);
    };

    const handleEntityClick = (entity) => {
        // Navigate to wiki page with state to pre-select the entity
        navigate('/wiki', { 
            state: { 
                selectedType: entity.type, 
                selectedId: entity.id 
            } 
        });
    };

    if (loading) {
        return (
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom align="center">
                Featured Entities
            </Typography>
            <Grid container spacing={3}>
                {featured.map((entity, index) => {
                    const IconComponent = entity.icon;
                    return (
                        <Grid item xs={12} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4
                                    }
                                }}
                                onClick={() => handleEntityClick(entity)}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                        <IconComponent color={entity.color} />
                                        <Chip 
                                            label={entity.type.toUpperCase()} 
                                            size="small" 
                                            color={entity.color}
                                            variant="outlined"
                                        />
                                    </Box>
                                    <MuiLink
                                        component="button"
                                        variant="h6"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleEntityClick(entity);
                                        }}
                                        sx={{
                                            textDecoration: 'none',
                                            textAlign: 'left',
                                            color: 'primary.main',
                                            fontWeight: 'bold',
                                            mb: 1,
                                            display: 'block',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        {entity.name}
                                    </MuiLink>
                                    <Typography variant="body2" color="text.secondary">
                                        {entity.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default FeaturedArticles;