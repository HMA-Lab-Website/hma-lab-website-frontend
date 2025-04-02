// src/pages/admin/AdminProjects.jsx
import React from "react";
import { AdminCollectionPage } from "../../components/admin/AdminCollectionPage";
import { FormField } from "../../components/admin"; // Added missing import

const AdminProjects = () => {
    const initialFormData = {
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        status: "Ongoing",
        team_members: "",
        github_link: "",
        image: "",
    };

    const columns = [
        { key: "title", label: "Title" },
        { key: "status", label: "Status" },
        { key: "start_date", label: "Start Date" },
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
        { id: "title", label: "Title", required: true, maxLength: 100 },
        {
            id: "description",
            label: "Description",
            textarea: true,
            rows: 4,
            required: true,
            maxWords: 500,
        },
        {
            id: "start_date",
            label: "Start Date (YYYY-MM-DD)",
            required: true,
            maxLength: 10,
        },
        {
            id: "end_date",
            label: "End Date (YYYY-MM-DD for completed projects)",
            maxLength: 10,
        },
        {
            id: "status",
            label: "Status",
            type: "select",
            options: ["Ongoing", "Completed"],
            required: true,
        },
        {
            id: "team_members",
            label: "Team Members (comma separated)",
            maxLength: 200,
        },
        { id: "github_link", label: "GitHub/Project Link", maxLength: 250 },
        { id: "image", label: "Project Image", type: "file" },
    ];

    // Custom renderer to handle the select input
    const renderField = (field, formData, handleInputChange) => {
        if (field.type === "select") {
            return (
                <div key={field.id} className="mb-4">
                    <label
                        htmlFor={field.id}
                        className="block text-sm font-medium text-nevada mb-1"
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
            />
        );
    };

    // Custom submit handler to process team_members as an array
    const handleCustomSubmit = async (
        api,
        collection,
        formData,
        isEditing,
        currentItemId
    ) => {
        // Create a copy of the form data
        const processedData = { ...formData };

        // Convert team_members from comma-separated string to array
        if (
            processedData.team_members &&
            typeof processedData.team_members === "string"
        ) {
            processedData.team_members = processedData.team_members
                .split(",")
                .map((member) => member.trim())
                .filter((member) => member.length > 0);
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

    // Custom delete handler for projects
    const handleDelete = async (
        api,
        collection,
        item,
        setSuccess,
        setError,
        refreshItems
    ) => {
        if (!window.confirm(`Are you sure you want to delete this project?`)) {
            return;
        }

        try {
            const docId = item.doc_id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting project with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`Project deleted successfully`);

            refreshItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete project: ${error.message || "Unknown error"}`
            );
            return false;
        }
        return true;
    };

    return (
        <AdminCollectionPage
            title="Project"
            collection="projects"
            columns={columns}
            formFields={formFields}
            initialFormData={initialFormData}
            renderField={renderField}
            buttonColor="bg-gray-300 hover:bg-gray-400"
            buttonTextColor="text-black"
            apiMethod="add_item"
            onCustomSubmit={handleCustomSubmit}
            onCustomDelete={handleDelete}
            idField="doc_id"
        />
    );
};

export default AdminProjects;
