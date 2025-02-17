// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // GPU Status State
    const [gpuStatus, setGpuStatus] = useState({
        isAvailable: true,
        totalGPUs: 4,
        availableGPUs: 3,
    });

    const [expanded, setExpanded] = useState({});

    const toggleSubmenu = (itemName) => {
        setExpanded((prev) => ({ ...prev, [itemName]: !prev[itemName] }));
    };

    const location = useLocation();

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        {
            name: "Research",
            path: "/research",
            submenu: [
                { name: "Areas", path: "/research/areas" },
                { name: "Publications", path: "/publications" },
                { name: "Projects", path: "/projects" },
            ],
        },
        {
            name: "People",
            path: "/people",
            submenu: [
                { name: "Faculty", path: "/people/faculty" },
                { name: "Students", path: "/people/students" },
                { name: "Alumni", path: "/people/alumni" },
            ],
        },
        { name: "Resources", path: "/resources" },
        { name: "News", path: "/news" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-lg" : "bg-firefly"
            }`}
            style={{ isolation: "isolate" }}
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
                        <div className="text-iron">
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
                                            ? "text-firefly"
                                            : "text-nevada"
                                    }
                                    group-hover:text-firefly`}
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-casal"
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
                                                rounded-lg border border-iron/10"
                                    >
                                        {/* Update submenu text colors too */}
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

                        {/* GPU Status Indicator */}
                        <div
                            className="flex items-center bg-san-juan/20 px-4 py-2 
                                      backdrop-blur-sm"
                        >
                            <div
                                className={`h-2 w-2 rounded-full ${
                                    gpuStatus.isAvailable
                                        ? "bg-green-400 shadow-lg shadow-green-400/20"
                                        : "bg-red-400 shadow-lg shadow-red-400/20"
                                } mr-2 animate-pulse`}
                            ></div>
                            <span className="text-iron text-xs font-medium">
                                {gpuStatus.isAvailable
                                    ? `${gpuStatus.availableGPUs}/${gpuStatus.totalGPUs} GPUs Available`
                                    : "GPUs Busy"}
                            </span>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden text-iron hover:text-gray500 
                                transition-colors duration-200 p-2 rounded-lg 
                                hover:bg-san-juan/20"
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
                    <div className="px-4 pt-2 pb-3 bg-white shadow-md border-t border-iron/10">
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
                                        className="block px-3 py-4 text-lg text-iron hover:text-firefly transition-colors"
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
                                                className="h-4 w-4 text-iron"
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
                                                className="block px-3 py-2 text-base text-iron hover:text-firefly transition-colors"
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
