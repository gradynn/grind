import { useState } from 'react';

export const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const setAuthToken = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    }

    const removeAuthToken = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return { token, setAuthToken, removeAuthToken };
}