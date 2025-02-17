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

    const location = useLocation();

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // GPU Status Fetching
    /*have to uncomment and modify this section when API is ready
  useEffect(() => {
    const fetchGPUStatus = async () => {
      try {
        const response = await fetch('api/gpu-status');
        const data = await response.json();
        setGpuStatus({
          isAvailable: data.availableGPUs > 0,
          totalGPUs: data.totalGPUs,
          availableGPUs: data.availableGPUs
        });
      } catch (error) {
        console.error('Failed to fetch GPU status:', error);
        // Fallback to default status on error
        setGpuStatus({
          isAvailable: true,
          totalGPUs: 4,
          availableGPUs: 3
        });
      }
    };

    // Initial fetch
    fetchGPUStatus();


    return () => clearInterval(pollInterval);
  }, []);
  */

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

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                >
                    <div
                        className="px-2 pt-2 pb-3 space-y-1 bg-firefly/95 
                                backdrop-blur-md rounded-lg mt-2 border border-iron/10"
                    >
                        {navItems.map((item) => (
                            <div key={item.name}>
                                <Link
                                    to={item.path}
                                    className="block px-3 py-2 text-iron/90 
                                    relative
                                    hover:text-white 
                                    after:absolute after:bottom-0 after:left-3 after:right-3
                                    after:h-0.5 after:bg-casal after:transform after:scale-x-0 
                                    after:origin-left hover:after:scale-x-100 
                                    after:transition-transform after:duration-300
                                    rounded-md text-sm font-medium transition-all duration-200"
                                >
                                    {item.name}
                                </Link>
                                {item.submenu && (
                                    <div className="pl-4 space-y-1 border-l border-iron/10 ml-3">
                                        {item.submenu.map((subItem) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.path}
                                                className="block px-3 py-2 text-iron/80 
                                                       hover:text-gray500 hover:bg-san-juan/20 
                                                       rounded-md text-sm transition-colors duration-200"
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
            </div>
        </nav>
    );
};

export default Navbar;
