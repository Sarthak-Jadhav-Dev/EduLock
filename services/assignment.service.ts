import api from './api';

export const createAssignment = async (data: {
    classId: number | string;
    title: string;
    description: string;
    deadline: string;
}) => {
    const response = await api.post('/assignment/create', data);
    return response.data;
};

export const submitAssignment = async (data: FormData) => {
    const response = await api.post('/assignment/submit', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getAssignments = async (classId: number | string) => {
    const response = await api.get(`/assignment/${classId}`);
    return response.data;
};

export const viewSubmissions = async (id: number | string) => {
    const response = await api.get(`/assignment/${id}/submissions`);
    return response.data;
};
