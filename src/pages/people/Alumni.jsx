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
                setError("Failed to load alumni data");
                setLoading(false);
            }
        };

        fetchAlumni();
    }, []);

    if (loading)
        return <div className="text-center py-20">Loading alumni data...</div>;
    if (error)
        return <div className="text-center py-20 text-red-600">{error}</div>;

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
                            {person.image && (
                                <div className="mb-4">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
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
                                            className="text-casal hover:text-gothic transition-colors"
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

                                    {person.Current_Location && (
                                        <a
                                            href={person.Current_Location}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-casal hover:text-gothic transition-colors flex items-center"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                            </svg>
                                            <span className="ml-1">
                                                Location
                                            </span>
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
