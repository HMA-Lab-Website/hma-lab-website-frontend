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

    // Custom delete handler for publications
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (
            !window.confirm(`Are you sure you want to delete this publication?`)
        ) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting publication with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Publication deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete publication: ${
                    error.message || "Unknown error"
                }`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Publication"
            collection="publications"
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

export default AdminPublications;
