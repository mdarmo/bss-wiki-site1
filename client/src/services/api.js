import axios from 'axios';

// Use environment variable or fallback to relative path
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false // Make sure this is false
});

// Add request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.status, error.message);
        return Promise.reject(error);
    }
);

const apiMethods = {
    // Companies endpoints
    getAllCompanies: async () => {
        try {
            const response = await api.get('/companies');
            return response.data;
        } catch (error) {
            console.error('API Error - getAllCompanies:', error);
            throw error;
        }
    },

    getCompanyById: async (id) => {
        try {
            const response = await api.get(`/companies/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error - getCompanyById:', error);
            throw error;
        }
    },

    // Communities endpoints
    getAllCommunities: async () => {
        try {
            const response = await api.get('/communities');
            return response.data;
        } catch (error) {
            console.error('API Error - getAllCommunities:', error);
            throw error;
        }
    },

    getCommunityById: async (id) => {
        try {
            const response = await api.get(`/communities/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error - getCommunityById:', error);
            throw error;
        }
    },

    // Politicians endpoints
    getAllPoliticians: async () => {
        try {
            const response = await api.get('/politicians');
            return response.data;
        } catch (error) {
            console.error('API Error - getAllPoliticians:', error);
            throw error;
        }
    },

    getPoliticianById: async (id) => {
        try {
            const response = await api.get(`/politicians/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error - getPoliticianById:', error);
            throw error;
        }
    },

    // People endpoints
    getAllPeople: async () => {
        try {
            const response = await api.get('/people');
            return response.data;
        } catch (error) {
            console.error('API Error - getAllPeople:', error);
            throw error;
        }
    },

    getPersonByName: async (name) => {
        try {
            const response = await api.get(`/people/name/${encodeURIComponent(name)}`);
            return response.data;
        } catch (error) {
            console.error('API Error - getPersonByName:', error);
            throw error;
        }
    },

    getPersonById: async (id) => {
        try {
            const response = await api.get(`/people/${id}`);
            return response.data;
        } catch (error) {
            console.error('API Error - getPersonById:', error);
            throw error;
        }
    },
};

export default { ...api, ...apiMethods };