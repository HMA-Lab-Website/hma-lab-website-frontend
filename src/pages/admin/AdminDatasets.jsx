// src/pages/admin/AdminDatasets.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminDatasets = () => {
    const initialFormData = {
        name: "",
        description: "",
        link: "",
        size: "",
        format: "", // This will be converted to array before submission
        image: "",
    };

    const columns = [
        { key: "name", label: "Name" },
        { key: "size", label: "Size" },
        {
            key: "format",
            label: "Format",
            render: (item) => {
                if (!item.format) return "N/A";
                if (Array.isArray(item.format)) return item.format.join(", ");
                return item.format;
            },
        },
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
        { id: "name", label: "Dataset Name", required: true, maxLength: 100 },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
            maxLength: 500,
        },
        { id: "link", label: "Dataset Link", required: true, maxLength: 250 },
        {
            id: "size",
            label: "Size (e.g., 2GB)",
            required: true,
            maxLength: 20,
        },
        {
            id: "format",
            label: "Format (comma separated, e.g., CSV, JSON)",
            required: true,
            maxLength: 100,
        },
        { id: "image", label: "Representative Image", type: "file" },
    ];

    // Custom handler to process format as an array
    const handleCustomSubmit = async (
        api,
        collection,
        formData,
        isEditing,
        currentItemId
    ) => {
        // Create a copy of the form data
        const processedData = { ...formData };

        // Convert format from comma-separated string to array
        if (processedData.format && typeof processedData.format === "string") {
            processedData.format = processedData.format
                .split(",")
                .map((format) => format.trim())
                .filter((format) => format.length > 0);
        }

        // Prepare the submission data
        const submissionData = {
            ...processedData,
            collection: collection,
        };

        if (isEditing && currentItemId) {
            submissionData.doc_id = currentItemId;
        }

        // Submit the data
        return api.addItem(submissionData);
    };

    // Custom delete handler for datasets
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (!window.confirm(`Are you sure you want to delete this dataset?`)) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting dataset with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Dataset deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete dataset: ${error.message || "Unknown error"}`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Dataset"
            collection="datasets"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            buttonColor="bg-gray-300 hover:bg-gray-400"
            buttonTextColor="text-black"
            apiMethod="add_item"
            onCustomSubmit={handleCustomSubmit}
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminDatasets;
