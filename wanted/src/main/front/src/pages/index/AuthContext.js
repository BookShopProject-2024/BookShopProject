// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    isAuthenticated: false,
    setAuthToken: () => {},
    removeAuthToken: () => {}
});
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            console.log("Auth Token found in localStorage");
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            setIsAuthenticated(true);
        } else {
            console.warn("No auth token found in localStorage");
            delete axios.defaults.headers.common['Authorization'];
            setIsAuthenticated(false);
        }
    }, []);

    const setAuthToken = (token) => {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuthenticated(true);
    };

    const removeAuthToken = () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthToken, removeAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
