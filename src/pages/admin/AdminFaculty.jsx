// src/pages/admin/AdminFaculty.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminFaculty = () => {
    const initialFormData = {
        name: "",
        role: "",
        email: "",
        image: "",
        bio: "",
        linkedin: "",
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
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
        { id: "role", label: "Role", required: true },
        { id: "email", label: "Email Address", required: true, type: "email" },
        {
            id: "bio",
            label: "Biography",
            textarea: true,
            rows: 5,
            required: true,
        },
        { id: "linkedin", label: "LinkedIn Profile URL" },
        { id: "image", label: "Profile Picture", type: "file" },
    ];

    return (
        <AdminCollectionPage
            title="Faculty"
            collection="faculty"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminFaculty;
