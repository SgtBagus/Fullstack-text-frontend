import axios from 'axios';

import { API_BASE } from './config/apiBase';
import { GET_CURRENT_USER } from './config/selectors';

const { token } = GET_CURRENT_USER() || { token: null };

export const UPLOAD_IMAGE = async (file, path) => {
    const formData = new FormData();

    //append data
    formData.append('image', file);
    formData.append('path', path);

    const url = `${API_BASE}api/uploadImage`;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const promise = await axios.post(url, formData).then(({ data }) => (data)).catch(error => {});

    return promise;
}