// src/pages/admin/AdminAlumni.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminAlumni = () => {
    const initialFormData = {
        name: "",
        batch: "",
        contributions: "",
        current_position: "",
        image: "",
        linkedin: "",
        current_location: "",
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "batch", label: "Batch" },
        { key: "current_position", label: "Current Position" },
        {
            key: "image",
            label: "Image",
            render: (item) =>
                item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-full"
                    />
                ) : (
                    "No image"
                ),
        },
    ];

    const formFields = [
        { id: "name", label: "Full Name", required: true },
        { id: "batch", label: "Graduation Batch", required: true },
        {
            id: "contributions",
            label: "Key Contributions to the Lab",
            textarea: true,
            rows: 3,
            required: true,
        },
        {
            id: "current_position",
            label: "Current Job Title and Company",
            required: true,
        },
        { id: "image", label: "Profile Picture", type: "file" },
        { id: "linkedin", label: "LinkedIn Profile" },
        { id: "current_location", label: "Google Maps Embed Link" },
    ];

    return (
        <AdminCollectionPage
            title="Alumni"
            collection="alumni"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminAlumni;
