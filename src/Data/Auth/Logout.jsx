import { API_BASE } from '../config/apiBase';

import axios from 'axios';

const url = `${API_BASE}api/logout`;

export const getLogout = async (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    await axios.post(url).then(() => {
        localStorage.removeItem("currentUser");
        
		window.location.href = "/login";
    });
};