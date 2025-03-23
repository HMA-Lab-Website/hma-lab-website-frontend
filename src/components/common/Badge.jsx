import React from "react";

export const Badge = ({ children, type = "default" }) => {
    const types = {
        default: "bg-casal/10 text-casal",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        primary: "bg-firefly/10 text-firefly",
        secondary: "bg-nevada/20 text-nevada",
        outline: "bg-transparent border border-iron text-firefly",
    };

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${types[type]}`}
        >
            {children}
        </span>
    );
};
