import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dummyData } from "../utils/dummyData";
import { Card, Badge, Button, SectionHeader } from "../components/common";
import { api } from "../utils/api";

const Home = () => {
    const [labStatus, setLabStatus] = useState({
        isOpen: true,
        message: "Lab is currently open",
    });

    const [gpuStatus, setGpuStatus] = useState({
        isAvailable: true,
        totalGPUs: 4,
        availableGPUs: 3,
    });

    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    useEffect(() => {
        // Fetch lab status
        const fetchLabStatus = async () => {
            try {
                const response = await fetch(
                    "https://backend-website-api.vercel.app/update_lab",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data && typeof data.isOpen !== "undefined") {
                        setLabStatus(data);
                    }
                }
            } catch (error) {
                console.error("Error fetching lab status:", error);
                // Keep current state - don't update on error
            }
        };

        // Fetch GPU status
        const fetchGpuStatus = async () => {
            try {
                const response = await fetch(
                    "https://backend-website-api.vercel.app/update_gpu",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setGpuStatus({
                        isAvailable: data.availableGPUs > 0,
                        availableGPUs: data.availableGPUs || 0,
                        totalGPUs: data.totalGPUs || 4,
                    });
                }
            } catch (error) {
                console.error("Error fetching GPU status:", error);
                // Keep current state - don't update on error
            }
        };

        fetchLabStatus();
        fetchGpuStatus();

        // Refresh status every 5 minutes
        const interval = setInterval(() => {
            fetchLabStatus();
            fetchGpuStatus();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getItems("news");
                setNews(data.length > 0 ? data : dummyData.news);
                setLoadingNews(false);
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoadingNews(false);
                // Use dummy data as fallback
                setNews(dummyData.news);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="space-y-10">
            {/* Status Bar */}
            <div className="sticky top-20 z-40 bg-white shadow-md py-2 px-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div
                        className={`h-3 w-3 rounded-full ${
                            labStatus.isOpen ? "bg-green-500" : "bg-red-500"
                        } mr-2`}
                    ></div>
                    <span className="text-sm font-medium text-nevada">
                        {labStatus.message}
                    </span>
                </div>
                <div className="flex items-center">
                    <div
                        className={`h-3 w-3 rounded-full ${
                            gpuStatus.isAvailable
                                ? "bg-green-500"
                                : "bg-red-500"
                        } mr-2`}
                    ></div>
                    <span className="text-sm font-medium text-nevada">
                        {gpuStatus.isAvailable
                            ? `${gpuStatus.availableGPUs}/${gpuStatus.totalGPUs} GPUs Available`
                            : "GPUs Busy"}
                    </span>
                </div>
            </div>

            {/* Hero section - full width with content centered */}
            <section className="relative bg-gradient-to-br from-firefly to-san-juan py-16 px-4 w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-bold mb-6 text-iron">
                                Human Machine Analysis Lab
                            </h1>
                            <p className="text-iron/90 text-xl max-w-2xl leading-relaxed mb-8">
                                Pioneering the future of AI and Machine Learning
                                through groundbreaking research and innovative
                                solutions that bridge the gap between human
                                intelligence and machine capabilities.
                            </p>
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    className="font-semibold"
                                >
                                    <Link to="/projects">Explore Projects</Link>
                                </Button>
                                <Button
                                    variant="outline1"
                                    className="font-semibold"
                                >
                                    <Link to="/contact">Join Our Team</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
                            <img
                                src="https://images.stockcake.com/public/c/b/6/cb6c2bd9-7d40-49d0-9e35-ec51818e2e30_medium/futuristic-laboratory-analysis-stockcake.jpg"
                                alt="Lab Research"
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover object-center"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats section - contained */}
            <div className="px-4">
                <section className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dummyData.stats.map((stat) => (
                            <Card
                                key={stat.id}
                                className="text-center transform hover:-translate-y-1 transition-all duration-300 border border-iron/10"
                            >
                                <div className="text-4xl font-bold text-san-juan mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-nevada font-medium">
                                    {stat.label}
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>

            {/* Research section - full width background with contained content */}
            <section className="w-full bg-iron/10 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="Research Areas"
                        subtitle="Exploring the frontiers of artificial intelligence and machine learning"
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        {dummyData.researchAreas.map((area) => (
                            <Card
                                key={area.id}
                                className="overflow-hidden group hover:shadow-xl transition-shadow duration-200"
                            >
                                <div className="relative">
                                    <img
                                        src={area.image}
                                        alt={area.title}
                                        className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-firefly/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-firefly mb-3">
                                        {area.title}
                                    </h3>
                                    <p className="text-nevada leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* News section - contained */}
            <div className="px-4">
                <section className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Latest Updates"
                        subtitle="Stay informed about our recent achievements, events, and announcements"
                    />
                    <div className="grid md:grid-cols-2 gap-8">
                        {dummyData.news.map((item) => (
                            <Card
                                key={item.id || item._id}
                                className="group hover:shadow-xl transition-all duration-200"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <span className="text-sm text-casal font-medium">
                                                {item.date}
                                            </span>
                                            <Badge>{item.source}</Badge>
                                        </div>
                                        <h4 className="text-xl font-semibold text-firefly mb-2 group-hover:text-casal transition-colors duration-200">
                                            {item.title}
                                        </h4>
                                        {item.speaker && (
                                            <p className="text-nevada font-medium mb-2">
                                                Speaker: {item.speaker}
                                            </p>
                                        )}
                                        <p className="text-nevada leading-relaxed">
                                            {item.description}
                                        </p>
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 inline-block text-casal hover:text-gothic"
                                            >
                                                Read more →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
