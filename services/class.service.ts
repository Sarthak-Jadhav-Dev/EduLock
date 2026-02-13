import api from './api';

export const createClass = async (data: { name: string; subject: string }) => {
    const response = await api.post('/class/create', data);
    return response.data;
};

export const joinClass = async (data: { joinCode: string }) => {
    const response = await api.post('/class/join', data);
    return response.data;
};

export const getMyClasses = async () => {
    const response = await api.get('/class/my');
    return response.data;
};

export const getClassStudents = async (classId: string | number) => {
    const response = await api.get(`/class/${classId}/students`);
    return response.data;
};
