import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Typography, Paper, CircularProgress, Alert, List, ListItem, Link as MuiLink, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';
import Footer from '../components/Footer';

// Create custom orange marker icon
const createCustomIcon = () => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.5 12.5 28.5S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" 
                      fill="rgba(255, 167, 28, 0.75)" 
                      stroke="#fff" 
                      stroke-width="2"/>
                <circle cx="12.5" cy="12.5" r="5" fill="#fff"/>
            </svg>
        `,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });
};

const MapPage = () => {
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await api.getAllCommunities();
            setCommunities(data);
        } catch (err) {
            console.error('Failed to load communities:', err);
            setError('Failed to load communities: ' + err.message);
        }
        setLoading(false);
    };

    const handleCommunityClick = (communityId) => {
        navigate('/wiki', {
            state: {
                selectedType: 'community',
                selectedId: communityId
            }
        });
    };

    const handlePoliticianClick = (politicianName, politicianId) => {
        navigate('/wiki', {
            state: {
                selectedType: 'politician',
                selectedId: politicianId
            }
        });
    };

    const parseJSON = (jsonString) => {
        if (!jsonString) return [];
        if (typeof jsonString === 'object') return jsonString;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.error('JSON parse error:', e);
            return [];
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Box sx={{ py: 4, px: '5%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
                    US Border Communities
                </Typography>

                <Paper elevation={3} sx={{ height: '67.5vh', width: '80%', overflow: 'hidden' }}>
                    <MapContainer
                        center={[31.7683, -106.4850]} // El Paso, TX - center of US-Mexico border
                        zoom={5}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {communities.map((community) => {
                            const politicians = parseJSON(community.major_politicians);
                            
                            return (
                                <Marker
                                    key={community.id}
                                    position={[community.latitude, community.longitude]}
                                    icon={createCustomIcon()}
                                >
                                    <Popup maxWidth={300}>
                                        <Box sx={{ p: 1 }}>
                                            <MuiLink
                                                component="button"
                                                variant="h6"
                                                onClick={() => handleCommunityClick(community.id)}
                                                sx={{
                                                    cursor: 'pointer',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    color: 'primary.main',
                                                    textAlign: 'left',
                                                    display: 'block',
                                                    mb: 1,
                                                    '&:hover': {
                                                        textDecoration: 'underline'
                                                    }
                                                }}
                                            >
                                                {community.name}
                                            </MuiLink>
                                            
                                            <Divider sx={{ my: 1 }} />
                                            
                                            <Box sx={{ mb: 1 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Population:</strong> {community.population?.toLocaleString()}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Distance from Border:</strong> {community.distance_from_border}
                                                </Typography>
                                            </Box>

                                            {politicians.length > 0 && (
                                                <>
                                                    <Divider sx={{ my: 1 }} />
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                                                        Major Politicians:
                                                    </Typography>
                                                    <List dense disablePadding>
                                                        {politicians.map((pol, index) => (
                                                            <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                                                <MuiLink
                                                                    component="button"
                                                                    variant="body2"
                                                                    onClick={() => handlePoliticianClick(pol.politician, pol.politician_id)}
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        textDecoration: 'none',
                                                                        '&:hover': {
                                                                            textDecoration: 'underline'
                                                                        }
                                                                    }}
                                                                >
                                                                    {pol.politician} ({pol.party})
                                                                </MuiLink>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </>
                                            )}
                                        </Box>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </Paper>

                <Paper elevation={2} sx={{ p: 2, mt: 2, width: '90%' }}>
                    <Typography variant="body2" color="text.secondary">
                        <strong>Map Data:</strong> Showing {communities.length} border communities. 
                        Click on a marker to view community details and politicians.
                    </Typography>
                </Paper>
            </Box>

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default MapPage;