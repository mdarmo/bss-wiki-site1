const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = {
    // Companies endpoints
    getAllCompanies: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/companies`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getAllCompanies:', error);
            throw error;
        }
    },

    getCompanyById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/companies/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getCompanyById:', error);
            throw error;
        }
    },

    // Communities endpoints
    getAllCommunities: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/communities`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getAllCommunities:', error);
            throw error;
        }
    },

    getCommunityById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/communities/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getCommunityById:', error);
            throw error;
        }
    },

    // Politicians endpoints
    getAllPoliticians: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/politicians`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getAllPoliticians:', error);
            throw error;
        }
    },

    getPoliticianById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/politicians/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getPoliticianById:', error);
            throw error;
        }
    },

    // People endpoints
    getAllPeople: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/people`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getAllPeople:', error);
            throw error;
        }
    },

    getPersonByName: async (name) => {
        try {
            const response = await fetch(`${API_BASE_URL}/people/name/${encodeURIComponent(name)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getPersonByName:', error);
            throw error;
        }
    },

    getPersonById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/people/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Error - getPersonById:', error);
            throw error;
        }
    },
};

export default api;