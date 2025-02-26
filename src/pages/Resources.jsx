// src/pages/Resources.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card } from "../components/common";
import { api } from "../utils/api";

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Category filter state
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [categories, setCategories] = useState(["All"]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await api.getItems("resources");
                setResources(data);

                // Extract unique categories
                const uniqueCategories = [
                    "All",
                    ...new Set(data.map((item) => item.category)),
                ];
                setCategories(uniqueCategories);

                setLoading(false);
            } catch (err) {
                setError("Failed to load resources");
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const filteredResources =
        selectedCategory === "All"
            ? resources
            : resources.filter(
                  (resource) => resource.category === selectedCategory
              );

    if (loading)
        return <div className="text-center py-20">Loading resources...</div>;
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research Resources"
                subtitle="Tutorials, tools, and materials to support your research"
            />

            {/* Category filter buttons */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category
                                ? "bg-casal text-white"
                                : "bg-iron/20 text-nevada hover:bg-iron/30"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-xl transition-all duration-300 border border-iron/10 h-full flex flex-col"
                    >
                        {resource.image && (
                            <div className="mb-4">
                                <img
                                    src={resource.image}
                                    alt={resource.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-firefly">
                                        {resource.title}
                                    </h3>
                                    <span className="text-xs bg-iron/20 text-nevada px-2 py-1 rounded">
                                        {resource.category}
                                    </span>
                                </div>
                                <p className="text-nevada mb-4">
                                    {resource.description}
                                </p>
                                <p className="text-sm text-nevada">
                                    By: {resource.author}
                                </p>
                            </div>
                            {resource.link && (
                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-casal hover:text-gothic transition-colors"
                                >
                                    View Resource →
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Resources;
