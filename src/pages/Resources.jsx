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
    const [resourceType, setResourceType] = useState("All"); // New filter for resource/dataset

    useEffect(() => {
        const fetchResourcesAndDatasets = async () => {
            try {
                // Fetch both resources and datasets
                const [resourcesData, datasetsData] = await Promise.all([
                    api.getItems("resources"),
                    api.getItems("datasets"),
                ]);

                // Transform datasets to match resource structure and add source type
                const formattedDatasets = datasetsData.map((dataset) => {
                    // Ensure format is always an array
                    let formats = [];
                    if (dataset.format) {
                        formats = Array.isArray(dataset.format)
                            ? dataset.format
                            : [dataset.format];
                    }

                    return {
                        ...dataset,
                        title: dataset.name || "Unnamed Dataset",
                        sourceType: "Dataset",
                        formats: formats,
                        category: dataset.category || "Data",
                    };
                });

                // Transform resources to have sourceType
                const formattedResources = resourcesData.map((resource) => ({
                    ...resource,
                    sourceType: "Resource",
                }));

                // Combine datasets and resources
                const combined = [...formattedResources, ...formattedDatasets];

                // Extract unique categories for filter
                const allCategories = [
                    "All",
                    ...new Set(
                        combined
                            .map((item) => item.category)
                            .filter((category) => category)
                    ),
                ];

                setCategories(allCategories);
                setResources(combined);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching resources and datasets:", err);
                setError("Failed to load resources and datasets");
                setLoading(false);
            }
        };

        fetchResourcesAndDatasets();
    }, []);

    // Filter based on both category and resource type
    const filteredResources = resources.filter((item) => {
        const categoryMatch =
            selectedCategory === "All" || item.category === selectedCategory;
        const typeMatch =
            resourceType === "All" || item.sourceType === resourceType;
        return categoryMatch && typeMatch;
    });

    if (loading)
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-600">
                <p className="text-xl">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gothic transition-colors"
                >
                    Try Again
                </button>
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research Resources & Datasets"
                subtitle="Access tutorials, tools, datasets and materials to support your research"
            />

            {/* Resource type filter - FIXED CONTRAST ISSUES */}
            <div className="flex justify-center mb-4">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        onClick={() => setResourceType("All")}
                        className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
                            resourceType === "All"
                                ? "bg-gray-300 text-black border-casal"
                                : "bg-white text-nevada border-iron hover:bg-iron/10"
                        }`}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={() => setResourceType("Resource")}
                        className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
                            resourceType === "Resource"
                                ? "bg-gray-300 text-black border-casal"
                                : "bg-white text-nevada border-iron hover:bg-iron/10"
                        }`}
                    >
                        Resources
                    </button>
                    <button
                        type="button"
                        onClick={() => setResourceType("Dataset")}
                        className={`px-4 py-2 text-sm font-medium border-t border-b border-r rounded-r-lg ${
                            resourceType === "Dataset"
                                ? "bg-gray-300 text-black border-casal"
                                : "bg-white text-nevada border-iron hover:bg-iron/10"
                        }`}
                    >
                        Datasets
                    </button>
                </div>
            </div>

            {/* Category filter buttons - FIXED CONTRAST ISSUES */}
            <div className="flex flex-wrap justify-center mb-8 gap-2">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedCategory === category
                                ? "bg-gray-300 text-black"
                                : "bg-iron/20 text-nevada hover:bg-iron/30"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {filteredResources.length === 0 && (
                <p className="text-center text-lg text-nevada py-8">
                    No resources or datasets found for the selected filters.
                </p>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((item, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-xl transition-all duration-300 border border-iron/10 h-full flex flex-col"
                    >
                        {item.image ? (
                            <div className="mb-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg">
                                <svg
                                    className="h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {item.sourceType === "Dataset" ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    )}
                                </svg>
                            </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-gothic">
                                        {item.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${
                                                item.sourceType === "Dataset"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                            }`}
                                        >
                                            {item.sourceType}
                                        </span>
                                        {item.category && (
                                            <span className="text-xs bg-iron/20 text-nevada px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <p className="text-nevada mb-4">
                                    {item.description}
                                </p>

                                {item.sourceType === "Dataset" && item.size && (
                                    <p className="text-sm text-nevada mb-1">
                                        <span className="font-medium">
                                            Size:
                                        </span>{" "}
                                        {item.size}
                                    </p>
                                )}

                                {item.sourceType === "Dataset" &&
                                    item.formats &&
                                    Array.isArray(item.formats) &&
                                    item.formats.length > 0 && (
                                        <p className="text-sm text-nevada mb-1">
                                            <span className="font-medium">
                                                Formats:
                                            </span>{" "}
                                            {item.formats.join(", ")}
                                        </p>
                                    )}

                                {item.sourceType === "Resource" &&
                                    item.author && (
                                        <p className="text-sm text-nevada">
                                            By: {item.author}
                                        </p>
                                    )}
                            </div>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-block text-casal hover:text-gothic transition-colors font-medium"
                                >
                                    {item.sourceType === "Dataset"
                                        ? "Access Dataset →"
                                        : "View Resource →"}
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
