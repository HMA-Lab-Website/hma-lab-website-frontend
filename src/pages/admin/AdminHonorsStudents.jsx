// src/pages/admin/AdminHonorsStudents.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";
import { FormField } from "../../components/admin";

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
        { id: "name", label: "Full Name", required: true, maxLength: 100 },
        {
            id: "role",
            label: "Role",
            required: true,
            value: "Honors Student",
            maxLength: 50,
        },
        {
            id: "email",
            label: "Email Address",
            required: true,
            type: "email",
            maxLength: 100,
        },
        {
            id: "research_topic",
            label: "Research Topic",
            required: true,
            maxLength: 200,
        },
        {
            id: "graduation_year",
            label: "Expected Graduation Year",
            required: true,
            maxLength: 4,
        },
        {
            id: "bio",
            label: "Biography",
            textarea: true,
            rows: 5,
            required: true,
            maxWords: 250,
        },
        { id: "linkedin", label: "LinkedIn Profile URL", maxLength: 250 },
        { id: "image", label: "Profile Picture", type: "file" },
    ];

    const renderField = (field, formData, handleInputChange) => {
        if (field.id === "role") {
            return (
                <div key={field.id} className="mb-4">
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-firefly mb-1"
                    >
                        {field.label}{" "}
                        {field.required && (
                            <span className="text-red-500">*</span>
                        )}
                    </label>
                    <input
                        type="text"
                        id={field.id}
                        name={field.id}
                        value="Honors Student"
                        disabled
                        className="w-full px-3 py-2 bg-iron/10 border border-iron rounded-md focus:outline-none focus:ring-2 focus:ring-casal/50 cursor-not-allowed"
                    />
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
                required={field.required}
                textarea={field.textarea}
                rows={field.rows}
                error=""
                maxLength={field.maxLength}
            />
        );
    };

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
            collection="people"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            buttonColor="bg-casal hover:bg-gothic"
            buttonTextColor="text-white"
            apiMethod="add_item"
            onCustomDelete={handleDelete}
            idField="doc_id"
            renderField={renderField}
        />
    );
};

export default AdminHonorsStudents;
