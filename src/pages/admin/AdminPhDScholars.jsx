// src/pages/admin/AdminPHD Scholar.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminPhDScholars = () => {
    const initialFormData = {
        name: "",
        role: "PHD Scholar", // Default role set to "PHD Scholar" to ensure proper filtering
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
            value: "Phd Scholar",
            maxLength: 50,
        },
        { id: "email", label: "Email Address", required: true, type: "email" },
        {
            id: "bio",
            label: "Biography",
            textarea: true,
            rows: 5,
            required: true,
            maxLength: 2000,
        },
        { id: "linkedin", label: "LinkedIn Profile URL", maxLength: 250 },
        { id: "image", label: "Profile Picture", type: "file" },
    ];

    // Custom delete handler for PHD Scholar
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
                `Are you sure you want to delete this PHD Scholar member?`
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
                `Deleting PHD Scholar with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`PHD Scholar member deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete phd member: ${
                    error.message || "Unknown error"
                }`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="PHD Scholar"
            collection="people" // Changed from "PHD Scholar" to "people" to match the schema
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

export default AdminPhDScholars;
