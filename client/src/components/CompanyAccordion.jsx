import React from 'react';
import { 
    Accordion, AccordionSummary, AccordionDetails, 
    Typography, Box, Link as MuiLink, Chip 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';

const CompanyAccordion = ({ company }) => {
    return (
        <Box sx={{ width: '50%', margin: '0 auto', mb: 1 }}>
            <Accordion>
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
                            <Chip 
                                label="View Full Profile" 
                                component={Link} 
                                to={`/company/${company.id}`}
                                clickable
                                color="primary"
                            />
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default CompanyAccordion;