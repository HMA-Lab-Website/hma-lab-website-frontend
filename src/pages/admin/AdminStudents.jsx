// src/pages/admin/AdminStudents.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminStudents = () => {
    // Set collection name as 'students' to match backend collection
    const collectionName = "students";

    const initialFormData = {
        name: "",
        role: "Student",
        email: "",
        image: "",
        bio: "",
        linkedin: "",
        // Include collection name in initial form data
        collection: collectionName,
    };

    const columns = [
        { key: "name", label: "Name" },
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
            title="Student"
            collection={collectionName}
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
        />
    );
};

export default AdminStudents;
