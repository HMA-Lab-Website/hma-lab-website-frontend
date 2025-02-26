// src/pages/Publications.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card } from "../components/common";
import { api } from "../utils/api";

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await api.getItems("publications");
                setPublications(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load publications");
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading)
        return <div className="text-center py-20">Loading publications...</div>;
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Publications"
                subtitle="Research papers and articles published by our lab members"
            />

            <div className="grid gap-8 md:grid-cols-2">
                {publications.map((publication, index) => (
                    <Card
                        key={index}
                        className="hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="flex flex-col h-full">
                            {publication.image && (
                                <div className="mb-4">
                                    <img
                                        src={publication.image}
                                        alt={publication.title}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <div>
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {publication.title}
                                </h3>
                                <div className="text-sm text-nevada mb-3">
                                    {publication.authors} ({publication.year}) -{" "}
                                    {publication.journal}
                                </div>
                                <p className="text-nevada mb-4">
                                    {publication.abstract}
                                </p>
                                {publication.link && (
                                    <a
                                        href={publication.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-casal hover:text-gothic transition-colors"
                                    >
                                        View Paper →
                                    </a>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Publications;
