import api from './api';

export const createAnnouncement = async (data: { classId: number | string; message: string }) => {
    const response = await api.post('/announce/create', data);
    return response.data;
};

export const getAnnouncements = async (classId: number | string) => {
    const response = await api.get(`/announce/${classId}`);
    return response.data.announcements;
};
