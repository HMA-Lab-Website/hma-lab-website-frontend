const Navbar = () => {
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Publications", path: "/publications" },
        { name: "Projects", path: "/projects" },
        { name: "People", path: "/people" },
        { name: "Resources", path: "/resources" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-firefly text-iron">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <img
                            src="/HMA-Lab-Logo.png"
                            alt="Lab Logo"
                            className="h-8 w-auto"
                        />
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.path}
                                        className="px-3 py-2 rounded-md text-sm font-medium hover:bg-san-juan"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* gpu status indicator */}
                    <div className="flex items-center">
                        <span className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm">GPU Available</span>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
