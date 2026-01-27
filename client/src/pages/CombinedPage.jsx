import React, { useState, useEffect } from 'react';
import { 
    Typography, Box, Grid, CircularProgress, Alert,
    Paper, Divider, List, ListItem, ListItemText, Chip,
    Link as MuiLink, Accordion, AccordionSummary, AccordionDetails, Button, IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

const CombinedPage = () => {
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [expandedAccordion, setExpandedAccordion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = await api.getAllCompanies();
                setCompanies(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load companies');
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    const handleCompanySelect = async (companyId) => {
        try {
            const data = await api.getCompanyById(companyId);
            setSelectedCompany(data);
        } catch (err) {
            console.error('Failed to load company details');
        }
    };

    const handleCloseDetails = () => {
        setSelectedCompany(null);
    };

    const handleAccordionChange = (companyId) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? companyId : null);
    };

    if (loading) {
        return (
            <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh', textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom align="center">
                Company Explorer
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph align="center" sx={{ mb: 4 }}>
                {companies.length} companies in database
            </Typography>

            <Grid container spacing={3}>
                {/* Left side - Company Accordion List */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ 
                        height: 'calc(100vh - 250px)', 
                        overflowY: 'auto',
                        pr: 2
                    }}>
                        {companies.map((company) => (
                            <Accordion 
                                key={company.id}
                                expanded={expandedAccordion === company.id}
                                onChange={handleAccordionChange(company.id)}
                                sx={{ 
                                    mb: 1,
                                    backgroundColor: selectedCompany?.id === company.id ? '#e3f2fd' : 'white',
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <BusinessIcon sx={{ mr: 2, color: 'primary.main' }} />
                                        <Typography variant="h6">{company.company_name}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ pl: 2 }}>
                                        <Box sx={{ mb: 2 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Legal Name:
                                            </Typography>
                                            <Typography variant="body1">{company.legal_name}</Typography>
                                        </Box>
                                        
                                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <LanguageIcon sx={{ mr: 1, fontSize: 20 }} />
                                            <MuiLink href={company.website} target="_blank" rel="noopener">
                                                {company.website}
                                            </MuiLink>
                                        </Box>
                                        
                                        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                                            <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                                            <Typography variant="body2">{company.headquarters}</Typography>
                                        </Box>

                                        <Box sx={{ mt: 2 }}>
                                            <Button 
                                                variant="contained" 
                                                color="primary"
                                                onClick={() => handleCompanySelect(company.id)}
                                                fullWidth
                                            >
                                                View Profile
                                            </Button>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Grid>

                {/* Right side - Company Details */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ 
                        height: 'calc(100vh - 250px)', 
                        overflowY: 'auto',
                        pl: 2
                    }}>
                        {selectedCompany ? (
                            <Paper elevation={3} sx={{ p: 4, position: 'relative' }}>
                                <IconButton
                                    onClick={handleCloseDetails}
                                    sx={{
                                        position: 'absolute',
                                        right: 16,
                                        top: 16,
                                        color: 'grey.500',
                                        '&:hover': {
                                            backgroundColor: 'grey.100',
                                        }
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>

                                <Typography variant="h3" gutterBottom>
                                    {selectedCompany.company_name}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    {selectedCompany.legal_name}
                                </Typography>

                                <Divider sx={{ my: 3 }} />

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Website
                                            </Typography>
                                            <MuiLink href={selectedCompany.website} target="_blank" rel="noopener">
                                                {selectedCompany.website}
                                            </MuiLink>
                                        </Box>

                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Headquarters
                                            </Typography>
                                            <Typography variant="body1">{selectedCompany.headquarters}</Typography>
                                        </Box>

                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Market Valuation
                                            </Typography>
                                            <Typography variant="body1">{selectedCompany.market_valuation}</Typography>
                                        </Box>

                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                Employees
                                            </Typography>
                                            <Typography variant="body1">{selectedCompany.employees}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                Mission Statement
                                            </Typography>
                                            <Typography variant="body1">{selectedCompany.mission_statement}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Founders
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {selectedCompany.founders && selectedCompany.founders.map((founder, index) => (
                                            <Chip key={index} label={founder} color="primary" variant="outlined" />
                                        ))}
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                <Box>
                                    <Typography variant="h6" gutterBottom>
                                        Executive Leadership
                                    </Typography>
                                    <List>
                                        {selectedCompany.executives && selectedCompany.executives.map((exec, index) => (
                                            <ListItem key={index} divider>
                                                <ListItemText 
                                                    primary={exec.name}
                                                    secondary={exec.role}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Paper>
                        ) : (
                            <Paper elevation={2} sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h5" color="text.secondary">
                                    Select a company to view details
                                </Typography>
                            </Paper>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CombinedPage;