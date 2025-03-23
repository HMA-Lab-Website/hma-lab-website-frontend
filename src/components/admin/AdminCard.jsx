import React from "react";

export const AdminCard = ({ title, children, className = "" }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
            {title && (
                <h2 className="text-xl font-semibold text-firefly mb-4">
                    {title}
                </h2>
            )}
            {children}
        </div>
    );
};
