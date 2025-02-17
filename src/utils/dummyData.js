// src/utils/dummyData.js
export const dummyData = {
    stats: [
        { id: 1, number: "25+", label: "Published Papers" },
        { id: 2, number: "12", label: "Active Projects" },
        { id: 3, number: "8", label: "Research Areas" },
    ],
    researchAreas: [
        {
            id: 1,
            title: "Deep Learning & Neural Networks",
            description:
                "Advancing state-of-the-art neural architectures for complex problem solving and pattern recognition in various domains.",
            image: "/api/placeholder/600/400",
        },
        {
            id: 2,
            title: "Natural Language Processing",
            description:
                "Developing cutting-edge language models and algorithms for text understanding and generation.",
            image: "/api/placeholder/600/400",
        },
        {
            id: 3,
            title: "Computer Vision",
            description:
                "Exploring innovative approaches to visual perception, object detection, and scene understanding.",
            image: "/api/placeholder/600/400",
        },
    ],
    news: [
        {
            id: 1,
            date: "March 15, 2025",
            title: "New Research Grant Awarded",
            description:
                "Our lab has been awarded a major grant for research in quantum machine learning applications.",
            type: "Announcement",
        },
        {
            id: 2,
            date: "March 10, 2025",
            title: "Guest Lecture: Advanced Deep Learning",
            speaker: "Dr. Sarah Chen",
            description:
                "Join us for an insightful lecture on recent advances in deep learning architectures.",
            type: "Event",
        },
        {
            id: 3,
            date: "March 5, 2025",
            title: "Paper Accepted at ICML 2025",
            description:
                "Our work on 'Neural Network Compression Using Dynamic Pruning' has been accepted at ICML 2025.",
            type: "Publication",
        },
        {
            id: 4,
            date: "March 1, 2025",
            title: "New GPU Cluster Installation",
            description:
                "We've expanded our computing capabilities with a new state-of-the-art GPU cluster.",
            type: "Update",
        },
    ],
};
