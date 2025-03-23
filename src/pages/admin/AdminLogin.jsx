// src/pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/common";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // If already authenticated, redirect to admin dashboard
        if (isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Try to login
        const success = login(password);

        if (success) {
            navigate("/admin");
        } else {
            setError("Invalid password. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src="/HMA-Lab-Logo.png"
                        alt="HMA Lab Logo"
                        className="h-16 mx-auto mb-4"
                    />
                    <h1 className="text-2xl font-semibold text-firefly">
                        Admin Login
                    </h1>
                    <p className="text-nevada mt-2">
                        Enter your password to access the admin panel
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-nevada mb-1"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-iron rounded-lg focus:outline-none focus:ring-2 focus:ring-casal/50"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-casal hover:text-gothic text-sm"
                    >
                        Return to Website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
