import api from './api';

export const sendOtp = async (email: string) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
};

export const registerWithOtp = async (data: {
    email: string;
    otp: string;
    name: string;
    phone: string;
    role: string;
    registrationId: string;
    rollNo?: string;
    division?: string;
    department?: string;
}) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
};
