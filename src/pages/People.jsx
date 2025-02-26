// src/pages/People.jsx
import React from "react";
import { Link } from "react-router-dom";
import { SectionHeader, Card } from "../components/common";

const People = () => {
    const categories = [
        {
            title: "Faculty",
            path: "/people/faculty",
            description:
                "Our distinguished faculty members leading the research",
        },
        {
            title: "PhD Scholars",
            path: "/people/phd-scholars",
            description: "Doctoral students pursuing advanced research",
        },
        {
            title: "Honors Students",
            path: "/people/honors-students",
            description: "Students working on honors projects",
        },
        {
            title: "Students",
            path: "/people/students",
            description: "Graduate and undergraduate students",
        },
        {
            title: "Alumni",
            path: "/people/alumni",
            description: "Former members of our lab",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="People"
                subtitle="Meet the team behind our research and innovations"
            />

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category, index) => (
                    <Link
                        key={index}
                        to={category.path}
                        className="no-underline"
                    >
                        <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-iron/10">
                            <h3 className="text-xl font-semibold text-firefly mb-2">
                                {category.title}
                            </h3>
                            <p className="text-nevada">
                                {category.description}
                            </p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default People;
