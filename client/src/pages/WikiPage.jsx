import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Box,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Collapse,
    Divider,
    Chip,
    Link as MuiLink,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Avatar,
    IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

const WikiPage = () => {
    const location = useLocation();
    
    // State for navigation
    const [openSections, setOpenSections] = useState({
        communities: false,
        politicians: false,
        profiteers: false,
        resources: false
    });

    // State for data
    const [communities, setCommunities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [politicians, setPoliticians] = useState([]);
    const [loading, setLoading] = useState({
        communities: false,
        profiteers: false,
        politicians: false
    });
    const [error, setError] = useState(null);

    // State for selected content
    const [selectedType, setSelectedType] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    // State for person dialog
    const [personDialogOpen, setPersonDialogOpen] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [loadingPerson, setLoadingPerson] = useState(false);

    const resources = [
        { name: 'The Border Chronicle', url: 'https://www.theborderchronicle.com/' },
        { name: 'Everywhere Border', url: 'https://www.everywhereborder.org/' },
        { name: 'Border Profiteers', url: 'https://borderprofiteers.notion.site/' },
        { name: 'Southern Border', url: 'https://www.southernborder.org/' }
    ];

    // Fetch communities
    const fetchCommunities = async () => {
        if (communities.length > 0) return;
        setLoading(prev => ({ ...prev, communities: true }));
        setError(null);
        try {
            const data = await api.getAllCommunities();
            console.log('Communities data:', data);
            setCommunities(data);
        } catch (err) {
            console.error('Failed to load communities:', err);
            setError('Failed to load communities: ' + err.message);
        }
        setLoading(prev => ({ ...prev, communities: false }));
    };

    // Fetch companies
    const fetchCompanies = async () => {
        if (companies.length > 0) return;
        setLoading(prev => ({ ...prev, profiteers: true }));
        setError(null);
        try {
            const data = await api.getAllCompanies();
            console.log('Companies data:', data);
            setCompanies(data);
        } catch (err) {
            console.error('Failed to load companies:', err);
            setError('Failed to load companies: ' + err.message);
        }
        setLoading(prev => ({ ...prev, profiteers: false }));
    };

    // Fetch politicians
    const fetchPoliticians = async () => {
        if (politicians.length > 0) return;
        setLoading(prev => ({ ...prev, politicians: true }));
        setError(null);
        try {
            const data = await api.getAllPoliticians();
            console.log('Politicians data:', data);
            setPoliticians(data);
        } catch (err) {
            console.error('Failed to load politicians:', err);
            setError('Failed to load politicians: ' + err.message);
        }
        setLoading(prev => ({ ...prev, politicians: false }));
    };

    // Fetch person details
    const handlePersonClick = async (personName) => {
        setLoadingPerson(true);
        setPersonDialogOpen(true);
        try {
            const person = await api.getPersonByName(personName);
            console.log('Person data:', person);
            setSelectedPerson(person);
        } catch (err) {
            console.error('Failed to load person:', err);
            setSelectedPerson({ error: 'Failed to load person details' });
        }
        setLoadingPerson(false);
    };

    const handleClosePersonDialog = () => {
        setPersonDialogOpen(false);
        setSelectedPerson(null);
    };

    const handleSectionClick = (section) => {
        const newState = !openSections[section];
        setOpenSections(prev => ({
            ...prev,
            [section]: newState
        }));

        // Fetch data when opening a section
        if (newState) {
            if (section === 'communities') fetchCommunities();
            if (section === 'profiteers') fetchCompanies();
            if (section === 'politicians') fetchPoliticians();
        }
    };

    const handleItemClick = async (type, item) => {
        setSelectedType(type);
        setError(null);
        
        // Fetch detailed data if needed
        try {
            if (type === 'community') {
                const detailed = await api.getCommunityById(item.id);
                console.log('Community detail:', detailed);
                setSelectedItem(detailed);
            } else if (type === 'company') {
                const detailed = await api.getCompanyById(item.id);
                console.log('Company detail:', detailed);
                setSelectedItem(detailed);
            } else if (type === 'politician') {
                const detailed = await api.getPoliticianById(item.id);
                console.log('Politician detail:', detailed);
                setSelectedItem(detailed);
            }
        } catch (err) {
            console.error('Failed to load details:', err);
            setError('Failed to load details: ' + err.message);
        }
    };

    const handleCloseDetails = () => {
        setSelectedItem(null);
        setSelectedType(null);
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

    const renderCommunityDetail = (community) => {
        const politicians = parseJSON(community.major_politicians);
        
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOnIcon color="primary" />
                        {community.name}
                    </Typography>
                    <IconButton 
                        onClick={handleCloseDetails}
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: 'error.main' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Coordinates
                            </Typography>
                            <Typography variant="body1">
                                {community.latitude}, {community.longitude}
                            </Typography>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Population
                            </Typography>
                            <Typography variant="body1">
                                {community.population?.toLocaleString()}
                            </Typography>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Distance from Border
                            </Typography>
                            <Typography variant="body1">
                                {community.distance_from_border}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Major Politicians
                            </Typography>
                            <List>
                                {politicians.map((pol, index) => (
                                    <ListItem key={index} divider>
                                        <ListItemText
                                            primary={pol.politician}
                                            secondary={pol.party}
                                        />
                                        <Chip 
                                            label={pol.party} 
                                            size="small"
                                            color={pol.party === 'Democratic' ? 'primary' : pol.party === 'Republican' ? 'error' : 'default'}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const renderCompanyDetail = (company) => {
        const founders = parseJSON(company.founders);
        const executives = parseJSON(company.executives);
        
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BusinessIcon color="primary" />
                            {company.company_name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                            {company.legal_name}
                        </Typography>
                    </Box>
                    <IconButton 
                        onClick={handleCloseDetails}
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: 'error.main' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Website
                            </Typography>
                            <MuiLink href={company.website} target="_blank" rel="noopener">
                                {company.website}
                            </MuiLink>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Headquarters
                            </Typography>
                            <Typography variant="body1">{company.headquarters}</Typography>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Market Valuation
                            </Typography>
                            <Typography variant="body1">{company.market_valuation}</Typography>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                                Employees
                            </Typography>
                            <Typography variant="body1">{company.employees}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Mission Statement
                            </Typography>
                            <Typography variant="body1">{company.mission_statement}</Typography>
                        </Paper>

                        {founders.length > 0 && (
                            <Paper elevation={1} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Founders
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {founders.map((founder, index) => (
                                        <Chip 
                                            key={index} 
                                            label={founder} 
                                            color="primary" 
                                            variant="outlined"
                                            onClick={() => handlePersonClick(founder)}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        )}
                    </Grid>

                    {executives.length > 0 && (
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Executive Leadership
                                </Typography>
                                <List>
                                    {executives.map((exec, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={
                                                    <MuiLink
                                                        component="button"
                                                        variant="body1"
                                                        onClick={() => handlePersonClick(exec.name)}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            textDecoration: 'none',
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                    >
                                                        {exec.name}
                                                    </MuiLink>
                                                }
                                                secondary={exec.role}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Box>
        );
    };

    const renderPoliticianDetail = (politician) => {
        const funders = parseJSON(politician.known_funders);
        const legislation = parseJSON(politician.related_legislation);
        
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PeopleIcon color="primary" />
                            {politician.name}
                        </Typography>
                        <Chip 
                            label={politician.party} 
                            color={politician.party === 'Democratic' ? 'primary' : politician.party === 'Republican' ? 'error' : 'default'}
                            sx={{ mt: 1 }}
                        />
                    </Box>
                    <IconButton 
                        onClick={handleCloseDetails}
                        sx={{ 
                            color: 'text.secondary',
                            '&:hover': { color: 'error.main' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />

                <Grid container spacing={3}>
                    {/* Contact and Position Information */}
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Position
                                    </Typography>
                                    <Typography variant="body1" fontWeight="medium">
                                        {politician.position || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Term Dates
                                    </Typography>
                                    <Typography variant="body1">
                                        {politician.term_dates || 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Office Phone
                                    </Typography>
                                    <Typography variant="body1">
                                        {politician.office_number ? (
                                            <MuiLink href={`tel:${politician.office_number.replace(/[^\d]/g, '')}`}>
                                                {politician.office_number}
                                            </MuiLink>
                                        ) : 'N/A'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Office Email
                                    </Typography>
                                    <Typography variant="body1">
                                        {politician.office_email ? (
                                            <MuiLink href={`mailto:${politician.office_email}`}>
                                                {politician.office_email}
                                            </MuiLink>
                                        ) : 'N/A'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Known Funders */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Known Funders
                            </Typography>
                            <List>
                                {funders.length > 0 ? (
                                    funders.map((funder, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={funder} />
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText 
                                            primary="No funder information available" 
                                            primaryTypographyProps={{ color: 'text.secondary', fontStyle: 'italic' }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Related Legislation */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Related Legislation
                            </Typography>
                            <List>
                                {legislation.length > 0 ? (
                                    legislation.map((leg, index) => (
                                        <ListItem key={index}>
                                            <ListItemText primary={leg} />
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText 
                                            primary="No legislation information available" 
                                            primaryTypographyProps={{ color: 'text.secondary', fontStyle: 'italic' }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    const renderPersonDialog = () => {
        const affiliations = selectedPerson ? parseJSON(selectedPerson.affiliations) : [];
        const connections = selectedPerson ? parseJSON(selectedPerson.connections) : [];
        
        return (
            <Dialog 
                open={personDialogOpen} 
                onClose={handleClosePersonDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5">
                        {selectedPerson?.name || 'Loading...'}
                    </Typography>
                    <Button onClick={handleClosePersonDialog} sx={{ minWidth: 'auto' }}>
                        <CloseIcon />
                    </Button>
                </DialogTitle>
                <DialogContent dividers>
                    {loadingPerson ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : selectedPerson?.error ? (
                        <Alert severity="error">{selectedPerson.error}</Alert>
                    ) : selectedPerson ? (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Avatar
                                    src={`/images/people/${selectedPerson.image}`}
                                    alt={selectedPerson.name}
                                    sx={{ 
                                        width: 200, 
                                        height: 200,
                                        border: '3px solid',
                                        borderColor: 'primary.main'
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Role
                                    </Typography>
                                    <Typography variant="body1" fontWeight="medium">
                                        {selectedPerson.role}
                                    </Typography>
                                </Paper>

                                <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Company
                                    </Typography>
                                    <Typography variant="body1">
                                        {selectedPerson.company_name || 'N/A'}
                                    </Typography>
                                </Paper>

                                {affiliations.length > 0 && (
                                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Affiliations
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                            {affiliations.map((affiliation, index) => (
                                                <Chip 
                                                    key={index} 
                                                    label={affiliation} 
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Paper>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Biography
                                    </Typography>
                                    <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                                        {selectedPerson.short_bio}
                                    </Typography>
                                </Paper>
                            </Grid>

                            {connections.length > 0 && (
                                <Grid item xs={12}>
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Notable Connections
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                            {connections.map((connection, index) => (
                                                <Chip 
                                                    key={index} 
                                                    label={connection}
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handlePersonClick(connection)}
                                                    sx={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </Box>
                                    </Paper>
                                </Grid>
                            )}
                        </Grid>
                    ) : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePersonDialog} variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderContent = () => {
        if (error) {
            return (
                <Box sx={{ p: 2 }}>
                    <Alert severity="error">{error}</Alert>
                </Box>
            );
        }

        if (!selectedItem) {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Typography variant="h5" color="text.secondary">
                        {/* Select an item from the navigation to view details */}
                    </Typography>
                </Box>
            );
        }

        switch (selectedType) {
            case 'community':
                return renderCommunityDetail(selectedItem);
            case 'company':
                return renderCompanyDetail(selectedItem);
            case 'politician':
                return renderPoliticianDetail(selectedItem);
            default:
                return null;
        }
    };

    // Handle navigation from featured articles
    useEffect(() => {
        if (location.state?.selectedType && location.state?.selectedId) {
            const { selectedType, selectedId } = location.state;
            
            // Fetch and open the appropriate section
            const loadEntity = async () => {
                try {
                    if (selectedType === 'community') {
                        await fetchCommunities();
                        setOpenSections(prev => ({ ...prev, communities: true }));
                        const community = await api.getCommunityById(selectedId);
                        handleItemClick('community', community);
                    } else if (selectedType === 'company') {
                        await fetchCompanies();
                        setOpenSections(prev => ({ ...prev, profiteers: true }));
                        const company = await api.getCompanyById(selectedId);
                        handleItemClick('company', company);
                    } else if (selectedType === 'politician') {
                        await fetchPoliticians();
                        setOpenSections(prev => ({ ...prev, politicians: true }));
                        const politician = await api.getPoliticianById(selectedId);
                        handleItemClick('politician', politician);
                    } else if (selectedType === 'person') {
                        // For people, we need to find their company first
                        const person = await api.getPersonById(selectedId);
                        handlePersonClick(person.name);
                    }
                } catch (err) {
                    console.error('Failed to load entity from navigation:', err);
                }
            };
            
            loadEntity();
            
            // Clear the navigation state
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <Box sx={{ backgroundColor: '#f6f7fa', minHeight: '100vh', py: 4 }}>
            <Box sx={{ px: '5%' }}>
                <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
                    BSI Wiki
                </Typography>

                <Grid container spacing={3}>
                    {/* Left Navigation Column */}
                    <Grid item xs={12} md={3}>
                        <Paper elevation={2} sx={{ position: 'sticky', top: 20, maxHeight: '85vh', overflow: 'auto' }}>
                            <List component="nav">
                                {/* Communities */}
                                <ListItemButton onClick={() => handleSectionClick('communities')}>
                                    <LocationOnIcon sx={{ mr: 2 }} color="primary" />
                                    <ListItemText primary="Communities" />
                                    {openSections.communities ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.communities} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.communities ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        ) : (
                                            communities.map((community) => (
                                                <ListItemButton
                                                    key={community.id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick('community', community)}
                                                    selected={selectedItem?.id === community.id && selectedType === 'community'}
                                                >
                                                    <ListItemText primary={community.name} />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Politicians */}
                                <ListItemButton onClick={() => handleSectionClick('politicians')}>
                                    <PeopleIcon sx={{ mr: 2 }} color="primary" />
                                    <ListItemText primary="Politicians" />
                                    {openSections.politicians ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.politicians} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.politicians ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        ) : (
                                            politicians.map((politician) => (
                                                <ListItemButton
                                                    key={politician.id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick('politician', politician)}
                                                    selected={selectedItem?.id === politician.id && selectedType === 'politician'}
                                                >
                                                    <ListItemText 
                                                        primary={politician.name}
                                                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Profiteers */}
                                <ListItemButton onClick={() => handleSectionClick('profiteers')}>
                                    <BusinessIcon sx={{ mr: 2 }} color="primary" />
                                    <ListItemText primary="Profiteers" />
                                    {openSections.profiteers ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.profiteers} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.profiteers ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        ) : (
                                            companies.map((company) => (
                                                <ListItemButton
                                                    key={company.id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick('company', company)}
                                                    selected={selectedItem?.id === company.id && selectedType === 'company'}
                                                >
                                                    <ListItemText 
                                                        primary={company.company_name}
                                                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Resources */}
                                <ListItemButton onClick={() => handleSectionClick('resources')}>
                                    <LinkIcon sx={{ mr: 2 }} color="primary" />
                                    <ListItemText primary="Resources" />
                                    {openSections.resources ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.resources} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {resources.map((resource, index) => (
                                            <ListItemButton
                                                key={index}
                                                sx={{ pl: 4 }}
                                                component="a"
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ListItemText 
                                                    primary={resource.name}
                                                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Middle Content Column */}
                    <Grid item xs={12} md={9}>
                        <Paper elevation={2} sx={{ p: 4, minHeight: '70vh' }}>
                            {renderContent()}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Person Dialog */}
            {renderPersonDialog()}
        </Box>
    );
};

export default WikiPage;