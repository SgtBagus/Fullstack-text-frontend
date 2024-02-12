import { fetchApi } from './config/index';

const endPoints = {
    getUser: 'api/users',

    getUserCreate: 'api/users/create',
    getUserUpdate: 'api/users/update',
    
    getUserDelete: 'api/users/delete',
};

export const getUser = payload => fetchApi(endPoints.getUser, payload);
export const getUserCreate = payload => fetchApi(endPoints.getUserCreate, payload, 'post');
export const getUserUpdate = (payload, id) => fetchApi(`${endPoints.getUserUpdate}/${id}`, payload, 'post');
export const getUserDelete = id => fetchApi(`${endPoints.getUserDelete}/${id}`, {}, 'delete');