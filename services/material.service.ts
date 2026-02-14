import api from './api';

export const uploadMaterial = async (data: FormData) => {
    const response = await api.post('/material/upload', data, {
        headers: {
            'Content-Type': undefined as any,
        }
    });
    return response.data;
};

export const getMaterials = async (classId: string | number) => {
    const response = await api.get(`/material/${classId}`);
    return response.data.materials;
};


export const deleteMaterial = async (id: string | number) => {
    const response = await api.delete(`/material/${id}`);
    return response.data;
};

export const viewMaterial = async (id: string | number) => {
    const response = await api.get(`/material/view/${id}`);
    return response.data;
};
