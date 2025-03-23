import React from "react";

export const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full table-fixed divide-y divide-iron/20">
                <thead className="bg-iron/10">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`px-4 py-3 text-left text-xs font-medium text-nevada uppercase tracking-wider ${
                                    column.width ? `w-${column.width}` : ""
                                } ${column.className || ""}`}
                            >
                                {column.label}
                            </th>
                        ))}
                        <th className="px-4 py-3 text-right text-xs font-medium text-nevada uppercase tracking-wider w-28">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-iron/20">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="px-4 py-4 text-center text-nevada"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr
                                key={item.id || item._id || index}
                                className="hover:bg-iron/5"
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${index}-${column.key}`}
                                        className={`px-4 py-4 text-sm text-nevada ${
                                            column.className || ""
                                        }`}
                                    >
                                        <div className="overflow-hidden overflow-ellipsis">
                                            {column.render
                                                ? column.render(item)
                                                : item[column.key]}
                                        </div>
                                    </td>
                                ))}
                                <td className="px-4 py-4 text-right text-sm font-medium whitespace-nowrap">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-casal hover:text-white mr-2 bg-casal/10 hover:bg-casal px-2 py-1 rounded text-sm transition-colors duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="text-red-600 hover:text-white bg-red-50 hover:bg-red-600 px-2 py-1 rounded text-sm transition-colors duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};
