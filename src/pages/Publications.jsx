// src/pages/Publications.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedAbstracts, setExpandedAbstracts] = useState({});

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

    const toggleAbstract = (pubId) => {
        setExpandedAbstracts((prev) => ({
            ...prev,
            [pubId]: !prev[pubId],
        }));
    };

    const truncateAbstract = (text, id, maxLength = 150) => {
        if (!text || text.length <= maxLength) return text;

        const isExpanded = expandedAbstracts[id];
        if (isExpanded) {
            return (
                <>
                    <p>{text}</p>
                    <button
                        onClick={() => toggleAbstract(id)}
                        className="mt-2 text-sm text-casal hover:text-gothic transition-colors font-medium"
                    >
                        Show less
                    </button>
                </>
            );
        }

        return (
            <>
                <p>{text.substring(0, maxLength)}...</p>
                <button
                    onClick={() => toggleAbstract(id)}
                    className="mt-2 text-sm text-casal hover:text-gothic transition-colors font-medium"
                >
                    Read more
                </button>
            </>
        );
    };

    // Function to copy citation to clipboard
    const copyToClipboard = (citation) => {
        navigator.clipboard.writeText(citation);
        alert("Citation copied to clipboard");
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
            <div className="text-center py-20 text-red-600 bg-red-50 rounded-lg border border-red-100 max-w-3xl mx-auto p-6">
                <p className="text-lg font-medium mb-4">{error}</p>
                <p className="text-nevada mb-6">
                    Unable to load publications at this time.
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

    if (publications.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
                <SectionHeader
                    title="Publications"
                    subtitle="Research papers and articles published by our lab members"
                />
                <div className="text-center py-12 bg-background rounded-lg border border-iron/20">
                    <p className="text-nevada text-lg">
                        No publications available at the moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Publications"
                subtitle="Research papers and articles published by our lab members"
            />

            <div className="grid gap-8 md:grid-cols-2">
                {publications.map((publication, index) => {
                    const pubId =
                        publication.id ||
                        publication._id ||
                        publication.doc_id ||
                        index;
                    return (
                        <Card
                            key={pubId}
                            className="hover:shadow-xl transition-all duration-300 border border-iron/10 overflow-hidden flex flex-col h-full"
                        >
                            {publication.image ? (
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={publication.image}
                                        alt={publication.title}
                                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            ) : (
                                <div className="h-16 flex items-center justify-center bg-gradient-to-r from-casal/10 to-firefly/10">
                                    <Badge type="primary" className="text-md">
                                        {publication.year}
                                    </Badge>
                                </div>
                            )}
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {publication.title}
                                </h3>
                                <div className="text-sm text-casal mb-3 italic">
                                    {publication.authors}
                                </div>
                                <div className="text-sm text-nevada mb-4 flex items-center">
                                    <span className="font-medium mr-2">
                                        {publication.year}
                                    </span>
                                    <span className="text-iron">|</span>
                                    <span className="ml-2">
                                        {publication.journal}
                                    </span>
                                </div>
                                <div className="text-nevada mb-6">
                                    {truncateAbstract(
                                        publication.abstract,
                                        pubId
                                    )}
                                </div>

                                <div className="mt-auto pt-4 border-t border-iron/10 flex flex-wrap gap-3 justify-between">
                                    {publication.link && (
                                        <a
                                            href={publication.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-casal/10 text-casal hover:bg-casal hover:text-white px-4 py-2 rounded-md transition-colors text-sm"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                            View Paper
                                        </a>
                                    )}

                                    <button
                                        onClick={() =>
                                            copyToClipboard(
                                                `${publication.authors} (${publication.year}). ${publication.title}. ${publication.journal}.`
                                            )
                                        }
                                        className="inline-flex items-center bg-firefly/10 text-firefly hover:bg-firefly hover:text-white px-4 py-2 rounded-md transition-colors text-sm"
                                        title="Copy citation to clipboard"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Cite
                                    </button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Publications;
