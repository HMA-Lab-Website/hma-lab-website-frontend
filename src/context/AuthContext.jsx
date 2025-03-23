// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// The password is hardcoded as "123456" as mentioned in your requirements
const ADMIN_PASSWORD = "123456";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        // Check if user is already logged in on app start
        const authStatus = localStorage.getItem("hmalab_auth");
        setIsAuthenticated(authStatus === "authenticated");
        setCheckingAuth(false);
    }, []);

    const login = (password) => {
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem("hmalab_auth", "authenticated");
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("hmalab_auth");
        setIsAuthenticated(false);
    };

    if (checkingAuth) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
