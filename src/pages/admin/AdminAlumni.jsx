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
        current_location: "", // Fixed: Changed from "Current_Location" for consistency
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
        { id: "name", label: "Full Name", required: true, maxLength: 100 },
        {
            id: "batch",
            label: "Graduation Batch",
            required: true,
            maxLength: 20,
        },
        {
            id: "contributions",
            label: "Key Contributions to the Lab",
            textarea: true,
            rows: 3,
            required: true,
            maxWords: 500,
        },
        {
            id: "current_position",
            label: "Current Job Title and Company",
            required: true,
            maxWords: 150,
        },
        { id: "image", label: "Profile Picture", type: "file" },
        { id: "linkedin", label: "LinkedIn Profile", maxLength: 250 },
        {
            id: "current_location", // Fixed: Changed from "Current_Location"
            label: "Current Location",
            maxWords: 500,
        },
    ];

    // Custom handler for delete operation to ensure we use the correct doc_id field
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (!window.confirm(`Are you sure you want to delete this alumni?`)) {
            return;
        }

        try {
            // Use the doc_id field from the API response
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting alumni with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Alumni deleted successfully`);

            // Refresh the list
            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete alumni: ${error.message || "Unknown error"}`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Alumni"
            collection="alumni"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            buttonColor="bg-casal hover:bg-gothic" // Fixed: Changed to theme colors
            buttonTextColor="text-white" // Fixed: Changed to white for better contrast
            apiMethod="add_item"
            onCustomDelete={handleDelete} // Custom delete handler
            idField="doc_id" // Specify the correct field name for ID
        />
    );
};

export default AdminAlumni;
