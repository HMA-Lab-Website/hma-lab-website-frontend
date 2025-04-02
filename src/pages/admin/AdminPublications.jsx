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

    // Updated columns with width and truncation
    const columns = [
        {
            key: "title",
            label: "Title",
            width: "2/6",
            render: (item) => (
                <div className="truncate" title={item.title}>
                    {item.title}
                </div>
            ),
        },
        {
            key: "authors",
            label: "Authors",
            width: "2/6",
            render: (item) => (
                <div className="truncate" title={item.authors}>
                    {item.authors}
                </div>
            ),
        },
        {
            key: "year",
            label: "Year",
            width: "1/12",
            className: "text-center",
        },
        {
            key: "journal",
            label: "Journal/Conference",
            width: "2/6",
            render: (item) => (
                <div className="truncate" title={item.journal}>
                    {item.journal}
                </div>
            ),
        },
        {
            key: "image",
            label: "Image",
            width: "1/12",
            className: "text-center",
            render: (item) =>
                item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-10 h-10 object-cover rounded mx-auto"
                    />
                ) : (
                    "No image"
                ),
        },
    ];

    const formFields = [
        { id: "title", label: "Title", required: true, maxLength: 100 },
        { id: "authors", label: "Authors", required: true, maxLength: 100 },
        { id: "year", label: "Year", required: true, maxLength: 4 },
        {
            id: "journal",
            label: "Journal/Conference",
            required: true,
            maxLength: 150,
        },
        { id: "link", label: "PDF/Journal Link", maxLength: 250 },
        { id: "image", label: "Cover Image", type: "file" },
        {
            id: "abstract",
            label: "Abstract",
            textarea: true,
            rows: 5,
            maxWords: 250,
        },
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
            buttonColor="bg-casal hover:bg-gothic"
            buttonTextColor="text-white"
            apiMethod="add_item"
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminPublications;
