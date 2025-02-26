import React from "react";

export const FormField = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    textarea = false,
    rows = 3,
    error = "",
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {textarea ? (
                <textarea
                    id={id}
                    name={id}
                    rows={rows}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50 
                              ${error ? "border-red-300" : "border-gray-300"}`}
                    required={required}
                />
            ) : type === "file" ? (
                <div className="mt-1 flex items-center">
                    <input
                        type="file"
                        id={id}
                        name={id}
                        onChange={onChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-casal focus:border-casal"
                        accept="image/*"
                    />
                </div>
            ) : (
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50 
                              ${error ? "border-red-300" : "border-gray-300"}`}
                    required={required}
                />
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};
