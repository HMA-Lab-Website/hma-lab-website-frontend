// src/pages/people/PhDScholars.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card } from "../../components/common";
import { api } from "../../utils/api";

const PhDScholars = () => {
    const [scholars, setScholars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScholars = async () => {
            try {
                const data = await api.getItems("phd_scholars");
                setScholars(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load PhD scholars data");
                setLoading(false);
            }
        };

        fetchScholars();
    }, []);

    if (loading)
        return (
            <div className="text-center py-20">
                Loading PhD scholars data...
            </div>
        );
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="PhD Scholars"
                subtitle="Doctoral researchers advancing the frontiers of knowledge"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {scholars.map((scholar, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="flex flex-col">
                            {scholar.image && (
                                <div className="w-full">
                                    <img
                                        src={scholar.image}
                                        alt={scholar.name}
                                        className="w-full h-64 object-cover object-center"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {scholar.name}
                                </h3>
                                <p className="text-sm text-casal mb-3">
                                    {scholar.role}
                                </p>
                                <p className="text-nevada mb-4">
                                    {scholar.bio}
                                </p>
                                <div className="flex items-center space-x-4">
                                    <a
                                        href={`mailto:${scholar.email}`}
                                        className="text-casal hover:text-gothic transition-colors"
                                    >
                                        {scholar.email}
                                    </a>
                                    {scholar.linkedin && (
                                        <a
                                            href={scholar.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-iron hover:text-gray500 transition-colors"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PhDScholars;
