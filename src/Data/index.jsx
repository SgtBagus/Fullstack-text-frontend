import { fetchApi } from './config/index';

const endPoints = {
    getUser: 'api/users',
};

export const getUser = payload => fetchApi(endPoints.getUser, payload);