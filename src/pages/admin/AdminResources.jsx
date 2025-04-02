// src/pages/admin/AdminResources.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";
import { FormField } from "../../components/admin";

const AdminResources = () => {
    const initialFormData = {
        title: "",
        description: "",
        link: "",
        category: "Tutorial",
        author: "",
        image: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "author", label: "Author" },
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

    const categories = ["Tutorial", "Tool", "Document", "Video", "Other"];

    const formFields = [
        {
            id: "title",
            label: "Resource Title",
            required: true,
            maxLength: 100,
        },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
            maxLength: 2000,
        },
        { id: "link", label: "Resource Link", required: true, maxLength: 250 },
        {
            id: "category",
            label: "Category",
            type: "select",
            options: categories,
            required: true,
        },
        {
            id: "author",
            label: "Author/Creator",
            required: true,
            maxLength: 100,
        },
        { id: "image", label: "Thumbnail Image", type: "file" },
    ];

    const renderField = (field, formData, handleInputChange) => {
        if (field.type === "select") {
            return (
                <div key={field.id} className="mb-4">
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        {field.label}{" "}
                        {field.required && (
                            <span className="text-red-500">*</span>
                        )}
                    </label>
                    <select
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-casal/50"
                        required={field.required}
                    >
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }

        return (
            <FormField
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type || "text"}
                value={formData[field.id] || ""}
                onChange={handleInputChange}
                placeholder={field.placeholder || ""}
                required={field.required}
                textarea={field.textarea}
                rows={field.rows}
                error=""
                maxLength={field.maxLength} // Ensure this is passed through
            />
        );
    };

    // Custom delete handler for resources
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (!window.confirm(`Are you sure you want to delete this resource?`)) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting resource with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Resource deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete resource: ${error.message || "Unknown error"}`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Resource"
            collection="resources"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            renderField={renderField}
            buttonColor="bg-casal hover:bg-gothic"
            buttonTextColor="text-white"
            apiMethod="add_item"
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminResources;
