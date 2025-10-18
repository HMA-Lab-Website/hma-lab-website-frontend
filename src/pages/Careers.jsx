// src/pages/Careers.jsx
import React from "react";
import { SectionHeader, Card, Button, Badge } from "../components/common";
import { Link } from "react-router-dom";

const Careers = () => {
    const jobOpenings = [
        {
            id: 1,
            title: "RA for Arts Research",
            description:
                "Multiple openings for talented people who are passionate about machine translation, language studies, and pushing the boundaries of linguistics in India. If you have expertise in NLP, machine learning, or a strong command of regional languages mentioned in this posting, apply.",
            date: "Jan 3, 2024",
            type: "Full-time",
        },
        {
            id: 2,
            title: "RA for Movement Translation",
            description:
                "We are excited to announce several openings for skilled researchers passionate about machine translation, language studies, and advancing linguistics in India. If you have expertise in NLP, machine learning, or linguistic proficiency in regional languages, we'd love to connect with you!",
            date: "October 30, 2024",
            type: "Full-time",
        },
        {
            id: 3,
            title: "PhD & MSR Positions",
            description:
                "Join our lab as a PhD student or Master's Research student. We're looking for dedicated individuals with interests in artificial intelligence, machine learning, NLP, or computer vision to contribute to our cutting-edge research projects.",
            date: "November 15, 2024",
            type: "Academic",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
            <SectionHeader
                title="Career Opportunities"
                subtitle="Join our team and help shape the future of AI research"
            />

            <div className="grid gap-8 mb-12">
                {jobOpenings.map((job) => (
                    <Card
                        key={job.id}
                        className="hover:shadow-xl transition-all duration-300 border border-iron/10 group"
                    >
                        <div className="p-6">
                            <div className="flex flex-wrap justify-between items-start mb-4">
                                <h3 className="text-2xl font-semibold text-firefly group-hover:text-casal transition-colors">
                                    {job.title}
                                </h3>
                                <div className="flex gap-3 items-center mt-1 md:mt-0">
                                    <Badge
                                        type={
                                            job.type === "Academic"
                                                ? "primary"
                                                : "default"
                                        }
                                    >
                                        {job.type}
                                    </Badge>
                                    <span className="text-sm text-nevada">
                                        Posted: {job.date}
                                    </span>
                                </div>
                            </div>
                            <p className="text-nevada mb-6 line-clamp-3">
                                {job.description}
                            </p>
                            <div className="flex justify-end">
                                <Link to="/contact">
                                    <Button
                                        variant="secondary"
                                        className="font-medium"
                                    >
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="bg-iron/5 p-8 rounded-lg border border-iron/10 text-center">
                <h3 className="text-xl font-semibold text-firefly mb-3">
                    Don't see a position that matches your skills?
                </h3>
                <p className="text-nevada mb-6 max-w-2xl mx-auto">
                    We're always interested in connecting with talented
                    researchers and students. Send us your CV and research
                    interests, and we'll keep you in mind for future
                    opportunities.
                </p>
                <Link to="/contact">
                    <Button variant="secondary" className="font-medium">
                        Contact Us
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Careers;
