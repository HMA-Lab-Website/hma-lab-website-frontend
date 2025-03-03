import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = ({ children }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        // Check if authenticated, otherwise redirect to login
        if (!isAuthenticated) {
            navigate("/admin/login", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", path: "/admin", icon: "ri-dashboard-line" },
        {
            name: "Publications",
            path: "/admin/publications",
            icon: "ri-book-open-line",
        },
        { name: "Projects", path: "/admin/projects", icon: "ri-folder-line" },
        {
            name: "Datasets",
            path: "/admin/datasets",
            icon: "ri-database-2-line",
        },
        {
            name: "Resources",
            path: "/admin/resources",
            icon: "ri-file-list-line",
        },
        {
            name: "People",
            path: "#",
            icon: "ri-team-line",
            submenu: [
                { name: "Faculty", path: "/admin/faculty" },
                { name: "PhD Scholars", path: "/admin/phd-scholars" },
                { name: "Honors Students", path: "/admin/honors-students" },
                { name: "Students", path: "/admin/students" },
                { name: "Alumni", path: "/admin/alumni" },
            ],
        },
        { name: "News", path: "/admin/news", icon: "ri-newspaper-line" },
        { name: "Settings", path: "/admin/settings", icon: "ri-settings-line" },
    ];

    const [expandedMenu, setExpandedMenu] = useState(null);

    const toggleSubmenu = (name) => {
        setExpandedMenu(expandedMenu === name ? null : name);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className={`bg-white border-r border-iron/20 text-firefly transition-all duration-300 ${
                    isSidebarOpen ? "w-64" : "w-20"
                }`}
            >
                <div className="p-4 flex justify-between items-center">
                    <div
                        className={`font-semibold text-xl ${
                            !isSidebarOpen && "hidden"
                        }`}
                    >
                        Admin Panel
                    </div>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-md hover:bg-san-juan/20"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isSidebarOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
                <nav className="mt-5">
                    <ul className="space-y-2 px-3">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                {item.submenu ? (
                                    <div>
                                        <button
                                            onClick={() =>
                                                toggleSubmenu(item.name)
                                            }
                                            className={`flex items-center w-full p-3 rounded-md transition-colors duration-200 
                                                    ${
                                                        expandedMenu ===
                                                        item.name
                                                            ? "bg-gray-300/10 text-casal font-medium"
                                                            : "text-nevada hover:bg-iron/10 hover:text-firefly"
                                                    }`}
                                        >
                                            <i
                                                className={`${item.icon} ${
                                                    !isSidebarOpen
                                                        ? "text-xl"
                                                        : "mr-3"
                                                }`}
                                            ></i>
                                            {isSidebarOpen && (
                                                <>
                                                    <span className="flex-grow">
                                                        {item.name}
                                                    </span>
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${
                                                            expandedMenu ===
                                                            item.name
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </button>
                                        {expandedMenu === item.name &&
                                            isSidebarOpen && (
                                                <ul className="pl-6 mt-1 space-y-1">
                                                    {item.submenu.map(
                                                        (subItem) => (
                                                            <li
                                                                key={
                                                                    subItem.name
                                                                }
                                                            >
                                                                <Link
                                                                    to={
                                                                        subItem.path
                                                                    }
                                                                    className={`block p-2 rounded-md transition-colors duration-200 
                                                                    ${
                                                                        location.pathname ===
                                                                        subItem.path
                                                                            ? "bg-san-juan/40 text-black"
                                                                            : "hover:bg-san-juan/20 text-iron/80"
                                                                    }`}
                                                                >
                                                                    {
                                                                        subItem.name
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-3 rounded-md transition-colors duration-200
                                                ${
                                                    location.pathname ===
                                                    item.path
                                                        ? "bg-san-juan text-gray-900"
                                                        : "hover:bg-san-juan/20 text-iron/80"
                                                }`}
                                    >
                                        <i
                                            className={`${item.icon} ${
                                                isSidebarOpen
                                                    ? "mr-3"
                                                    : "mx-auto"
                                            }`}
                                        ></i>
                                        {isSidebarOpen && (
                                            <span>{item.name}</span>
                                        )}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="absolute bottom-0 p-4">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center p-3 rounded-md hover:bg-red-50 transition-colors 
               duration-200 w-full text-red-600
               ${!isSidebarOpen ? "justify-center" : ""}`}
                    >
                        <i className="ri-logout-box-line mr-2"></i>
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
                <header className="bg-white shadow-sm p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-firefly">
                            {navItems.find(
                                (item) =>
                                    item.path === location.pathname ||
                                    (item.submenu &&
                                        item.submenu.some(
                                            (sub) =>
                                                sub.path === location.pathname
                                        ))
                            )?.name ||
                                navItems
                                    .find(
                                        (item) =>
                                            item.submenu &&
                                            item.submenu.find(
                                                (sub) =>
                                                    sub.path ===
                                                    location.pathname
                                            )
                                    )
                                    ?.submenu.find(
                                        (sub) => sub.path === location.pathname
                                    )?.name ||
                                "Dashboard"}
                        </h1>
                        <div className="text-right">
                            <p className="text-sm text-nevada">HMA Lab Admin</p>
                            <button
                                onClick={handleLogout}
                                className="text-xs text-casal hover:text-gothic"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
                </header>
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
