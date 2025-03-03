// src/pages/people/Students.jsx
import React, { useState, useEffect } from "react";
import { SectionHeader, Card } from "../../components/common";
import { api } from "../../utils/api";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Fetch from "people" collection as per schema
                const data = await api.getItems("people");

                // Filter for students (exclude faculty, PhD scholars, and honors students)
                const regularStudents = data.filter((person) => {
                    if (!person.role) return false;

                    const role = person.role.toLowerCase();
                    return (
                        role.includes("student") &&
                        !role.includes("phd") &&
                        !role.includes("scholar") &&
                        !role.includes("honors") &&
                        !role.includes("faculty")
                    );
                });

                setStudents(regularStudents);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching students data:", err);
                setError("Failed to load students data");
                setLoading(false);
            }
        };

        fetchStudents();
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

    if (students.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
                <SectionHeader
                    title="Students"
                    subtitle="Graduate and undergraduate students involved in our research"
                />
                <p className="text-center text-lg text-nevada">
                    No students found.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Students"
                subtitle="Graduate and undergraduate students involved in our research"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {students.map((student, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="flex flex-col">
                            {student.image ? (
                                <div className="w-full">
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className="w-full h-64 object-cover object-center"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
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
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-firefly mb-2">
                                    {student.name}
                                </h3>
                                <p className="text-sm text-casal mb-3">
                                    {student.role}
                                </p>
                                {student.email && (
                                    <p className="text-nevada mb-2">
                                        <span className="font-medium">
                                            Email:
                                        </span>{" "}
                                        {student.email}
                                    </p>
                                )}
                                {student.bio && (
                                    <p className="text-nevada mb-4">
                                        {student.bio}
                                    </p>
                                )}
                                {student.linkedin && (
                                    <a
                                        href={student.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline flex items-center"
                                    >
                                        <svg
                                            className="h-4 w-4 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                        LinkedIn
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

export default Students;
