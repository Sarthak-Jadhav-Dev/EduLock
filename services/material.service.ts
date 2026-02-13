import api from './api';

export const uploadMaterial = async (data: FormData) => {
    const response = await api.post('/material/upload', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getMaterials = async (classId: string | number) => {
    const response = await api.get(`/material/${classId}`);
    return response.data;
};

export const deleteMaterial = async (id: string | number) => {
    const response = await api.delete(`/material/${id}`);
    return response.data;
};
