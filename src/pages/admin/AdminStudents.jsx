// src/pages/admin/AdminStudents.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";

const AdminStudents = () => {
    const initialFormData = {
        name: "",
        role: "Student", // Default role set to "Student" for filtering
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
            value: "Student",
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
            id: "bio",
            label: "Biography",
            textarea: true,
            rows: 5,
            required: true,
            maxLength: 500,
        },
        { id: "linkedin", label: "LinkedIn Profile URL", maxLength: 250 },
        { id: "image", label: "Profile Picture", type: "file" },
    ];

    // Custom delete handler for students
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (!window.confirm(`Are you sure you want to delete this student?`)) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting student with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Student deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete student: ${error.message || "Unknown error"}`
            );
            return false;
        }
        return true;
    };

    const renderField = (field, formData, handleInputChange) => {
        if (field.type === "select") {
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
                    <select
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-iron rounded-md focus:outline-none focus:ring-2 focus:ring-casal/50"
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
                maxLength={field.maxLength} // Added this prop to enable character counter
            />
        );
    };

    return (
        <AdminCollectionPage
            title="Student"
            collection="people" // Changed from "students" to "people" to match the schema
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

export default AdminStudents;
