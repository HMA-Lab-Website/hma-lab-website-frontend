import React from "react";

export const FormField = ({
    id,
    label,
    type = "text",
    value = "",
    onChange,
    placeholder = "",
    required = false,
    textarea = false,
    rows = 3,
    error = "",
    maxLength,
}) => {
    // Calculate current character count and percentage
    const charCount = value?.length || 0;
    const showCounter =
        maxLength && (type === "text" || textarea || type === "email");
    const percentage = maxLength
        ? Math.min((charCount / maxLength) * 100, 100)
        : 0;

    // Determine counter color based on percentage
    let counterColor = "text-gray-500";
    let progressColor = "bg-green-500";

    if (percentage >= 90) {
        counterColor = "text-red-500 font-medium";
        progressColor = "bg-red-500";
    } else if (percentage >= 75) {
        counterColor = "text-yellow-600";
        progressColor = "bg-yellow-500";
    }

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {textarea ? (
                <div className="relative">
                    <textarea
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        maxLength={maxLength}
                        required={required}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50 
                                  ${
                                      error
                                          ? "border-red-300"
                                          : "border-gray-300"
                                  }
                                  ${percentage >= 90 ? "border-red-300" : ""}`}
                    />
                    {showCounter && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                            <div className="w-full mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${progressColor} transition-all duration-300`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className={`ml-2 ${counterColor}`}>
                                {charCount}/{maxLength}
                            </div>
                        </div>
                    )}
                </div>
            ) : type === "file" ? (
                <input
                    type="file"
                    id={id}
                    name={id}
                    onChange={onChange}
                    required={required}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-casal focus:border-casal"
                />
            ) : (
                <div className="relative">
                    <input
                        type={type}
                        id={id}
                        name={id}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        required={required}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50
                                  ${
                                      error
                                          ? "border-red-300"
                                          : "border-gray-300"
                                  }
                                  ${percentage >= 90 ? "border-red-300" : ""}`}
                    />
                    {showCounter && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                            <div className="w-full mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${progressColor} transition-all duration-300`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                            <div className={`ml-2 ${counterColor}`}>
                                {charCount}/{maxLength}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};
