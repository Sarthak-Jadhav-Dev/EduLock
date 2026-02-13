import api from './api';

export const sendOtp = async (email: string) => {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-otp', { email, otp });
    return response.data;
};

export const completeProfile = async (data: {
    fullName: string;
    role: string;
    rollNo?: string;
    division?: string;
    department?: string;
    phone?: string;
}) => {
    const response = await api.post('/auth/complete-profile', data);
    return response.data;
};
