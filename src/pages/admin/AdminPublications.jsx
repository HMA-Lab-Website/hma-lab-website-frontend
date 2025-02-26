// src/pages/admin/AdminPublications.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminPublications = () => {
    const initialFormData = {
        title: "",
        authors: "",
        year: "",
        journal: "",
        link: "",
        image: "",
        abstract: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "authors", label: "Authors" },
        { key: "year", label: "Year" },
        { key: "journal", label: "Journal/Conference" },
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
        { id: "authors", label: "Authors", required: true },
        { id: "year", label: "Year", required: true },
        { id: "journal", label: "Journal/Conference", required: true },
        { id: "link", label: "PDF/Journal Link" },
        { id: "image", label: "Cover Image", type: "file" },
        { id: "abstract", label: "Abstract", textarea: true, rows: 5 },
    ];

    return (
        <AdminCollectionPage
            title="Publication"
            collection="publications"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminPublications;
