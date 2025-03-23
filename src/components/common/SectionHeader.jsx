import React from "react";

export const SectionHeader = ({ title, subtitle }) => {
    return (
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-firefly mb-3">{title}</h2>
            {subtitle && (
                <p className="text-lg text-nevada mx-auto max-w-3xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
};
