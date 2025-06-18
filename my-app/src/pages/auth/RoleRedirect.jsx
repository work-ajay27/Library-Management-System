import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.role === 'ADMIN') {
                navigate('/admin-dashboard');
            } else if (user.role === 'STUDENT') {
                navigate('/student-dashboard');
            } else {
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return null;
};

export default RoleRedirect;
