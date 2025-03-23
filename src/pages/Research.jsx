// src/pages/Research.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const Research = () => {
    const [publications, setPublications] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // For filtering publications by year
    const [selectedYear, setSelectedYear] = useState("All");
    const [years, setYears] = useState(["All"]);

    useEffect(() => {
        const fetchResearchData = async () => {
            try {
                // Fetch both publications and projects
                const [publicationsData, projectsData] = await Promise.all([
                    api.getItems("publications"),
                    api.getItems("projects"),
                ]);

                setPublications(publicationsData);
                setProjects(projectsData);

                // Extract unique years for filtering
                const uniqueYears = [
                    "All",
                    ...new Set(
                        publicationsData
                            .map((pub) => pub.year)
                            .filter(Boolean)
                            .sort((a, b) => b - a) // Sort years in descending order
                    ),
                ];

                setYears(uniqueYears);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching research data:", err);
                setError("Failed to load research data");
                setLoading(false);
            }
        };

        fetchResearchData();
    }, []);

    // Filter publications by year if a specific year is selected
    const filteredPublications =
        selectedYear === "All"
            ? publications
            : publications.filter((pub) => pub.year === selectedYear);

    if (loading)
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-600">
                <p className="text-xl">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-opacity-90 transition-colors"
                >
                    Try Again
                </button>
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research"
                subtitle="Exploring the frontiers of AI and Machine Learning"
            />

            {/* Research Focus Areas */}
            <div className="mb-16">
                <h2 className="text-2xl font-semibold text-casal mb-6">
                    Our Research Focus
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-iron/5 p-6 rounded-lg border border-iron/10 hover:shadow-md transition-all">
                        <h3 className="text-lg font-medium text-gothic mb-3">
                            Machine Learning
                        </h3>
                        <p className="text-nevada">
                            Developing novel algorithms and approaches to
                            improve machine learning capabilities.
                        </p>
                    </div>
                    <div className="bg-iron/5 p-6 rounded-lg border border-iron/10 hover:shadow-md transition-all">
                        <h3 className="text-lg font-medium text-gothic mb-3">
                            Natural Language Processing
                        </h3>
                        <p className="text-nevada">
                            Advancing techniques for machines to understand and
                            generate human language.
                        </p>
                    </div>
                    <div className="bg-iron/5 p-6 rounded-lg border border-iron/10 hover:shadow-md transition-all">
                        <h3 className="text-lg font-medium text-gothic mb-3">
                            Computer Vision
                        </h3>
                        <p className="text-nevada">
                            Creating systems that can effectively process and
                            analyze visual data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Publications Section */}
            <div className="mb-16">
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-casal">
                        Recent Publications
                    </h2>

                    {/* Year filter */}
                    <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-sm text-nevada">
                            Filter by year:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-3 py-1 text-xs font-medium rounded ${
                                        selectedYear === year
                                            ? "bg-gray-300 text-black"
                                            : "bg-iron/10 text-nevada hover:bg-iron/20"
                                    }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredPublications.length === 0 && (
                    <p className="text-center text-nevada py-8">
                        No publications found for the selected year.
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {filteredPublications
                        .slice(0, 4)
                        .map((publication, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-xl transition-shadow duration-200 h-full"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-3">
                                        <Badge className="bg-gray-300/10 text-casal">
                                            {publication.year}
                                        </Badge>
                                        {publication.journal && (
                                            <span className="text-xs text-nevada italic">
                                                {publication.journal}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-xl font-semibold text-gothic mb-2">
                                        {publication.title}
                                    </h3>

                                    <p className="text-sm text-nevada mb-3 italic">
                                        {publication.authors}
                                    </p>

                                    {publication.image && (
                                        <div className="mb-4">
                                            <img
                                                src={publication.image}
                                                alt={publication.title}
                                                className="w-full h-40 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}

                                    {publication.abstract && (
                                        <p className="text-nevada mb-4 flex-grow">
                                            {publication.abstract.length > 150
                                                ? `${publication.abstract.substring(
                                                      0,
                                                      150
                                                  )}...`
                                                : publication.abstract}
                                        </p>
                                    )}

                                    {publication.link && (
                                        <a
                                            href={publication.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto text-casal hover:text-gothic transition-colors inline-flex items-center"
                                        >
                                            View Paper
                                            <svg
                                                className="w-4 h-4 ml-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                ></path>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </Card>
                        ))}
                </div>

                {publications.length > 4 && (
                    <div className="mt-8 text-center">
                        <Link
                            to="/publications"
                            className="inline-block px-5 py-2 bg-gray-300 text-black rounded-md hover:bg-opacity-90 transition-colors"
                        >
                            View All Publications
                        </Link>
                    </div>
                )}
            </div>

            {/* Current Projects Highlight */}
            <div>
                <h2 className="text-2xl font-semibold text-casal mb-6">
                    Featured Projects
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.slice(0, 3).map((project, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden hover:shadow-xl transition-shadow duration-200"
                        >
                            {project.image ? (
                                <div className="w-full">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-48 bg-iron/20 flex items-center justify-center">
                                    <svg
                                        className="h-16 w-16 text-iron/30"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                        />
                                    </svg>
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <Badge
                                        className={
                                            project.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-blue-100 text-blue-800"
                                        }
                                    >
                                        {project.status || "Ongoing"}
                                    </Badge>
                                    <span className="text-xs text-nevada">
                                        {project.start_date &&
                                            project.start_date.substring(0, 4)}
                                        {project.end_date &&
                                            ` - ${project.end_date.substring(
                                                0,
                                                4
                                            )}`}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-gothic mb-3">
                                    {project.title}
                                </h3>

                                <p className="text-nevada mb-4">
                                    {project.description &&
                                    project.description.length > 120
                                        ? `${project.description.substring(
                                              0,
                                              120
                                          )}...`
                                        : project.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/projects/${
                                            project.doc_id || index
                                        }`}
                                        className="text-casal hover:text-gothic transition-colors"
                                    >
                                        Learn more →
                                    </Link>

                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/projects"
                        className="inline-block px-5 py-2 border border-casal text-casal hover:bg-gray-300 hover:text-black rounded-md transition-colors"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Research;
