import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import { FormField, Table } from "../../components/admin";
import { Button } from "../../components/common";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminCollectionPage = ({
    title,
    collection,
    columns,
    formFields,
    initialFormData,
    renderField,
}) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/admin/login");
        }
    }, [isAuthenticated, navigate]);

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

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await api.getItems(collection);
            // Add an id field using the firebase document ID stored in _id
            const itemsWithIds = data.map((item) => ({
                ...item,
                id: item._id || item.id,
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
            // Always explicitly set collection in the submission data
            let dataToSubmit = {
                ...formData,
                collection: collection, // Make sure collection is included in every request
            };

            console.log("Submitting data:", dataToSubmit); // Debug log

            if (isEditing && currentItemId) {
                // For updating, we need to include the document ID
                await api.addItem({
                    ...dataToSubmit,
                    _id: currentItemId,
                    collection: collection, // Make sure collection is included in update request
                });
                setSuccess(`${title} updated successfully`);
            } else {
                // For adding new items
                await api.addItem({
                    ...dataToSubmit,
                    collection: collection, // Make sure collection is included in add request
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
        setCurrentItemId(item.id || item._id);
        setError("");
        setSuccess("");
    };

    const handleDelete = async (item) => {
        if (
            !window.confirm(
                `Are you sure you want to delete this ${title.toLowerCase()}?`
            )
        ) {
            return;
        }

        try {
            await api.deleteItem(collection, item.id || item._id);
            setSuccess(`${title} deleted successfully`);
            // Refresh the list
            fetchItems();
        } catch (error) {
            console.error(`Error deleting ${collection}:`, error);
            setError(`Failed to delete ${title.toLowerCase()}`);
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
                            renderField(field, formData, handleInputChange)
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
                            className="bg-casal hover:bg-gothic text-white font-medium px-6 py-2"
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
                {title} List
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
