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
        <>
            {/* Make navbar solid white and add height */}
            <div className="fixed top-0 inset-x-0 bg-white z-50 h-20">
                {/* Status bar */}
                <div className="bg-gray-50 py-1 px-4">
                    <div className="container mx-auto flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-2">
                            <div
                                className={`h-2 w-2 rounded-full ${
                                    labStatus.isOpen
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            ></div>
                            <span className="text-gray-600">
                                Lab Status:{" "}
                                {labStatus.isOpen ? "Open" : "Closed"}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div
                                className={`h-2 w-2 rounded-full ${
                                    gpuStatus.isAvailable
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            ></div>
                            <span className="text-gray-600">
                                GPU Status:{" "}
                                {gpuStatus.isAvailable ? "Available" : "Busy"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main navbar content */}
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo and Lab Name */}
                        <Link
                            to="/"
                            className="flex items-center space-x-3 group"
                        >
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
                                <div className="font-semibold text-lg">
                                    HMA Lab
                                </div>
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
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
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
            </div>

            {/* Add a spacer div to prevent content overlap on mobile when menu is open */}
            {isMobileMenuOpen && <div className="h-screen md:hidden"></div>}
        </>
    );
};

export default Navbar;
