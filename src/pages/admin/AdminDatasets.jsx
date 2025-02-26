// src/pages/admin/AdminDatasets.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";
import { FormField } from "../../components/admin";

const AdminDatasets = () => {
    const initialFormData = {
        name: "",
        description: "",
        link: "",
        size: "",
        format: "",
        image: "",
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "size", label: "Size" },
        { key: "format", label: "Format" },
        {
            key: "link",
            label: "Link",
            render: (item) =>
                item.link ? (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-casal hover:text-gothic"
                    >
                        View
                    </a>
                ) : (
                    "No link"
                ),
        },
    ];

    const formFields = [
        { id: "name", label: "Dataset Name", required: true },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
        },
        { id: "link", label: "Dataset Link", required: true },
        { id: "size", label: "Size (e.g., 2GB)", required: true },
        {
            id: "format",
            label: "Format (comma separated, e.g., CSV, JSON)",
            required: true,
        },
        { id: "image", label: "Representative Image", type: "file" },
    ];

    return (
        <AdminCollectionPage
            title="Dataset"
            collection="datasets"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminDatasets;
