import React from "react";

export const Button = ({
    children,
    type = "button",
    variant = "primary",
    className = "",
    onClick,
    disabled = false,
}) => {
    const variants = {
        primary: "bg-firefly text-black hover:bg-san-juan",
        secondary: "bg-gray-300 text-black hover:bg-gothic",
        outline:
            "bg-white text-firefly border border-firefly hover:bg-firefly/5",
        outline1:
            "bg-transparent text-iron border border-iron hover:bg-white/10",
        danger: "bg-red-600 text-black hover:bg-red-700",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-2 rounded-md transition-colors duration-200 font-medium ${
                variants[variant]
            } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            {children}
        </button>
    );
};
