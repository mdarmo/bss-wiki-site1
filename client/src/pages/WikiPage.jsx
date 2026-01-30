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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CampaignIcon from '@mui/icons-material/Campaign'; // Add this import
import api from '../services/api';
import Footer from '../components/Footer';

const WikiPage = () => {
    const location = useLocation();
    
    // State for navigation
    const [openSections, setOpenSections] = useState({
        communities: false,
        politicians: false,
        corporations: false,
        profiteers: false,
        influence: false, // Add this
        resources: false
    });

    // State for data
    const [communities, setCommunities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [politicians, setPoliticians] = useState([]);
    const [people, setPeople] = useState([]);
    const [influencers, setInfluencers] = useState([]); // Add this
    const [loading, setLoading] = useState({
        communities: false,
        corporations: false,
        politicians: false,
        profiteers: false,
        influence: false // Add this
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

    // Add this ref at the top of the WikiPage component with other state declarations
    const contentRef = React.useRef(null);
    const menuRef = React.useRef(null);

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
        setLoading(prev => ({ ...prev, corporations: true }));
        setError(null);
        try {
            const data = await api.getAllCompanies();
            console.log('Companies data:', data);
            setCompanies(data);
        } catch (err) {
            console.error('Failed to load companies:', err);
            setError('Failed to load companies: ' + err.message);
        }
        setLoading(prev => ({ ...prev, corporations: false }));
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

    // Add fetch people function
    const fetchPeople = async () => {
        if (people.length > 0) return;
        setLoading(prev => ({ ...prev, profiteers: true }));
        setError(null);
        try {
            const data = await api.getAllPeople();
            console.log('People data:', data);
            setPeople(data);
        } catch (err) {
            console.error('Failed to load people:', err);
            setError('Failed to load people: ' + err.message);
        }
        setLoading(prev => ({ ...prev, profiteers: false }));
    };

    // Add fetch influencers function after fetchPeople
    const fetchInfluencers = async () => {
        if (influencers.length > 0) return;
        setLoading(prev => ({ ...prev, influence: true }));
        setError(null);
        try {
            const data = await api.getAllInfluencers();
            console.log('Influencers data:', data);
            setInfluencers(data);
        } catch (err) {
            console.error('Failed to load influencers:', err);
            setError('Failed to load influencers: ' + err.message);
        }
        setLoading(prev => ({ ...prev, influence: false }));
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
            if (section === 'corporations') fetchCompanies();
            if (section === 'politicians') fetchPoliticians();
            if (section === 'profiteers') fetchPeople();
            if (section === 'influence') fetchInfluencers(); // Add this
        }
    };

    // Update the handleItemClick function to scroll to content on mobile
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
            } else if (type === 'person') {
                const detailed = await api.getPersonById(item.id);
                console.log('Person detail:', detailed);
                setSelectedItem(detailed);
            } else if (type === 'influencer') { // Add this
                const detailed = await api.getInfluencerById(item.id);
                console.log('Influencer detail:', detailed);
                setSelectedItem(detailed);
            }
            
            // Scroll to content on mobile, top on desktop
            setTimeout(() => {
                if (window.innerWidth < 900) { // md breakpoint
                    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    scrollToTop();
                }
            }, 100);
        } catch (err) {
            console.error('Failed to load details:', err);
            setError('Failed to load details: ' + err.message);
        }
    };

    // Update handleCloseDetails to scroll to menu on mobile
    const handleCloseDetails = () => {
        setSelectedItem(null);
        setSelectedType(null);
        
        // Scroll to menu on mobile
        setTimeout(() => {
            if (window.innerWidth < 900) { // md breakpoint
                menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
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

    // Add this function at the component level, after handleCloseDetails
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Add this function after handleCloseDetails
    const handlePoliticianClickFromCommunity = async (politicianName) => {
        try {
            // Ensure politicians are loaded
            if (politicians.length === 0) {
                await fetchPoliticians();
            }
            
            // Open politicians section
            setOpenSections(prev => ({
                ...prev,
                politicians: true,
                communities: false
            }));

            // Fetch politician by name
            const politician = await api.getPoliticianByName(politicianName);
            
            if (politician) {
                // Display politician details and select in menu
                setSelectedType('politician');
                setSelectedItem(politician);
                
                // Scroll to top after content loads
                setTimeout(() => scrollToTop(), 100);
            } else {
                console.error('Politician not found:', politicianName);
                setError(`Politician "${politicianName}" not found`);
            }
        } catch (error) {
            console.error('Error fetching politician:', error);
            setError(`Failed to load politician: ${error.message}`);
        }
    };

    const renderCommunityDetail = (community) => {
        const communityPoliticians = parseJSON(community.major_politicians);
        
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
                    {/* Community Image - reduced by 40% */}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <Box
                            component="img"
                            src={`/images/communities/${community.image || 'placeholder.jpg'}`}
                            alt={community.name}
                            sx={{
                                width: '60%',
                                maxWidth: 480,
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                                objectFit: 'cover'
                            }}
                            onError={(e) => {
                                e.target.src = '/images/communities/placeholder.jpg';
                            }}
                        />
                    </Grid>

                    {/* Description */}
                    {community.description && (
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    About {community.name}
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                    {community.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    )}

                    {/* Community Details Grid */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Population
                            </Typography>
                            <Typography variant="h6">
                                {community.population?.toLocaleString() || 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Distance from Border
                            </Typography>
                            <Typography variant="h6">
                                {community.distance_from_border || 'N/A'}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Major Politicians Section */}
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Major Politicians
                            </Typography>
                            <List>
                                {communityPoliticians.length > 0 ? (
                                    communityPoliticians.map((pol, index) => (
                                        <ListItem 
                                            key={`${pol.politician}-${index}`}
                                            sx={{ 
                                                borderLeft: `4px solid ${
                                                    pol.party === 'Democratic' ? '#1976d2' : 
                                                    pol.party === 'Republican' ? '#d32f2f' : 
                                                    '#757575'
                                                }`,
                                                mb: 1,
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: 1
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <MuiLink
                                                        component="button"
                                                        variant="body1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            console.log('Clicking politician:', pol.politician);
                                                            handlePoliticianClickFromCommunity(pol.politician);
                                                        }}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            fontWeight: 'medium',
                                                            textDecoration: 'none',
                                                            background: 'none',
                                                            border: 'none',
                                                            padding: 0,
                                                            color: 'primary.main',
                                                            textAlign: 'left',
                                                            font: 'inherit',
                                                            '&:hover': {
                                                                textDecoration: 'underline'
                                                            }
                                                        }}
                                                    >
                                                        {pol.politician}
                                                    </MuiLink>
                                                }
                                                secondary={pol.party}
                                            />
                                        </ListItem>
                                    ))
                                ) : (
                                    <ListItem>
                                        <ListItemText 
                                            primary="No politician information available" 
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

    const renderCompanyDetail = (company) => {
        const founders = parseJSON(company.founders);
        const executives = parseJSON(company.executives);
        
        const handleFounderClick = async (founderName) => {
            try {
                // Close the person dialog first if it's open
                if (personDialogOpen) {
                    handleClosePersonDialog();
                }
                
                // Ensure people are loaded
                if (people.length === 0) {
                    await fetchPeople();
                }
                
                // Open profiteers section
                setOpenSections(prev => ({
                    ...prev,
                    profiteers: true,
                    corporations: false
                }));

                // Fetch person by name
                const person = await api.getPersonByName(founderName);
                
                if (person) {
                    // Display person details and select in menu
                    setSelectedType('person');
                    setSelectedItem(person);
                    
                    // Scroll to top after content loads
                    setTimeout(() => scrollToTop(), 100);
                } else {
                    console.error('Person not found:', founderName);
                    setError(`Person "${founderName}" not found`);
                }
            } catch (error) {
                console.error('Error fetching person:', error);
                setError(`Failed to load person: ${error.message}`);
            }
        };
        
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
                                            onClick={() => handleFounderClick(founder)}
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
                                                        onClick={() => handleFounderClick(exec.name)}
                                                        sx={{
                                                            cursor: 'pointer',
                                                            textDecoration: 'none',
                                                            background: 'none',
                                                            border: 'none',
                                                            padding: 0,
                                                            color: 'primary.main',
                                                            textAlign: 'left',
                                                            font: 'inherit',
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

    const renderPersonDetail = (person) => {
        const affiliations = parseJSON(person.affiliations);
        const connections = parseJSON(person.connections);
        
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PeopleIcon color="primary" />
                        {person.name}
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
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            src={`/images/people/${person.image}`}
                            alt={person.name}
                            sx={{ 
                                width: 200, 
                                height: 200,
                                border: '3px solid',
                                borderColor: 'primary.main'
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={8}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Role
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {person.role}
                            </Typography>
                        </Paper>

                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Company
                            </Typography>
                            <Typography variant="body1">
                                {person.company_name ? (
                                    <MuiLink
                                        component="button"
                                        variant="body1"
                                        onClick={async () => {
                                            // Find company by name
                                            if (companies.length === 0) {
                                                await fetchCompanies();
                                            }
                                            const company = companies.find(c => c.company_name === person.company_name);
                                            if (company) {
                                                await handleItemClick('company', company);
                                            }
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            textDecoration: 'none',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        {person.company_name}
                                    </MuiLink>
                                ) : 'N/A'}
                            </Typography>
                        </Paper>

                        {affiliations.length > 0 && (
                            <Paper elevation={1} sx={{ p: 2 }}>
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
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Biography
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                                {person.short_bio}
                            </Typography>
                        </Paper>
                    </Grid>

                    {connections.length > 0 && (
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ p: 2 }}>
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
                                            onClick={async () => {
                                                // Find person by name
                                                if (people.length === 0) {
                                                    await fetchPeople();
                                                }
                                                const connectedPerson = people.find(p => p.name === connection);
                                                if (connectedPerson) {
                                                    await handleItemClick('person', connectedPerson);
                                                }
                                            }}
                                            sx={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            </Box>
        );
    };

    // Add this function after renderPersonDetail
    const renderInfluencerDetail = (influencer) => {
        const causes = parseJSON(influencer.causes);
        const connections = parseJSON(influencer.connections);
        
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CampaignIcon color="primary" />
                            {influencer.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                            {influencer.position}
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
                    {/* Influencer Image */}
                    <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            src={`/images/influencers/${influencer.image}`}
                            alt={influencer.name}
                            sx={{ 
                                width: 200, 
                                height: 200,
                                border: '3px solid',
                                borderColor: 'primary.main'
                            }}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={8}>
                        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Platform
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                                {influencer.platform}
                            </Typography>
                        </Paper>

                        {causes.length > 0 && (
                            <Paper elevation={1} sx={{ p: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Key Issues & Causes
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                    {causes.map((cause, index) => (
                                        <Chip 
                                            key={index} 
                                            label={cause} 
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                        />
                                    ))}
                                </Box>
                            </Paper>
                        )}
                    </Grid>

                    {/* Biography */}
                    <Grid item xs={12}>
                        <Paper elevation={1} sx={{ p: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Biography
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                                {influencer.short_bio}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Connections */}
                    {connections.length > 0 && (
                        <Grid item xs={12}>
                            <Paper elevation={1} sx={{ p: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Notable Connections
                                </Typography>
                                <List>
                                    {connections.map((conn, index) => (
                                        <ListItem 
                                            key={index}
                                            sx={{ 
                                                borderLeft: `4px solid ${
                                                    conn.type === 'politician' ? '#1976d2' : 
                                                    conn.type === 'company' ? '#f57c00' : 
                                                    conn.type === 'community' ? '#388e3c' :
                                                    '#757575'
                                                }`,
                                                mb: 1,
                                                backgroundColor: '#f5f5f5',
                                                borderRadius: 1
                                            }}
                                        >
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body1" fontWeight="medium">
                                                        {conn.entity}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="text.secondary">
                                                            <strong>Type:</strong> {conn.type.charAt(0).toUpperCase() + conn.type.slice(1)}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="text.secondary">
                                                            <strong>Relationship:</strong> {conn.relationship}
                                                        </Typography>
                                                    </>
                                                }
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

    const renderPersonDialog = () => {
        const affiliations = selectedPerson ? parseJSON(selectedPerson.affiliations) : [];
        const connections = selectedPerson ? parseJSON(selectedPerson.connections) : [];
        
        const handleConnectionClick = async (connectionName) => {
            try {
                // Close the current dialog
                handleClosePersonDialog();
                
                // Small delay to allow dialog to close smoothly
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Ensure people are loaded
                if (people.length === 0) {
                    await fetchPeople();
                }
                
                // Open profiteers section
                setOpenSections(prev => ({
                    ...prev,
                    profiteers: true
                }));

                // Fetch person by name
                const person = await api.getPersonByName(connectionName);
                
                if (person) {
                    // Display person details and select in menu
                    setSelectedType('person');
                    setSelectedItem(person);
                } else {
                    console.error('Person not found:', connectionName);
                    setError(`Person "${connectionName}" not found`);
                }
            } catch (error) {
                console.error('Error fetching person:', error);
                setError(`Failed to load person: ${error.message}`);
            }
        };
        
        return (
            <Dialog 
                open={personDialogOpen} 
                onClose={handleClosePersonDialog}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h5">
                            {selectedPerson?.name || 'Loading...'}
                        </Typography>
                        {selectedPerson && (
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={async () => {
                                    // Close dialog and navigate to person detail
                                    handleClosePersonDialog();
                                    await new Promise(resolve => setTimeout(resolve, 300));
                                    
                                    if (people.length === 0) {
                                        await fetchPeople();
                                    }
                                    
                                    setOpenSections(prev => ({
                                        ...prev,
                                        profiteers: true
                                    }));
                                    
                                    setSelectedType('person');
                                    setSelectedItem(selectedPerson);
                                }}
                                sx={{ textTransform: 'none' }}
                            >
                                View Full Profile
                            </Button>
                        )}
                    </Box>
                    <IconButton onClick={handleClosePersonDialog}>
                        <CloseIcon />
                    </IconButton>
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
                                                    onClick={() => handleConnectionClick(connection)}
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
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    minHeight: '60vh'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ArrowBackIcon 
                            sx={{ 
                                fontSize: '3rem', 
                                color: 'text.secondary',
                                opacity: 0.6 
                            }} 
                        />
                        <Typography 
                            variant="h5" 
                            color="text.secondary"
                            sx={{ opacity: 0.7 }}
                        >
                            Select an item to view its details
                        </Typography>
                    </Box>
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
            case 'person':
                return renderPersonDetail(selectedItem);
            case 'influencer': // Add this
                return renderInfluencerDetail(selectedItem);
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
                        setOpenSections(prev => ({ ...prev, corporations: true }));
                        const company = await api.getCompanyById(selectedId);
                        handleItemClick('company', company);
                    } else if (selectedType === 'politician') {
                        await fetchPoliticians();
                        setOpenSections(prev => ({ ...prev, politicians: true }));
                        const politician = await api.getPoliticianById(selectedId);
                        handleItemClick('politician', politician);
                    } else if (selectedType === 'person') {
                        await fetchPeople();
                        setOpenSections(prev => ({ ...prev, profiteers: true }));
                        const person = await api.getPersonById(selectedId);
                        handleItemClick('person', person);
                    } else if (selectedType === 'influencer') { // Add this
                        await fetchInfluencers();
                        setOpenSections(prev => ({ ...prev, influence: true }));
                        const influencer = await api.getInfluencerById(selectedId);
                        handleItemClick('influencer', influencer);
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

    // Update the JSX to add refs
    return (
        <Box sx={{ backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Box sx={{ px: '5%', py: 4 }}>
                <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
                    BSI Wiki
                </Typography>

                <Grid container spacing={3}>
                    {/* Left Menu Column - Add ref */}
                    <Grid item xs={12} md={3.45}>
                        <Paper 
                            ref={menuRef}
                            elevation={2} 
                            sx={{ position: 'sticky', top: 20, maxHeight: '85vh', overflow: 'auto' }}
                        >
                            <List component="nav">
                                {/* Communities */}
                                <ListItemButton onClick={() => handleSectionClick('communities')}>
                                    <LocationOnIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Communities" 
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
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
                                                    <ListItemText 
                                                        primary={community.name}
                                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Politicians */}
                                <ListItemButton onClick={() => handleSectionClick('politicians')}>
                                    <PeopleIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Politicians"
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
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
                                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Corporations */}
                                <ListItemButton onClick={() => handleSectionClick('corporations')}>
                                    <BusinessIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Corporations"
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
                                    {openSections.corporations ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.corporations} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.corporations ? (
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
                                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Profiteers */}
                                <ListItemButton onClick={() => handleSectionClick('profiteers')}>
                                    <PeopleIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Profiteers"
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
                                    {openSections.profiteers ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.profiteers} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.profiteers ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        ) : (
                                            people.map((person) => (
                                                <ListItemButton
                                                    key={person.id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick('person', person)}
                                                    selected={selectedItem?.id === person.id && selectedType === 'person'}
                                                >
                                                    <ListItemText 
                                                        primary={person.name}
                                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Influence - NEW SECTION */}
                                <ListItemButton onClick={() => handleSectionClick('influence')}>
                                    <CampaignIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Influence"
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
                                    {openSections.influence ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openSections.influence} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {loading.influence ? (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                                                <CircularProgress size={24} />
                                            </Box>
                                        ) : (
                                            influencers.map((influencer) => (
                                                <ListItemButton
                                                    key={influencer.id}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleItemClick('influencer', influencer)}
                                                    selected={selectedItem?.id === influencer.id && selectedType === 'influencer'}
                                                >
                                                    <ListItemText 
                                                        primary={influencer.name}
                                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                    />
                                                </ListItemButton>
                                            ))
                                        )}
                                    </List>
                                </Collapse>

                                <Divider />

                                {/* Resources */}
                                <ListItemButton onClick={() => handleSectionClick('resources')}>
                                    <LinkIcon sx={{ mr: 2, color: '#0D1E20' }} />
                                    <ListItemText 
                                        primary="Resources"
                                        primaryTypographyProps={{ fontSize: '1.035rem' }}
                                    />
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
                                                    primaryTypographyProps={{ fontSize: '1.035rem' }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </List>
                        </Paper>
                    </Grid>

                    {/* Middle Content Column - Add ref */}
                    <Grid item xs={12} md={8.55}>
                        <Paper 
                            ref={contentRef}
                            elevation={2} 
                            sx={{ p: 4, minHeight: '70vh' }}
                        >
                            {renderContent()}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Person Dialog */}
            {renderPersonDialog()}

            {/* Footer */}
            <Footer />
        </Box>
    );
};

export default WikiPage;