// src/pages/people/Alumni.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card } from "../../components/common";
import { api } from "../../utils/api";

const Alumni = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlumni = async () => {
            try {
                const data = await api.getItems("alumni");
                setAlumni(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching alumni data:", err);
                setError("Failed to load alumni data");
                setLoading(false);
            }
        };

        fetchAlumni();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p className="text-xl">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-firefly text-white rounded-md hover:bg-san-juan transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (alumni.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
                <SectionHeader
                    title="Alumni"
                    subtitle="Former members of our lab and their achievements"
                />
                <p className="text-center text-lg text-nevada">
                    No alumni found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Alumni"
                subtitle="Former members of our lab and their achievements"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {alumni.map((person, index) => (
                    <AlumniCard key={index} person={person} />
                ))}
            </div>
        </div>
    );
};

// Alumni card with proper flip effect
const AlumniCard = ({ person }) => {
    const testimonial =
        person.testimonial ||
        `My time at the lab was invaluable. The mentorship and collaborative environment helped shape my career path and research interests.`;

    return (
        <Card className="group h-full bg-white shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col h-full">
                {/* Image Section */}
                {person.image ? (
                    <div className="relative h-96 overflow-hidden">
                        <img
                            src={person.image}
                            alt={person.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-firefly/80 via-firefly/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {person.name}
                            </h3>
                            <p className="text-iron/90">
                                Batch: {person.batch || "N/A"}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="h-96 bg-gradient-to-br from-casal/20 to-firefly/20 flex items-center justify-center relative">
                        <svg
                            className="h-24 w-24 text-iron/50"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-bold text-firefly mb-1">
                                {person.name}
                            </h3>
                            <p className="text-casal">
                                Batch: {person.batch || "N/A"}
                            </p>
                        </div>
                    </div>
                )}

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-casal/10 text-casal rounded-full text-sm">
                                Alumni
                            </span>
                        </div>

                        <p className="text-nevada text-sm mb-3">
                            <span className="font-medium text-firefly">
                                Current Position:
                            </span>
                            <br />
                            {person.current_position || "N/A"}
                        </p>

                        <p className="text-nevada text-sm">
                            <span className="font-medium text-firefly">
                                Contributions:
                            </span>
                            <br />
                            {person.contributions || "Research and development"}
                        </p>
                    </div>

                    {/* Testimonial */}
                    <div className="mt-auto">
                        <blockquote className="border-l-2 border-casal/30 pl-4 italic text-sm text-nevada">
                            "{testimonial}"
                        </blockquote>

                        <div className="flex items-center gap-4 mt-6">
                            {person.linkedin && (
                                <a
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-casal/10 text-casal hover:bg-casal hover:text-white rounded-md transition-colors flex items-center text-sm"
                                >
                                    <svg
                                        className="h-4 w-4 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    Connect
                                </a>
                            )}

                            {person.current_location && (
                                <a
                                    href={person.current_location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-firefly/10 text-firefly hover:bg-firefly hover:text-white rounded-md transition-colors flex items-center text-sm"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    View Location
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Alumni;
