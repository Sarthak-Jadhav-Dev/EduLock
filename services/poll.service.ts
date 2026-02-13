import api from './api';

export const createPoll = async (data: {
    classId: number | string;
    question: string;
    options: string[];
}) => {
    const response = await api.post('/poll/create', data);
    return response.data;
};

export const votePoll = async (data: { pollId: number | string; optionId: number | string }) => {
    const response = await api.post('/poll/vote', data);
    return response.data;
};

export const getPolls = async (classId: number | string) => {
    const response = await api.get(`/poll/${classId}`);
    return response.data.polls;
};
