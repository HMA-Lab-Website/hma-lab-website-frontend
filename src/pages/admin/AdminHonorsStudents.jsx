// src/pages/admin/AdminHonorsStudents.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminHonorsStudents = () => {
    const initialFormData = {
        name: "",
        role: "Honors Student",
        email: "",
        image: "",
        bio: "",
        linkedin: "",
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
        { id: "role", label: "Role", required: true, value: "Honors Student" },
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

    // Custom delete handler for honors students
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
                `Are you sure you want to delete this honors student?`
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
                `Deleting honors student with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Honors student deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete honors student: ${
                    error.message || "Unknown error"
                }`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Honors Student"
            collection="people" // Changed from "honors_students" to "people"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            buttonColor="bg-gray-300 hover:bg-gray-400"
            buttonTextColor="text-black"
            apiMethod="add_item"
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminHonorsStudents;
