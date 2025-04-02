import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { FormField, Table } from "../../components/admin";
import { Button } from "../../components/common";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const renderField = (field, formData, handleInputChange) => {
    if (field.type === "select") {
        return (
            <div key={field.id} className="mb-4">
                <label
                    htmlFor={field.id}
                    className="block text-sm font-medium text-nevada mb-1"
                >
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                </label>
                <select
                    id={field.id}
                    name={field.id}
                    value={formData[field.id] || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-casal focus:border-casal"
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
            maxLength={field.maxLength}
            maxWords={field.maxWords}
        />
    );
};

export const AdminCollectionPage = ({
    title,
    collection,
    columns,
    formFields,
    initialFormData,
    renderField,
    buttonColor = "bg-casal hover:bg-gothic",
    buttonTextColor = "text-white",
    apiMethod = "addItem",
    onCustomDelete = null,
    idField = "id",
}) => {
    const { isAuthenticated } = useAuth(); // Fixed: removed 0 from isAuthenticated0
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin/login");
        }
    }, [isAuthenticated, navigate]); // Fixed: removed the 0 character

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [currentItemId, setCurrentItemId] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await api.getItems(collection);
            // Store items with their original _id for proper deletion
            const itemsWithIds = data.map((item) => ({
                ...item,
                // Ensure we store the document ID in a consistent property
                id: item._id || item.id || item.doc_id, // Added doc_id as a fallback
            }));
            setItems(itemsWithIds);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching ${collection}:`, error);
            setError(`Failed to load ${collection}`);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "image" && e.target.files) {
            setImageFile(e.target.files[0]);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleUploadImage = async () => {
        if (!imageFile) return null;

        try {
            setUploadingImage(true);
            const response = await api.uploadImage(imageFile);

            // Make sure we're getting back the expected response format
            if (response && response.image_url) {
                return response.image_url;
            } else {
                console.error("Invalid image upload response:", response);
                setError("Invalid image upload response");
                return null;
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setError(
                "Failed to upload image: " + (error.message || "Unknown error")
            );
            return null;
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSubmitting(true);

        try {
            // Handle image upload first if there's a file
            let imageUrl = null;
            if (imageFile) {
                imageUrl = await handleUploadImage();
                if (!imageUrl) {
                    setSubmitting(false);
                    return; // Stop if image upload failed
                }
            }

            // Always explicitly set collection in the submission data
            let dataToSubmit = {
                ...formData,
                collection: collection,
            };

            // Add the image URL to the submission if we uploaded one
            if (imageUrl) {
                dataToSubmit.image = imageUrl;
            }

            console.log("Submitting data:", dataToSubmit);

            if (isEditing && currentItemId) {
                // For updating, we need to include the document ID
                await api.addItem({
                    ...dataToSubmit,
                    doc_id: currentItemId, // Use doc_id for consistency with API
                    collection: collection,
                });
                setSuccess(`${title} updated successfully`);
            } else {
                // For adding new items
                await api.addItem({
                    ...dataToSubmit,
                    collection: collection,
                });
                setSuccess(`${title} added successfully`);
            }

            // Reset form
            setFormData(initialFormData);
            setIsEditing(false);
            setCurrentItemId(null);
            setImageFile(null);

            // Refresh the list
            fetchItems();
        } catch (error) {
            console.error(
                `Error ${isEditing ? "updating" : "adding"} ${collection}:`,
                error
            );
            setError(
                `Failed to ${
                    isEditing ? "update" : "add"
                } ${title.toLowerCase()}: ${
                    error.response?.data?.error ||
                    error.message ||
                    "Unknown error"
                }`
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            ...initialFormData,
            ...item,
        });
        setIsEditing(true);
        setCurrentItemId(item.doc_id || item._id || item.id); // Prioritize doc_id
        setError("");
        setSuccess("");
    };

    const handleDelete = async (item) => {
        if (onCustomDelete) {
            // Use custom delete handler if provided
            return onCustomDelete(
                api,
                collection,
                item,
                setSuccess,
                setError,
                fetchItems
            );
        }

        if (
            !window.confirm(
                `Are you sure you want to delete this ${title.toLowerCase()}?`
            )
        ) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            // Get the document ID using the specified idField or fallbacks
            const docId = item.doc_id || item[idField] || item._id || item.id;

            if (!docId) {
                throw new Error("No document ID found for deletion");
            }

            console.log(
                `Deleting ${title} with ID: ${docId} from collection: ${collection}`
            );

            await api.deleteItem(collection, docId);
            setSuccess(`${title} deleted successfully`);

            // Refresh the list
            fetchItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(
                `Failed to delete ${title.toLowerCase()}: ${
                    error.message || "Unknown error"
                }`
            );
        } finally {
            setDeleting(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialFormData);
        setIsEditing(false);
        setCurrentItemId(null);
        setImageFile(null);
        setError("");
        setSuccess("");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-casal"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-firefly mb-8">
                {isEditing ? `Edit ${title}` : `Add ${title}`}
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                    {success}
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formFields.map((field) =>
                        renderField ? (
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
                                maxLength={field.maxLength}
                                maxWords={field.maxWords}
                            />
                        ) : (
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
                                maxLength={field.maxLength} // Make sure this prop is passed
                                maxWords={field.maxWords}
                            />
                        )
                    )}

                    <div className="flex justify-end space-x-4 mt-6">
                        {isEditing && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            type="submit"
                            variant="secondary"
                            className="font-medium px-6 py-2"
                            disabled={uploadingImage || submitting}
                        >
                            {uploadingImage
                                ? "Uploading Image..."
                                : submitting
                                ? "Submitting..."
                                : isEditing
                                ? "Update"
                                : "Add"}
                        </Button>
                    </div>
                </form>
            </div>

            <h2 className="text-xl font-semibold text-firefly mb-4">
                {title} List{" "}
                {deleting && (
                    <span className="text-sm text-red-500 ml-2">
                        (Deleting...)
                    </span>
                )}
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6">
                <Table
                    columns={columns}
                    data={items}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};
