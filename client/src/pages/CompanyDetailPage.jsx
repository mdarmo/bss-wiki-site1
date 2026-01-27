import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    Typography, Box, Paper, Grid, Chip, 
    CircularProgress, Alert, Divider, List, ListItem, 
    ListItemText, Link as MuiLink, Button 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from '../services/api';

const CompanyDetailPage = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const data = await api.getCompanyById(id);
                setCompany(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load company details');
                setLoading(false);
            }
        };

        fetchCompany();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh', textAlign: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !company) {
        return (
            <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
                <Alert severity="error">{error || 'Company not found'}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Box sx={{ width: '80%', margin: '0 auto' }}>
                <Button 
                    component={Link} 
                    to="/list" 
                    startIcon={<ArrowBackIcon />}
                    sx={{ mb: 3 }}
                >
                    Back to List
                </Button>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h3" gutterBottom>
                        {company.company_name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {company.legal_name}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Website
                                </Typography>
                                <MuiLink href={company.website} target="_blank" rel="noopener">
                                    {company.website}
                                </MuiLink>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Headquarters
                                </Typography>
                                <Typography variant="body1">{company.headquarters}</Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Market Valuation
                                </Typography>
                                <Typography variant="body1">{company.market_valuation}</Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Employees
                                </Typography>
                                <Typography variant="body1">{company.employees}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Mission Statement
                                </Typography>
                                <Typography variant="body1">{company.mission_statement}</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Founders
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {company.founders && company.founders.map((founder, index) => (
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
                            {company.executives && company.executives.map((exec, index) => (
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
            </Box>
        </Box>
    );
};

export default CompanyDetailPage;