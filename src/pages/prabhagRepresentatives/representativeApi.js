import api from '../../utils/apiClient';

export const fetchRepresentativeById = async (id, domain) => {
    const response = await api.get('/api/representatives', {
        params: { id, domain },
    });

    return response.data?.data || null;
};

// services/userService.js
export const createUser = async (email, pincode) => {
    try {
        const response = await api.post(`/api/user`, {
            email,
            pincode,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: 'Please Try Again !' };
    }
};
