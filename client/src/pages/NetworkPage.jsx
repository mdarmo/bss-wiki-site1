import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const NetworkPage = () => {
    return (
        <Box sx={{ py: 4, px: '10%', backgroundColor: '#f6f7fa', minHeight: '100vh' }}>
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Network Visualization
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Coming Soon
                </Typography>
            </Paper>
        </Box>
    );
};

export default NetworkPage;