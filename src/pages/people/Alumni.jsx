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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-firefly"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-600">
                <p className="text-xl">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-firefly text-black rounded-md hover:bg-opacity-90 transition-colors"
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
                    <Card
                        key={index}
                        className="hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="flex flex-col">
                            {person.image ? (
                                <div className="mb-4">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-60 bg-gray-200 flex items-center justify-center mb-4 rounded-lg">
                                    <svg
                                        className="h-20 w-20 text-gray-400"
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
                            <div>
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {person.name}
                                </h3>
                                <p className="text-sm text-casal mb-3">
                                    Batch: {person.batch}
                                </p>
                                <p className="text-nevada mb-3">
                                    <strong>Current:</strong>{" "}
                                    {person.current_position}
                                </p>
                                <p className="text-nevada mb-4">
                                    <strong>Contributions:</strong>{" "}
                                    {person.contributions}
                                </p>

                                <div className="flex items-center space-x-4">
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

                                    {person.Current_Location && (
                                        <a
                                            href={person.Current_Location}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-casal hover:text-gothic transition-colors flex items-center"
                                        >
                                            <svg
                                                className="h-5 w-5 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                            </svg>
                                            Location
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

export default Alumni;
