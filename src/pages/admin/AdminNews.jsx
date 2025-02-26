// src/pages/admin/AdminNews.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminNews = () => {
    const initialFormData = {
        title: "",
        description: "",
        date: "",
        image: "",
        source: "",
        link: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "date", label: "Date" },
        { key: "source", label: "Source" },
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
        { id: "title", label: "News Title", required: true },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
        },
        { id: "date", label: "Date (YYYY-MM-DD)", required: true },
        {
            id: "source",
            label: "Source (Lab Announcement, Journal, etc.)",
            required: true,
        },
        { id: "link", label: "URL to Full Article" },
        { id: "image", label: "Featured Image", type: "file" },
    ];

    return (
        <AdminCollectionPage
            title="News Item"
            collection="news"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminNews;
