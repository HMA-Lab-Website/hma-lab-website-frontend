// src/pages/Datasets.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const Datasets = () => {
    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        const fetchDatasets = async () => {
            try {
                const data = await api.getItems("datasets");
                setDatasets(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load datasets");
                setLoading(false);
            }
        };

        fetchDatasets();
    }, []);

    const toggleDescription = (datasetId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [datasetId]: !prev[datasetId],
        }));
    };

    // Function to truncate description and add read more button
    const renderDescription = (dataset) => {
        const id = dataset.id || dataset._id || dataset.doc_id;
        const isExpanded = expandedDescriptions[id];
        const maxLength = 150;

        if (!dataset.description) return null;

        if (dataset.description.length <= maxLength || isExpanded) {
            return (
                <div>
                    <p className="text-nevada mb-2">{dataset.description}</p>
                    {dataset.description.length > maxLength && (
                        <button
                            onClick={() => toggleDescription(id)}
                            className="text-sm text-casal hover:text-gothic transition-colors focus:outline-none"
                        >
                            Show less
                        </button>
                    )}
                </div>
            );
        }

        return (
            <div>
                <p className="text-nevada mb-2">
                    {dataset.description.substring(0, maxLength)}...
                </p>
                <button
                    onClick={() => toggleDescription(id)}
                    className="text-sm text-casal hover:text-gothic transition-colors focus:outline-none"
                >
                    Read more
                </button>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600 bg-red-50 rounded-lg border border-red-100 max-w-3xl mx-auto p-6">
                <p className="text-lg font-medium">{error}</p>
                <p className="mt-2">
                    Please try again later or contact the administrator.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research Datasets"
                subtitle="Curated data collections for machine learning and AI research"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {datasets.map((dataset) => (
                    <Card
                        key={dataset.id || dataset._id || dataset.doc_id}
                        className="h-full hover:shadow-xl transition-all duration-300 border border-iron/10 flex flex-col"
                    >
                        {dataset.image && (
                            <div>
                                <img
                                    src={dataset.image}
                                    alt={dataset.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                        )}
                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-semibold text-firefly mb-2">
                                {dataset.name}
                            </h3>

                            {renderDescription(dataset)}

                            <div className="flex justify-between items-center text-sm mt-auto pt-4">
                                <span className="text-nevada font-medium">
                                    Size: {dataset.size}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {dataset.format &&
                                        (Array.isArray(dataset.format)
                                            ? dataset.format
                                            : [dataset.format]
                                        ).map((format, i) => (
                                            <Badge key={i} type="default">
                                                {format}
                                            </Badge>
                                        ))}
                                </div>
                            </div>
                            {dataset.link && (
                                <a
                                    href={dataset.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 px-4 py-2 bg-casal/10 text-casal hover:bg-casal hover:text-white rounded-md transition-colors text-sm font-medium"
                                >
                                    Access Dataset →
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            {datasets.length === 0 && !loading && !error && (
                <div className="text-center py-12 bg-background rounded-lg border border-iron/20">
                    <p className="text-nevada text-lg">
                        No datasets available at the moment.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Datasets;
