// src/pages/People.jsx
import React from "react";
import { Link } from "react-router-dom";
import { SectionHeader, Card } from "../components/common";

const People = () => {
    const categories = [
        {
            title: "Current Members",
            path: "/people/current",
            description:
                "Meet our faculty, researchers, graduate students and staff who make our research possible",
            image: "https://billericalibrary.org/wp-content/uploads/Teamwork-clipart-2.jpg", // Add a placeholder image path
        },
        {
            title: "Alumni",
            path: "/people/alumni",
            description:
                "Former lab members who have contributed to our research journey",
            image: "https://bestaccreditedcolleges.org/cimages/multimages/16/twitter-socialnetwork.jpg", // Add a placeholder image path
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Our Team"
                subtitle="The talented individuals behind our research and innovations"
            />

            <div className="grid gap-12 md:grid-cols-2">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className="no-underline group"
                    >
                        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-iron/10 overflow-hidden">
                            {category.image && (
                                <div className="h-48 w-full overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        // If images don't exist, you can remove the image sections
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-firefly mb-3">
                                    {category.title}
                                </h3>
                                <p className="text-nevada">
                                    {category.description}
                                </p>
                                <div className="mt-4 text-casal group-hover:text-gothic transition-colors flex items-center">
                                    <span>View Members</span>
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
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default People;
