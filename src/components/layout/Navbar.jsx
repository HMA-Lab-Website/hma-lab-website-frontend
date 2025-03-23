// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../utils/api";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // GPU Status State - simplified
    const [gpuStatus, setGpuStatus] = useState({
        isAvailable: true,
    });

    // Lab status state
    const [labStatus, setLabStatus] = useState({
        isOpen: true,
    });

    const [expanded, setExpanded] = useState({});

    const toggleSubmenu = (itemName) => {
        setExpanded((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
    };

    const location = useLocation();

    // Fetch statuses on component mount
    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                // Fetch GPU status
                const data = await api.getItems("indication");
                if (data && data.length > 0) {
                    const gpuItem = data.find((item) => "gpu" in item);
                    if (gpuItem) {
                        setGpuStatus({
                            isAvailable: Boolean(gpuItem.gpu),
                        });
                    }
                }

                // Fetch lab status
                const labResponse = await fetch(
                    "https://backend-website-api.vercel.app/update_lab",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({}),
                    }
                );
                if (labResponse.ok) {
                    const labData = await labResponse.json();
                    if (labData && typeof labData.isOpen !== "undefined") {
                        setLabStatus(labData);
                    }
                }
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };

        fetchStatuses();

        // Refresh status every 5 minutes
        const interval = setInterval(fetchStatuses, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Set initial scroll state and add scroll effect
    useEffect(() => {
        // Check initial scroll position
        setIsScrolled(window.scrollY > 10);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Research",
            path: "/research",
            submenu: [
                { name: "Publications", path: "/publications" },
                { name: "Projects", path: "/projects" },
                { name: "Datasets", path: "/datasets" },
            ],
        },
        {
            name: "Careers",
            path: "/careers",
        },
        {
            name: "People",
            path: "/people",
            submenu: [
                { name: "Current", path: "/people/current" },
                { name: "Alumni", path: "/people/alumni" },
            ],
        },
        { name: "Resources", path: "/resources" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-lg" : "bg-white bg-opacity-95"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo and Lab Name */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img
                            src="/HMA-Lab-Logo.png"
                            alt="Lab Logo"
                            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div
                            className={`${
                                isScrolled ? "text-black" : "text-black"
                            }`}
                        >
                            <div className="font-semibold text-lg">HMA Lab</div>
                            <div className="text-xs opacity-80">
                                Indian Institute of Information Technology
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <Link
                                    to={item.path}
                                    className={`px-3 py-2 text-sm font-medium 
                                    transition-all duration-200 relative
                                    ${
                                        location.pathname === item.path
                                            ? isScrolled
                                                ? "text-firefly"
                                                : "text-black font-bold"
                                            : isScrolled
                                            ? "text-nevada"
                                            : "text-iron"
                                    }
                                    ${
                                        isScrolled
                                            ? "group-hover:text-firefly"
                                            : "group-hover:text-black"
                                    }`}
                                >
                                    {item.name}
                                    <motion.div
                                        className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                                            isScrolled
                                                ? "bg-gray-300"
                                                : "bg-white"
                                        }`}
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                        style={{ originX: 0 }}
                                    />
                                </Link>
                                {item.submenu && (
                                    <div
                                        className="absolute left-0 mt-1 w-48 opacity-0 invisible 
                                                group-hover:opacity-100 group-hover:visible 
                                                transition-all duration-200 transform translate-y-2 
                                                group-hover:translate-y-0 bg-white shadow-xl
                                                rounded-lg border border-iron/10 z-50"
                                    >
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                className="block px-4 py-2 text-sm text-nevada
                                                       hover:text-firefly hover:bg-iron/10
                                                       transition-colors duration-200"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Status Indicators */}
                        <div className="flex flex-col space-y-0">
                            {/* Lab Status */}
                            <div className="flex items-center bg-san-juan/30 px-3 py-1 backdrop-blur-sm rounded-md w-full">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        labStatus.isOpen
                                            ? "bg-green-400 shadow-lg shadow-green-400/20"
                                            : "bg-red-400 shadow-lg shadow-red-400/20"
                                    } mr-2 animate-pulse`}
                                ></div>
                                <span className="text-black text-xs font-medium">
                                    {labStatus.isOpen
                                        ? "Lab Open"
                                        : "Lab Closed"}
                                </span>
                            </div>

                            {/* GPU Status */}
                            <div className="flex items-center bg-san-juan/30 px-3 py-1 backdrop-blur-sm rounded-md w-full">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        gpuStatus.isAvailable
                                            ? "bg-green-400 shadow-lg shadow-green-400/20"
                                            : "bg-red-400 shadow-lg shadow-red-400/20"
                                    } mr-2 animate-pulse`}
                                ></div>
                                <span className="text-black text-xs font-medium">
                                    {gpuStatus.isAvailable
                                        ? "GPUs Available"
                                        : "GPUs Busy"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`lg:hidden ${
                            isScrolled ? "text-firefly" : "text-black"
                        } 
                                transition-colors duration-200 p-2 rounded-lg 
                                hover:bg-san-juan/20`}
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    isMobileMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden">
                    <div className="px-4 pt-2 pb-3 bg-white shadow-lg border-t border-iron/10">
                        {/* Status indicators for mobile */}
                        <div className="flex justify-between my-2 pb-2 border-b border-iron/10">
                            <div className="flex items-center">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        labStatus.isOpen
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                    } mr-2 animate-pulse`}
                                ></div>
                                <span className="text-sm text-nevada">
                                    {labStatus.isOpen
                                        ? "Lab Open"
                                        : "Lab Closed"}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div
                                    className={`h-2 w-2 rounded-full ${
                                        gpuStatus.isAvailable
                                            ? "bg-green-400"
                                            : "bg-red-400"
                                    } mr-2 animate-pulse`}
                                ></div>
                                <span className="text-sm text-nevada">
                                    {gpuStatus.isAvailable
                                        ? "GPUs Available"
                                        : "GPUs Busy"}
                                </span>
                            </div>
                        </div>

                        {navItems.map((item) => (
                            <div
                                key={item.name}
                                className="border-b border-iron/10"
                            >
                                <div className="flex justify-between items-center">
                                    <Link
                                        to={item.path}
                                        onClick={() => {
                                            // if no submenu, close the menu
                                            if (!item.submenu)
                                                setIsMobileMenuOpen(false);
                                        }}
                                        className="block px-3 py-4 text-lg text-nevada hover:text-firefly transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                    {item.submenu && (
                                        <button
                                            onClick={() =>
                                                toggleSubmenu(item.name)
                                            }
                                            className="p-3 focus:outline-none"
                                        >
                                            <motion.svg
                                                className="h-4 w-4 text-nevada"
                                                initial={{ rotate: 0 }}
                                                animate={{
                                                    rotate: expanded[item.name]
                                                        ? 180
                                                        : 0,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    ease: "easeInOut",
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </motion.svg>
                                        </button>
                                    )}
                                </div>
                                {item.submenu && expanded[item.name] && (
                                    <div className="pl-6">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                                className="block px-3 py-2 text-base text-nevada hover:text-firefly transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
