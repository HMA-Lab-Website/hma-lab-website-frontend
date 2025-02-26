// src/pages/admin/AdminProjects.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminProjects = () => {
    const initialFormData = {
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "Ongoing",
        team_members: "",
        github_link: "",
        image: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "start_date", label: "Start Date" },
        {
            key: "image",
            label: "Image",
            render: (item) =>
                item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                    />
                ) : (
                    "No image"
                ),
        },
    ];

    const formFields = [
        { id: "title", label: "Title", required: true },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
        },
        { id: "start_date", label: "Start Date (YYYY-MM-DD)", required: true },
        {
            id: "end_date",
            label: "End Date (YYYY-MM-DD for completed projects)",
        },
        {
            id: "status",
            label: "Status",
            type: "select",
            options: ["Ongoing", "Completed"],
            required: true,
        },
        { id: "team_members", label: "Team Members (comma separated)" },
        { id: "github_link", label: "GitHub/Project Link" },
        { id: "image", label: "Project Image", type: "file" },
    ];

    // Custom renderer to handle the select input
    const renderField = (field, formData, handleInputChange) => {
        if (field.type === "select") {
            return (
                <div key={field.id} className="mb-4">
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-nevada mb-1"
                    >
                        {field.label}{" "}
                        {field.required && (
                            <span className="text-red-500">*</span>
                        )}
                    </label>
                    <select
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-iron rounded-md focus:outline-none focus:ring-2 focus:ring-casal/50"
                        required={field.required}
                    >
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        return (
            <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type || "text"}
                value={formData[field.id] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder || ""}
                required={field.required}
                textarea={field.textarea}
                rows={field.rows}
                error=""
            />
        );
    };

    return (
        <AdminCollectionPage
            title="Project"
            collection="projects"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            renderField={renderField}
        />
    );
};

export default AdminProjects;
