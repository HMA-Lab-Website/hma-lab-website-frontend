// src/pages/Projects.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card, Badge } from "../components/common";
import { api } from "../utils/api";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await api.getItems("projects");
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load projects");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const toggleDescription = (projectId) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [projectId]: !prev[projectId],
        }));
    };

    const truncateDescription = (text, id, maxLength = 150) => {
        if (!text || text.length <= maxLength) return text;

        const isExpanded = expandedDescriptions[id];
        if (isExpanded) {
            return (
                <>
                    <p>{text}</p>
                    <button
                        onClick={() => toggleDescription(id)}
                        className="mt-2 text-sm text-casal hover:text-gothic transition-colors"
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
                    onClick={() => toggleDescription(id)}
                    className="mt-2 text-sm text-casal hover:text-gothic transition-colors"
                >
                    Read more
                </button>
            </>
        );
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
                    Unable to load projects at this time.
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

    if (projects.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
                <SectionHeader
                    title="Research Projects"
                    subtitle="Ongoing and completed research initiatives at our lab"
                />
                <div className="text-center py-12 bg-background rounded-lg border border-iron/20">
                    <p className="text-nevada text-lg">
                        No projects available at the moment.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Research Projects"
                subtitle="Ongoing and completed research initiatives at our lab"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => {
                    const projectId =
                        project.id || project._id || project.doc_id || index;
                    return (
                        <Card
                            key={projectId}
                            className="overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 border border-iron/10"
                        >
                            {project.image ? (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-firefly/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            ) : (
                                <div className="h-48 bg-gradient-to-r from-casal/20 to-firefly/20 flex items-center justify-center">
                                    <svg
                                        className="h-16 w-16 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                            )}
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold text-firefly">
                                        {project.title}
                                    </h3>
                                    <Badge
                                        type={
                                            project.status === "Ongoing"
                                                ? "default"
                                                : "success"
                                        }
                                    >
                                        {project.status}
                                    </Badge>
                                </div>
                                <div className="text-nevada mb-4">
                                    {truncateDescription(
                                        project.description,
                                        projectId
                                    )}
                                </div>

                                {project.technologies && (
                                    <div className="flex flex-wrap gap-1 mt-2 mb-4">
                                        {project.technologies
                                            .split(",")
                                            .map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-iron/10 text-nevada text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                    </div>
                                )}

                                <div className="text-sm text-nevada mt-auto">
                                    <div className="flex justify-between mt-4 border-t border-iron/10 pt-4">
                                        <span>
                                            Started: {project.start_date}
                                        </span>
                                        {project.end_date && (
                                            <span>
                                                Ended: {project.end_date}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {project.github_link && (
                                <div className="px-6 pb-6 pt-2">
                                    <a
                                        href={project.github_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-casal/10 text-casal hover:bg-casal hover:text-white px-4 py-2 rounded-md transition-colors text-sm flex items-center w-full justify-center"
                                    >
                                        View Project
                                    </a>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Projects;
