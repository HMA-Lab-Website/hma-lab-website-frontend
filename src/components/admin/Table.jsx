import React from "react";

export const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-iron/20">
                <thead className="bg-iron/10">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-xs font-medium text-nevada uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        <th className="px-6 py-3 text-right text-xs font-medium text-nevada uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-iron/20">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + 1}
                                className="px-6 py-4 whitespace-nowrap text-center text-nevada"
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
                                        className="px-6 py-4 whitespace-nowrap text-sm text-nevada"
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : item[column.key]}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="text-casal hover:text-gothic mr-4 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(item)}
                                        className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded"
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
