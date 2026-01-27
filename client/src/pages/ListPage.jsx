import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import CompanyAccordion from '../components/CompanyAccordion';
import api from '../services/api';

const ListPage = () => {
    const [companies, setCompanies] = useState([]);
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
                Company Directory
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph align="center">
                {companies.length} companies in database
            </Typography>
            
            <Box sx={{ mt: 3 }}>
                {companies.map((company) => (
                    <CompanyAccordion key={company.id} company={company} />
                ))}
            </Box>
        </Box>
    );
};

export default ListPage;