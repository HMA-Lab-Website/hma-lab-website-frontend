import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar className="z-50 " />
            {/* Add pt-24 to push content below navbar */}
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
