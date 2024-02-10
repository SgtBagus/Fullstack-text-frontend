import { fetchApi } from '../config/index';

const endPoints = {
    login: 'api/login',
};

export const getLogin = payload => fetchApi(endPoints.login, payload, 'POST');
