import { fetchApi } from './config/index';

const endPoints = {
    getUser: 'api/users',

    getUserCreate: 'api/users/create',
    getUserUpdate: 'api/users/update',
    
    getUserDelete: 'api/users/delete',

    // <======================>

    getCusomer: 'api/customer',

    getCustomerCreate: 'api/customer/create',
    getCustomerUpdate: 'api/customer/update',
    getCustomerUpdateStatus: 'api/customer/updatestatus',
    
    getCusomerDelete: 'api/customer/delete',

    
    // <======================>
    
    getPackage: 'api/package',
    getActivePackage: 'api/activePackage',

    getPackageCreate: 'api/package/create',
    getPackageUpdate: 'api/package/update',
    
    getPackageDelete: 'api/package/delete',
};

export const getUser = payload => fetchApi(endPoints.getUser, payload);
export const getUserCreate = payload => fetchApi(endPoints.getUserCreate, payload, 'post');
export const getUserUpdate = (payload, id) => fetchApi(`${endPoints.getUserUpdate}/${id}`, payload, 'post');
export const getCustomerUpdateStatus = (payload, id) => fetchApi(`${endPoints.getCustomerUpdateStatus}/${id}`, payload, 'post');
export const getUserDelete = id => fetchApi(`${endPoints.getUserDelete}/${id}`, {}, 'delete');


export const getCusomer = payload => fetchApi(endPoints.getCusomer, payload);
export const getCustomerCreate = payload => fetchApi(endPoints.getCustomerCreate, payload, 'post');
export const getCustomerUpdate = (payload, id) => fetchApi(`${endPoints.getCustomerUpdate}/${id}`, payload, 'post');
export const getCusomerDelete = id => fetchApi(`${endPoints.getCusomerDelete}/${id}`, {}, 'delete');


export const getPackage = payload => fetchApi(endPoints.getPackage, payload);
export const getActivePackage = payload => fetchApi(endPoints.getActivePackage, payload);
export const getPackageCreate = payload => fetchApi(endPoints.getPackageCreate, payload, 'post');
export const getPackageUpdate = (payload, id) => fetchApi(`${endPoints.getPackageUpdate}/${id}`, payload, 'post');
export const getPackageDelete = id => fetchApi(`${endPoints.getPackageDelete}/${id}`, {}, 'delete');