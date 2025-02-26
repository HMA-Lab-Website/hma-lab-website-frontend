import React from "react";

export const ResearchArea = ({ title, description, icon }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-iron/10">
            {icon && <div className="text-casal text-3xl mb-4">{icon}</div>}
            <h3 className="text-xl font-semibold text-firefly mb-2">{title}</h3>
            <p className="text-nevada">{description}</p>
        </div>
    );
};
