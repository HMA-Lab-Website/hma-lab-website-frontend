// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
import { AdminCard } from "../../components/admin";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        publications: 0,
        projects: 0,
        datasets: 0,
        resources: 0,
        people: 0,
        alumni: 0,
        news: 0,
    });

    const [loading, setLoading] = useState(true);
    const [labStatus, setLabStatus] = useState({ isOpen: true });
    const [gpuStatus, setGpuStatus] = useState({
        isAvailable: true,
        gpuDocId: null,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                // Fetch counts for all collections
                const collections = [
                    "publications",
                    "projects",
                    "datasets",
                    "resources",
                    "people",
                    "alumni",
                    "news",
                ];

                const stats = {};

                // Fetch all collections in parallel
                await Promise.all(
                    collections.map(async (collection) => {
                        try {
                            const data = await api.getItems(collection);
                            stats[collection] = Array.isArray(data)
                                ? data.length
                                : 0;
                        } catch (e) {
                            console.error(`Error fetching ${collection}:`, e);
                            stats[collection] = 0;
                        }
                    })
                );

                setStats(stats);

                // Fetch lab status
                try {
                    const response = await fetch(
                        "https://backend-website-api.vercel.app/update_lab",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({}), // Empty body to just get current state
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setLabStatus(data);
                    }
                } catch (err) {
                    console.error("Error fetching lab status:", err);
                    setLabStatus({
                        isOpen: true,
                        message: "Lab is currently open (default)",
                    });
                }

                // Fetch GPU status from indication collection
                try {
                    const indicationData = await api.getItems("indication");
                    if (indicationData && indicationData.length > 0) {
                        // Find the GPU indication document
                        const gpuItem = indicationData.find(
                            (item) => "gpu" in item
                        );

                        if (gpuItem) {
                            setGpuStatus({
                                isAvailable: Boolean(gpuItem.gpu),
                                gpuDocId: gpuItem.doc_id,
                            });
                        }
                    }
                } catch (err) {
                    console.error(
                        "Error fetching GPU status from indication:",
                        err
                    );
                    setGpuStatus({
                        isAvailable: true,
                        gpuDocId: null,
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleUpdateGpuStatus = async (isAvailable) => {
        try {
            // Use the api.addItem function to update indication collection
            const response = await api.addItem({
                collection: "indication",
                gpu: isAvailable,
                doc_id: gpuStatus.gpuDocId, // Include doc_id if we have it
            });

            // Update local state
            setGpuStatus({
                ...gpuStatus,
                isAvailable: isAvailable,
            });

            console.log("GPU status updated successfully");
        } catch (error) {
            console.error("Error updating GPU status:", error);
            alert("Failed to update GPU status. Please try again.");
        }
    };

    const handleUpdateLabStatus = async () => {
        try {
            const updatedStatus = {
                isOpen: !labStatus.isOpen,
                message: !labStatus.isOpen
                    ? "Lab is currently open"
                    : "Lab is currently closed",
            };

            const response = await fetch(
                "https://backend-website-api.vercel.app/update_lab",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedStatus),
                }
            );

            if (response.ok) {
                // Update local state directly rather than depending on response
                setLabStatus(updatedStatus);
                console.log("Lab status updated successfully");
            } else {
                throw new Error("Failed to update lab status");
            }
        } catch (error) {
            console.error("Error updating lab status:", error);
            alert("Failed to update lab status. Please try again.");
        }
    };

    const statsCards = [
        {
            title: "Publications",
            count: stats.publications || 0,
            icon: "ri-book-open-line",
            link: "/admin/publications",
        },
        {
            title: "Projects",
            count: stats.projects || 0,
            icon: "ri-folder-line",
            link: "/admin/projects",
        },
        {
            title: "Datasets",
            count: stats.datasets || 0,
            icon: "ri-database-2-line",
            link: "/admin/datasets",
        },
        {
            title: "Resources",
            count: stats.resources || 0,
            icon: "ri-file-list-line",
            link: "/admin/resources",
        },
        {
            title: "People",
            count: stats.people || 0,
            icon: "ri-user-star-line",
            link: "/admin/people",
        },
        {
            title: "Alumni",
            count: stats.alumni || 0,
            icon: "ri-user-3-line",
            link: "/admin/alumni",
        },
        {
            title: "News",
            count: stats.news || 0,
            icon: "ri-newspaper-line",
            link: "/admin/news",
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-semibold text-firefly">Dashboard</h1>

            {/* Status indicators */}
            <div className="flex flex-col sm:flex-row gap-6"></div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <Link key={index} to={card.link}>
                        <AdminCard
                            title={card.title}
                            count={card.count}
                            icon={card.icon}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
