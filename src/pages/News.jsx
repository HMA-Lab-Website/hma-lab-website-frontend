// src/pages/News.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-firefly"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p className="text-xl">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-firefly text-white rounded-md hover:bg-opacity-90 transition-colors"
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
                <p className="text-center text-lg text-nevada">
                    No news items found.
                </p>
            </div>
        );
    }

    // Function to format date in a more readable way
    const formatDate = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch (e) {
            return dateString; // Return the original string if parsing fails
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Latest News"
                subtitle="Stay updated with our latest announcements and activities"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-xl transition-all duration-300 border border-iron/10 h-full flex flex-col"
                    >
                        {item.image && (
                            <div className="mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-firefly">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-nevada">
                                        {formatDate(item.date)}
                                    </span>
                                    {item.source && (
                                        <Badge className="bg-iron/20 text-firefly">
                                            {item.source}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-nevada">
                                    {item.description}
                                </p>
                            </div>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto inline-block text-casal hover:text-gothic transition-colors"
                                >
                                    Read more →
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default News;
