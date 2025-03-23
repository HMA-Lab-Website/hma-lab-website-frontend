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
        <div className="alumni-flip-card h-[500px]">
            {" "}
            {/* Fixed height for consistent cards */}
            {/* Front side */}
            <div className="alumni-flip-front">
                <Card className="h-full shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                        {person.image ? (
                            <div className="h-64 overflow-hidden">
                                {" "}
                                {/* Increased height from h-48 to h-64 */}
                                <img
                                    src={person.image}
                                    alt={person.name}
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-duration-500"
                                />
                            </div>
                        ) : (
                            <div className="h-64 bg-gradient-to-r from-casal/20 to-firefly/20 flex items-center justify-center">
                                <svg
                                    className="h-20 w-20 text-iron" // Increased size and changed color
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
                            </div>
                        )}

                        <div className="p-6 flex-grow flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {person.name}
                                </h3>
                                <p className="text-sm text-casal mb-2">
                                    Batch: {person.batch || "N/A"}
                                </p>
                                <p className="text-nevada text-sm mb-2">
                                    <span className="font-medium">
                                        Current:
                                    </span>{" "}
                                    {person.current_position || "N/A"}
                                </p>
                                <p className="text-nevada text-sm mb-4">
                                    <span className="font-medium">
                                        Contributions:
                                    </span>{" "}
                                    {person.contributions ||
                                        "Research and development"}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex items-center gap-4 mb-4">
                                    {person.linkedin && (
                                        <a
                                            href={person.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-casal hover:text-gothic transition-colors flex items-center"
                                        >
                                            <svg
                                                className="h-5 w-5 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            LinkedIn
                                        </a>
                                    )}
                                </div>

                                <div className="flex justify-center">
                                    <span className="bg-casal/10 text-casal text-xs px-3 py-1.5 rounded-full inline-flex items-center hover:bg-casal/20 transition-colors">
                                        <svg
                                            className="w-3 h-3 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Hover to see testimonial
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
            {/* Back side */}
            <div className="alumni-flip-back">
                <Card className="h-full shadow-md bg-gradient-to-br from-casal/10 to-firefly/10 flex flex-col justify-center p-8">
                    <div className="mb-6 text-center">
                        <svg
                            className="w-12 h-12 mx-auto text-firefly opacity-30"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                    <p className="text-nevada text-lg italic font-light text-center mb-6">
                        {testimonial}
                    </p>
                    <div className="text-center mt-4">
                        <div className="font-medium text-xl text-firefly mb-1">
                            {person.name}
                        </div>
                        <div className="text-sm text-casal">
                            {person.batch || "Alumni"}
                        </div>
                        {person.current_location && (
                            <div className="mt-6">
                                <a
                                    href={person.current_location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-casal hover:text-gothic transition-colors"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1"
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
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Alumni;
