// src/pages/admin/AdminNews.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminNews = () => {
    const initialFormData = {
        title: "",
        description: "",
        date: "",
        image: "",
        source: "",
        link: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "date", label: "Date" },
        { key: "source", label: "Source" },
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
        { id: "title", label: "News Title", required: true },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
        },
        { id: "date", label: "Date (YYYY-MM-DD)", required: true },
        {
            id: "source",
            label: "Source (Lab Announcement, Journal, etc.)",
            required: true,
        },
        { id: "link", label: "URL to Full Article" },
        { id: "image", label: "Featured Image", type: "file" },
    ];

    // Custom delete handler for news
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (
            !window.confirm(`Are you sure you want to delete this news item?`)
        ) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting news item with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`News item deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete news item: ${
                    error.message || "Unknown error"
                }`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="News Item"
            collection="news"
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

export default AdminNews;
