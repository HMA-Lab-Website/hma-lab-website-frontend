// src/pages/Datasets.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const Datasets = () => {
    const [datasets, setDatasets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading)
        return <div className="text-center py-20">Loading datasets...</div>;
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research Datasets"
                subtitle="Curated data collections for machine learning and AI research"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {datasets.map((dataset, index) => (
                    <Card
                        key={index}
                        className="h-full hover:shadow-xl transition-all duration-300 border border-iron/10"
                    >
                        {dataset.image && (
                            <div className="mb-4">
                                <img
                                    src={dataset.image}
                                    alt={dataset.name}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </div>
                        )}
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-firefly mb-2">
                                {dataset.name}
                            </h3>
                            <p className="text-nevada mb-4">
                                {dataset.description}
                            </p>
                            <div className="flex justify-between items-center text-sm mb-4">
                                <span className="text-nevada">
                                    Size: {dataset.size}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                    {dataset.format &&
                                        dataset.format.map((format, i) => (
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
                                    className="inline-block mt-2 text-casal hover:text-gothic transition-colors"
                                >
                                    Access Dataset →
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Datasets;
