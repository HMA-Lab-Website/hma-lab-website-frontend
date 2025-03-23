// src/pages/admin/AdminSettings.jsx
import React, { useState } from "react";
import { AdminCard } from "../../components/admin";
import { Button } from "../../components/common";
import { api } from "../../utils/api";

const AdminSettings = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setLoading(true);

        try {
            await api.updatePassword(password);
            setSuccess("Password updated successfully");
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError("Failed to update password. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-semibold text-firefly">Settings</h1>

            <AdminCard title="Update Admin Password">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded">
                        {success}
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-nevada mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-iron rounded-md focus:outline-none focus:ring-2 focus:ring-casal/50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-nevada mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-iron rounded-md focus:outline-none focus:ring-2 focus:ring-casal/50"
                            required
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-full md:w-auto"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Password"}
                        </Button>
                    </div>
                </form>
            </AdminCard>
        </div>
    );
};

export default AdminSettings;
