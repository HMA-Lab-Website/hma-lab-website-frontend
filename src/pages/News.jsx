// src/pages/News.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getItems("news");
                setNews(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching news data:", err);
                setError("Failed to load news");
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    // Toggle description expand/collapse
    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Function to render description with read more/less toggle
    const renderDescription = (item) => {
        const id = item.id || item._id || item.doc_id;
        const maxLength = 150;
        const isExpanded = expandedDescriptions[id];

        if (!item.description || item.description.length <= maxLength) {
            return <p className="text-nevada">{item.description}</p>;
        }

        if (isExpanded) {
            return (
                <div>
                    <p className="text-nevada">{item.description}</p>
                    <button
                        onClick={() => toggleDescription(id)}
                        className="mt-2 text-sm text-casal hover:text-gothic transition-colors focus:outline-none"
                    >
                        Show less
                    </button>
                </div>
            );
        }

        return (
            <div>
                <p className="text-nevada">
                    {item.description.substring(0, maxLength)}...
                </p>
                <button
                    onClick={() => toggleDescription(id)}
                    className="mt-2 text-sm text-casal hover:text-gothic transition-colors focus:outline-none"
                >
                    Read more
                </button>
            </div>
        );
    };

    // Function to format date in a more readable way
    const formatDate = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            // Check if date is valid
            if (isNaN(date.getTime())) return dateString;

            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (e) {
            return dateString; // Return the original string if parsing fails
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 bg-red-50 rounded-lg border border-red-100 max-w-3xl mx-auto">
                <p className="text-xl text-red-600 font-medium mb-4">{error}</p>
                <p className="text-nevada mb-6">
                    Unable to load news items at this time.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-casal text-white rounded-md hover:bg-gothic transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (news.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
                <SectionHeader
                    title="Latest News"
                    subtitle="Stay updated with our latest announcements and activities"
                />
                <div className="text-center py-12 bg-background rounded-lg border border-iron/20">
                    <p className="text-nevada text-lg">
                        No news items available at the moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Latest News"
                subtitle="Stay updated with our latest announcements and activities"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item, index) => {
                    const id = item.id || item._id || item.doc_id || index;
                    return (
                        <Card
                            key={id}
                            className="hover:shadow-xl transition-all duration-300 border border-iron/10 h-full flex flex-col"
                        >
                            {item.image && (
                                <div className="w-full h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover rounded-t-lg transform hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="mb-4 flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-semibold text-firefly line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-casal font-medium">
                                            {formatDate(item.date)}
                                        </span>
                                        {item.source && (
                                            <Badge type="default">
                                                {item.source}
                                            </Badge>
                                        )}
                                    </div>
                                    <div>{renderDescription(item)}</div>
                                </div>
                                {item.link && (
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-block text-casal hover:text-gothic transition-colors group"
                                    >
                                        Read full article{" "}
                                        <span className="group-hover:translate-x-1 inline-block transition-transform">
                                            →
                                        </span>
                                    </a>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default News;
