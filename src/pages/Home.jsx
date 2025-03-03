import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { dummyData } from "../utils/dummyData";
import { Card, Badge, Button, SectionHeader } from "../components/common";
import { api } from "../utils/api";
import { motion } from "framer-motion";

const Home = () => {
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);

    // For animated counter
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await api.getItems("news");
                setNews(data.length > 0 ? data : dummyData.news);
                setLoadingNews(false);
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoadingNews(false);
                // Use dummy data as fallback
                setNews(dummyData.news);
            }
        };

        fetchNews();

        // Intersection observer for stats section animation
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Animated counter component
    const AnimatedCounter = ({ end, duration = 2 }) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!statsVisible) return;

            let startTime;
            let animationFrame;

            const updateCount = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min(
                    (timestamp - startTime) / (duration * 1000),
                    1
                );
                setCount(Math.floor(progress * end));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(updateCount);
                }
            };

            animationFrame = requestAnimationFrame(updateCount);

            return () => cancelAnimationFrame(animationFrame);
        }, [end, duration, statsVisible]);

        return <span>{count}</span>;
    };

    // SVG Network component for the hero section
    const NetworkAnimation = () => (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
                className="w-full h-full opacity-20"
                viewBox="0 0 800 600"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Generate nodes and connections */}
                {Array(20)
                    .fill()
                    .map((_, i) => (
                        <motion.circle
                            key={`node-${i}`}
                            cx={100 + Math.random() * 600}
                            cy={100 + Math.random() * 400}
                            r={2 + Math.random() * 4}
                            fill="#ffffff"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                            transition={{
                                duration: 3 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                {Array(15)
                    .fill()
                    .map((_, i) => (
                        <motion.line
                            key={`line-${i}`}
                            x1={100 + Math.random() * 600}
                            y1={100 + Math.random() * 400}
                            x2={100 + Math.random() * 600}
                            y2={100 + Math.random() * 400}
                            stroke="#ffffff"
                            strokeWidth={0.5}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1],
                                opacity: [0, 0.5, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
            </svg>
        </div>
    );

    // Connected topics visualization
    const researchTopics = [
        { id: "ml", name: "Machine Learning", x: "20%", y: "30%" },
        { id: "cv", name: "Computer Vision", x: "50%", y: "20%" },
        { id: "nlp", name: "Natural Language Processing", x: "80%", y: "30%" },
        { id: "ai", name: "Artificial Intelligence", x: "35%", y: "70%" },
        { id: "ml-ops", name: "ML Operations", x: "65%", y: "70%" },
    ];

    // Define connections between topics
    const connections = [
        { from: "ml", to: "cv" },
        { from: "ml", to: "nlp" },
        { from: "ml", to: "ai" },
        { from: "ai", to: "cv" },
        { from: "ai", to: "nlp" },
        { from: "ml-ops", to: "ml" },
    ];

    return (
        <div className="space-y-16">
            {/* Hero section with animated network background */}
            <section className="relative bg-gradient-to-br from-gray-300 to-gray-700 py-24 px-4 w-full min-h-[90vh] flex items-center overflow-hidden">
                <NetworkAnimation />
                <div className="max-w-7xl mx-auto z-10 relative">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl font-bold mb-6 text-iron leading-tight">
                                Human Machine{" "}
                                <span className="text-gray-700">
                                    Analysis Lab
                                </span>
                            </h1>
                            <p className="text-iron/90 text-xl max-w-2xl leading-relaxed mb-8">
                                Pioneering the future of AI and Machine Learning
                                through groundbreaking research and innovative
                                solutions that bridge the gap between human
                                intelligence and machine capabilities.
                            </p>
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    className="font-semibold"
                                >
                                    <Link to="/projects">Explore Projects</Link>
                                </Button>
                                <Button
                                    variant="outline1"
                                    className="font-semibold"
                                >
                                    <Link to="/contact">Join Our Team</Link>
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            className="md:w-1/2 mt-12 md:mt-0 md:pl-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <img
                                src="https://images.stockcake.com/public/c/b/6/cb6c2bd9-7d40-49d0-9e35-ec51818e2e30_medium/futuristic-laboratory-analysis-stockcake.jpg"
                                alt="Lab Research"
                                className="rounded-lg shadow-2xl w-full h-[400px] object-cover object-center ring-4 ring-white/10"
                            />
                            <div className="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                                <p className="text-iron text-sm">
                                    Our lab focuses on developing innovative AI
                                    solutions that enhance human-machine
                                    interaction and analysis capabilities.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats section with animated counters */}
            <div className="px-4" ref={statsRef}>
                <section className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {dummyData.stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial="hidden"
                                animate={statsVisible ? "visible" : "hidden"}
                                variants={fadeInUp}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                            >
                                <Card className="text-center transform hover:-translate-y-2 transition-all duration-300 border border-iron/10 shadow-lg">
                                    <div className="text-5xl font-bold text-san-juan mb-2">
                                        {statsVisible ? (
                                            <AnimatedCounter
                                                end={parseInt(stat.number)}
                                            />
                                        ) : (
                                            0
                                        )}
                                        {stat.number.toString().includes("+") &&
                                            "+"}
                                    </div>
                                    <div className="text-nevada font-medium">
                                        {stat.label}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Research Vision with Visualization */}
            <section className="w-full bg-iron/5 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="Our Research Vision"
                        subtitle="Connecting various domains of AI research to solve complex problems"
                    />

                    <div className="mt-12">
                        <div className="relative h-[500px] bg-white rounded-xl shadow-xl overflow-hidden">
                            {/* Topics Nodes */}
                            {researchTopics.map((topic, index) => (
                                <motion.div
                                    key={topic.id}
                                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: topic.x, top: topic.y }}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                        delay: 0.5 + index * 0.2,
                                    }}
                                >
                                    <div className="bg-firefly text-black px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                                        {topic.name}
                                    </div>
                                </motion.div>
                            ))}

                            {/* SVG Connections */}
                            <svg className="absolute inset-0 w-full h-full">
                                {connections.map((connection, index) => {
                                    const fromTopic = researchTopics.find(
                                        (t) => t.id === connection.from
                                    );
                                    const toTopic = researchTopics.find(
                                        (t) => t.id === connection.to
                                    );

                                    // Convert percentage to actual coordinates
                                    const fromX =
                                        (parseFloat(fromTopic.x) / 100) * 100;
                                    const fromY =
                                        (parseFloat(fromTopic.y) / 100) * 100;
                                    const toX =
                                        (parseFloat(toTopic.x) / 100) * 100;
                                    const toY =
                                        (parseFloat(toTopic.y) / 100) * 100;

                                    return (
                                        <motion.path
                                            key={`${connection.from}-${connection.to}`}
                                            d={`M ${fromX}% ${fromY}% L ${toX}% ${toY}%`}
                                            stroke="#64748b"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="6,6"
                                            initial={{
                                                pathLength: 0,
                                                opacity: 0,
                                            }}
                                            animate={{
                                                pathLength: 1,
                                                opacity: 0.6,
                                            }}
                                            transition={{
                                                delay: 1 + index * 0.2,
                                                duration: 1.5,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    );
                                })}
                            </svg>
                        </div>

                        <div className="mt-8 text-center">
                            <Link to="/research">
                                <Button
                                    variant="outline"
                                    className="font-semibold"
                                >
                                    Explore Our Research
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Areas Section */}
            <section className="w-full py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <SectionHeader
                        title="Research Areas"
                        subtitle="Exploring the frontiers of artificial intelligence and machine learning"
                    />
                    <div className="grid md:grid-cols-3 gap-8">
                        {dummyData.researchAreas.map((area, index) => (
                            <motion.div
                                key={area.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.2,
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-300 h-full">
                                    <div className="relative">
                                        <img
                                            src={area.image}
                                            alt={area.title}
                                            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-firefly/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <h4 className="text-lg font-semibold">
                                                {area.title}
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-firefly mb-3">
                                            {area.title}
                                        </h3>
                                        <p className="text-nevada leading-relaxed">
                                            {area.description}
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* News section - contained */}
            <div className="px-4 pb-16">
                <section className="max-w-7xl mx-auto">
                    <SectionHeader
                        title="Latest Updates"
                        subtitle="Stay informed about our recent achievements, events, and announcements"
                    />
                    <div className="grid md:grid-cols-2 gap-8">
                        {news.slice(0, 4).map((item, index) => (
                            <motion.div
                                key={item.id || item._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <Card className="group hover:shadow-xl transition-all duration-200 border border-iron/10 h-full flex flex-col">
                                    <div className="flex flex-col justify-between flex-grow">
                                        <div>
                                            <div className="flex items-center space-x-2 mb-3">
                                                <span className="text-sm text-casal font-medium">
                                                    {item.date}
                                                </span>
                                                <Badge>{item.source}</Badge>
                                            </div>
                                            <h4 className="text-xl font-semibold text-firefly mb-2 group-hover:text-casal transition-colors duration-200">
                                                {item.title}
                                            </h4>
                                            {item.speaker && (
                                                <p className="text-nevada font-medium mb-2">
                                                    Speaker: {item.speaker}
                                                </p>
                                            )}
                                            <p className="text-nevada leading-relaxed">
                                                {item.description?.substring(
                                                    0,
                                                    150
                                                )}
                                                {item.description?.length > 150
                                                    ? "..."
                                                    : ""}
                                            </p>
                                        </div>
                                        {item.link && (
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-3 inline-block text-casal hover:text-gothic group-hover:translate-x-1 transition-all"
                                            >
                                                Read more →
                                            </a>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/news">
                            <Button variant="outline" className="font-semibold">
                                View All News
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>

            {/* Join Us CTA */}
            <section className="relative bg-gradient-to-tr from-firefly to-san-juan py-16 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Join Our Research Team
                    </h2>
                    <p className="text-iron/90 text-lg max-w-2xl mb-8">
                        We're always looking for talented researchers, students,
                        and collaborators to join our team and help push the
                        boundaries of AI and machine learning.
                    </p>
                    <Link to="/contact">
                        <Button variant="outline" className="font-semibold">
                            Contact Us
                        </Button>
                    </Link>
                </div>

                {/* Animated floating dots background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array(20)
                        .fill()
                        .map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full bg-white/20"
                                style={{
                                    width: Math.random() * 12 + 4,
                                    height: Math.random() * 12 + 4,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, Math.random() * -40 - 10, 0],
                                    opacity: [0.2, 0.5, 0.2],
                                }}
                                transition={{
                                    duration: Math.random() * 4 + 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
