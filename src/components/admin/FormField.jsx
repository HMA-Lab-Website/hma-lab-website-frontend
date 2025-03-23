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
    maxLength,
}) => {
    // Calculate current character count and percentage for visual indicator
    const charCount = value ? value.length : 0;
    const charPercentage = maxLength
        ? Math.min((charCount / maxLength) * 100, 100)
        : 0;
    const isApproachingLimit = charPercentage > 80;
    const isAtLimit = charPercentage >= 100;

    // Common props for both input and textarea
    const commonProps = {
        id,
        name: id,
        value: value || "",
        onChange,
        placeholder,
        required,
        maxLength,
        className: `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50 
                  ${error ? "border-red-300" : "border-gray-300"}
                  ${
                      isAtLimit
                          ? "border-red-300"
                          : isApproachingLimit
                          ? "border-yellow-300"
                          : ""
                  }`,
    };

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
                    <textarea {...commonProps} rows={rows} />
                    {maxLength && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                            <div className="flex-1 mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${
                                            isAtLimit
                                                ? "bg-red-500"
                                                : isApproachingLimit
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                        style={{ width: `${charPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div
                                className={`${
                                    isAtLimit
                                        ? "text-red-500 font-medium"
                                        : isApproachingLimit
                                        ? "text-yellow-600"
                                        : "text-gray-500"
                                }`}
                            >
                                {charCount}/{maxLength}
                            </div>
                        </div>
                    )}
                </div>
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
                <div className="relative">
                    <input type={type} {...commonProps} />
                    {maxLength && (
                        <div className="mt-1 flex items-center justify-between text-xs">
                            <div className="flex-1 mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full ${
                                            isAtLimit
                                                ? "bg-red-500"
                                                : isApproachingLimit
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                        }`}
                                        style={{ width: `${charPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div
                                className={`${
                                    isAtLimit
                                        ? "text-red-500 font-medium"
                                        : isApproachingLimit
                                        ? "text-yellow-600"
                                        : "text-gray-500"
                                }`}
                            >
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
