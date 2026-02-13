import api from './api';

export const getMe = async () => {
    const response = await api.get('/user/me');
    return response.data.user;
};

export const updateProfile = async (data: {
    phone?: string;
    division?: string;
    department?: string;
    [key: string]: any;
}) => {
    const response = await api.put('/user/update', data);
    return response.data;
};
