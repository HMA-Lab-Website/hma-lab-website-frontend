// src/pages/people/Current.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Button } from "../../components/common";
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
    const [selectedPerson, setSelectedPerson] = useState(null);

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

                // Categorize people
                const categorizedPeople = {
                    faculty: currentPeople.filter((person) =>
                        person.role.toLowerCase().includes("faculty")
                    ),
                    postdocs: currentPeople.filter((person) =>
                        person.role.toLowerCase().includes("post")
                    ),
                    phdScholars: currentPeople.filter(
                        (person) =>
                            person.role.toLowerCase().includes("phd") ||
                            person.role.toLowerCase().includes("doctoral") ||
                            person.role.toLowerCase().includes("scholar")
                    ),
                    masters: currentPeople.filter(
                        (person) =>
                            person.role.toLowerCase().includes("masters") ||
                            person.role.toLowerCase().includes("msr")
                    ),
                    researchAssociatesTech: currentPeople.filter(
                        (person) =>
                            person.role.toLowerCase().includes("research") &&
                            person.role.toLowerCase().includes("tech")
                    ),
                    researchAssociatesLanguage: currentPeople.filter(
                        (person) =>
                            person.role.toLowerCase().includes("research") &&
                            person.role.toLowerCase().includes("language")
                    ),
                    other: currentPeople.filter(
                        (person) =>
                            !person.role.toLowerCase().includes("faculty") &&
                            !person.role.toLowerCase().includes("post") &&
                            !person.role.toLowerCase().includes("phd") &&
                            !person.role.toLowerCase().includes("scholar") &&
                            !person.role.toLowerCase().includes("msr") &&
                            !person.role.toLowerCase().includes("research")
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

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                selectedPerson &&
                event.target.classList.contains("modal-backdrop")
            ) {
                setSelectedPerson(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedPerson]);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedPerson) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedPerson]);

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

    const truncateBio = (text, maxLength = 120) => {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const renderSection = (title, peopleList) => {
        if (peopleList.length === 0) return null;

        return (
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-firefly mb-8 text-center">
                    {title}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {peopleList.map((person, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full"
                        >
                            {person.image && (
                                <div className="mb-6 overflow-hidden w-32 h-32">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105"
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
                                <div className="mt-2">
                                    <p className="text-nevada text-sm">
                                        {truncateBio(person.bio)}
                                    </p>
                                    {person.bio.length > 120 && (
                                        <button
                                            onClick={() =>
                                                setSelectedPerson(person)
                                            }
                                            className="text-firefly hover:text-casal text-sm mt-2 font-medium"
                                        >
                                            Read more
                                        </button>
                                    )}
                                </div>
                            )}

                            <div className="flex mt-4 gap-3 justify-center pt-3">
                                {person.email && (
                                    <a
                                        href={`mailto:${person.email}`}
                                        className="px-3 py-1.5 bg-gradient-to-r from-casal to-firefly text-black rounded-md hover:opacity-90 transition-all duration-300 text-sm flex items-center shadow-sm"
                                        title={`Email ${person.name}`}
                                    >
                                        <svg
                                            className="h-4 w-4 mr-1.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                        </svg>
                                        <span>Email</span>
                                    </a>
                                )}
                                {person.linkedin && (
                                    <a
                                        href={person.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1.5 bg-[#0A66C2] text-black rounded-md hover:bg-[#004182] transition-colors duration-300 text-sm flex items-center shadow-sm"
                                        title="View LinkedIn Profile"
                                    >
                                        <svg
                                            className="h-4 w-4 mr-1.5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        );
    };

    // Special faculty rendering
    const renderFacultySection = (title, facultyList) => {
        if (facultyList.length === 0) return null;

        return (
            <div className="mb-20">
                <h2 className="text-2xl font-bold text-firefly mb-8 text-center">
                    {title}
                </h2>

                <div className="flex flex-col items-center">
                    {facultyList.map((person, index) => (
                        <Card
                            key={index}
                            className="mb-12 p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left max-w-3xl w-full hover:shadow-xl transition-all duration-300"
                        >
                            {person.image && (
                                <div className="mb-6 md:mb-0 mr-0 md:mr-8 overflow-hidden w-40 h-40 flex-shrink-0">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-2xl font-semibold text-gothic">
                                    {person.name}
                                </h3>
                                {person.role && (
                                    <p className="text-casal">{person.role}</p>
                                )}
                                {person.bio && (
                                    <div className="mt-3">
                                        <p className="text-nevada">
                                            {truncateBio(person.bio, 200)}
                                        </p>
                                        {person.bio.length > 200 && (
                                            <button
                                                onClick={() =>
                                                    setSelectedPerson(person)
                                                }
                                                className="text-firefly hover:text-casal mt-2 font-medium"
                                            >
                                                Read full bio
                                            </button>
                                        )}
                                    </div>
                                )}

                                <div className="flex mt-6 gap-4 justify-center md:justify-start">
                                    {person.email && (
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="px-4 py-2 bg-gradient-to-r from-casal to-firefly text-black rounded-md hover:opacity-90 transition-all duration-300 flex items-center shadow-sm"
                                            title={`Email ${person.name}`}
                                        >
                                            <svg
                                                className="h-4 w-4 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                            <span>Contact via Email</span>
                                        </a>
                                    )}
                                    {person.linkedin && (
                                        <a
                                            href={person.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-[#0A66C2] text-black rounded-md hover:bg-[#004182] transition-colors duration-300 flex items-center shadow-sm"
                                            title="View LinkedIn Profile"
                                        >
                                            <svg
                                                className="h-4 w-4 mr-2"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            <span>LinkedIn Profile</span>
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

    // Bio Modal Component - Fixed for mobile
    const BioModal = ({ person }) => {
        if (!person) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-start justify-center p-4 modal-backdrop overflow-y-auto">
                <div
                    className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 max-h-[85vh] overflow-hidden relative animate-fadeIn"
                    style={{ marginTop: "3vh" }} // Ensures modal doesn't start too high
                >
                    <div className="sticky top-0 z-10 bg-white p-4 sm:p-6 flex justify-between items-center border-b">
                        <h3 className="text-xl font-semibold text-gothic">
                            {person.name}
                        </h3>
                        <button
                            onClick={() => setSelectedPerson(null)}
                            className="text-nevada hover:text-gothic h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
                            aria-label="Close"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div
                        className="p-4 sm:p-6 overflow-y-auto"
                        style={{ maxHeight: "calc(75vh - 120px)" }}
                    >
                        {/* Content remains the same */}
                        <div className="flex flex-col items-center mb-6">
                            {person.image && (
                                <div className="mb-4 w-36 h-36 overflow-hidden">
                                    <img
                                        src={person.image}
                                        alt={person.name}
                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            {person.role && (
                                <p className="text-casal text-center">
                                    {person.role}
                                </p>
                            )}
                        </div>

                        {person.bio && (
                            <div className="text-nevada text-base">
                                {person.bio.split("\n").map((paragraph, i) => (
                                    <p key={i} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        )}

                        {person.topic && (
                            <div className="mt-6 p-3 bg-iron/5 rounded-md border border-iron/10">
                                <h4 className="font-medium text-gothic">
                                    Research Topic
                                </h4>
                                <p className="text-nevada">{person.topic}</p>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap gap-4 justify-center sm:justify-start">
                            {person.email && (
                                <a
                                    href={`mailto:${person.email}`}
                                    className="px-4 py-2.5 bg-gradient-to-r from-casal to-firefly text-black rounded-md hover:opacity-90 transition-all duration-300 flex items-center shadow-sm"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                    </svg>
                                    Contact via Email
                                </a>
                            )}
                            {person.linkedin && (
                                <a
                                    href={person.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 bg-[#0A66C2] text-black rounded-md hover:bg-[#004182] transition-colors duration-300 flex items-center shadow-sm"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    LinkedIn Profile
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-white p-4 flex justify-end border-t">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedPerson(null)}
                            className="px-6 py-2.5 text-sm"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Our Team"
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

            {/* Bio Modal */}
            {selectedPerson && <BioModal person={selectedPerson} />}
        </div>
    );
};

export default Current;
