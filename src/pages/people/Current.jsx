// src/pages/people/Current.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader } from "../../components/common";
import { api } from "../../utils/api";

const Current = () => {
    const [people, setPeople] = useState({
        faculty: [],
        postdocs: [],
        phdScholars: [],
        masters: [],
        researchAssociatesTech: [],
        researchAssociatesLanguage: [],
        other: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const data = await api.getItems("people");

                // Filter out alumni or people whose role contains "alumni" or "former"
                const currentPeople = data.filter(
                    (person) =>
                        person.role &&
                        !person.role.toLowerCase().includes("alumni") &&
                        !person.role.toLowerCase().includes("former")
                );

                // Categorize people based on their roles
                const categorizedPeople = {
                    faculty: currentPeople.filter(
                        (person) =>
                            person.role &&
                            person.role.toLowerCase().includes("faculty")
                    ),
                    postdocs: currentPeople.filter(
                        (person) =>
                            person.role &&
                            (person.role.toLowerCase().includes("post") ||
                                person.role.toLowerCase().includes("postdoc"))
                    ),
                    phdScholars: currentPeople.filter(
                        (person) =>
                            person.role &&
                            (person.role.toLowerCase().includes("phd") ||
                                person.role.toLowerCase().includes("scholar"))
                    ),
                    masters: currentPeople.filter(
                        (person) =>
                            person.role &&
                            person.role.toLowerCase().includes("msr")
                    ),
                    researchAssociatesTech: currentPeople.filter(
                        (person) =>
                            person.role &&
                            person.role.toLowerCase().includes("research") &&
                            person.role.toLowerCase().includes("tech")
                    ),
                    researchAssociatesLanguage: currentPeople.filter(
                        (person) =>
                            person.role &&
                            person.role.toLowerCase().includes("research") &&
                            person.role.toLowerCase().includes("language")
                    ),
                    other: currentPeople.filter(
                        (person) =>
                            !person.role ||
                            (!person.role.toLowerCase().includes("faculty") &&
                                !person.role.toLowerCase().includes("post") &&
                                !person.role.toLowerCase().includes("phd") &&
                                !person.role
                                    .toLowerCase()
                                    .includes("scholar") &&
                                !person.role.toLowerCase().includes("msr") &&
                                !person.role.toLowerCase().includes("research"))
                    ),
                };

                setPeople(categorizedPeople);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching people data:", err);
                setError("Failed to load people data");
                setLoading(false);
            }
        };

        fetchPeople();
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
                    className="mt-4 px-4 py-2 bg-firefly text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const renderSection = (title, peopleList) => {
        if (peopleList.length === 0) return null;

        return (
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-firefly mb-8 text-center">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {peopleList.map((person, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center"
                        >
                            {person.image && (
                                <div className="mb-4 w-40 h-40 overflow-hidden">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            )}
                            <h3 className="text-xl font-semibold text-gothic">
                                {person.name}
                            </h3>
                            {person.role && (
                                <p className="text-casal text-sm">
                                    {person.role}
                                </p>
                            )}
                            {person.date && (
                                <p className="text-nevada text-sm mt-1">
                                    {person.date}
                                </p>
                            )}
                            {person.topic && (
                                <p className="text-nevada text-sm mt-2">
                                    <span className="font-medium">Topic:</span>{" "}
                                    {person.topic}
                                </p>
                            )}
                            {person.bio && (
                                <p className="text-nevada text-sm mt-2 max-w-xs">
                                    {person.bio}
                                </p>
                            )}

                            <div className="flex mt-3 gap-4 justify-center">
                                {person.email && (
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="text-casal hover:text-gothic transition-colors text-sm"
                                    >
                                        Email
                                    </a>
                                )}
                                {person.linkedin && (
                                    <a
                                        href={person.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-casal hover:text-gothic transition-colors text-sm"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Special faculty rendering (single column)
    const renderFacultySection = (title, facultyList) => {
        if (facultyList.length === 0) return null;

        return (
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-firefly mb-8 text-center">
                    {title}
                </h2>

                <div className="flex flex-col items-center">
                    {facultyList.map((person, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center mb-12 max-w-2xl"
                        >
                            {person.image && (
                                <div className="mb-4 w-48 h-48 overflow-hidden">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            )}
                            <h3 className="text-2xl font-semibold text-gothic">
                                {person.name}
                            </h3>
                            {person.role && (
                                <p className="text-casal">{person.role}</p>
                            )}
                            {person.bio && (
                                <p className="text-nevada mt-3">{person.bio}</p>
                            )}

                            <div className="flex mt-4 gap-6 justify-center">
                                {person.email && (
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="text-casal hover:text-gothic transition-colors"
                                    >
                                        Email
                                    </a>
                                )}
                                {person.linkedin && (
                                    <a
                                        href={person.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-casal hover:text-gothic transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Current People"
                subtitle="Meet the talented individuals who make our research possible"
            />

            {/* Faculty Section - Special rendering */}
            {renderFacultySection("Faculty", people.faculty)}

            {/* Post-Doctoral Researchers */}
            {renderSection("Post Doctoral Researchers", people.postdocs)}

            {/* PhD Scholars */}
            {renderSection("Graduate Students", people.phdScholars)}

            {/* Masters Students */}
            {renderSection("Masters Students", people.masters)}

            {/* Research Associates - Technical */}
            {renderSection(
                "Research Associates (Technical)",
                people.researchAssociatesTech
            )}

            {/* Research Associates - Language */}
            {renderSection(
                "Research Associates (Language)",
                people.researchAssociatesLanguage
            )}

            {/* Other Members */}
            {people.other.length > 0 &&
                renderSection("Other Members", people.other)}
        </div>
    );
};

export default Current;
