// src/pages/admin/AdminFaculty.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminFaculty = () => {
    const initialFormData = {
        name: "",
        role: "Faculty", // Default role set to "Faculty" to ensure proper filtering
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
        { id: "name", label: "Full Name", required: true, maxLength: 100 },
        {
            id: "role",
            label: "Role",
            required: true,
            value: "Faculty",
            maxLength: 50,
        },
        { id: "email", label: "Email Address", required: true, type: "email" },
        {
            id: "bio",
            label: "Biography",
            textarea: true,
            rows: 5,
            required: true,
            maxLength: 250,
        },
        { id: "linkedin", label: "LinkedIn Profile URL", maxLength: 250 },
        { id: "image", label: "Profile Picture", type: "file" },
    ];

    // Custom delete handler for faculty
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (
            !window.confirm(
                `Are you sure you want to delete this faculty member?`
            )
        ) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting faculty with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Faculty member deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete faculty member: ${
                    error.message || "Unknown error"
                }`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Faculty"
            collection="people" // Changed from "faculty" to "people" to match the schema
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            buttonColor="bg-casal hover:bg-gothic"
            buttonTextColor="text-white"
            apiMethod="add_item"
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminFaculty;
