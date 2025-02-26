// src/utils/api.js
import axios from "axios";

const BASE_URL = "https://backend-website-api.vercel.app";

export const api = {
    // Get items from a collection
    getItems: async (collection) => {
        try {
            console.log(`Fetching items from ${collection}`);
            const response = await axios.get(
                `${BASE_URL}/get_items/${collection}`
            );
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${collection}:`, error);
            return [];
        }
    },

    // Add item to a collection
    addItem: async (itemData) => {
        try {
            console.log("Adding item with data:", itemData);

            // Make sure collection is included in the data
            if (!itemData.collection) {
                throw new Error("Collection name not provided");
            }

            // Create a proper request object
            const requestData = {
                ...itemData,
                collection: itemData.collection,
            };

            console.log("Sending request to add item:", requestData);

            const response = await axios.post(
                `${BASE_URL}/add_item`,
                requestData
            );
            console.log("Add item response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding/updating item:", error);
            if (error.response?.data?.error) {
                console.error("Server error:", error.response.data.error);
            }
            throw error;
        }
    },

    // Delete item from a collection
    deleteItem: async (collection, docId) => {
        try {
            console.log(`Deleting item ${docId} from ${collection}`);
            const response = await axios.delete(
                `${BASE_URL}/delete_item/${collection}/${docId}`
            );
            return response.data;
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    },

    // Upload image
    uploadImage: async (imageFile) => {
        try {
            console.log("Uploading image");
            const formData = new FormData();
            formData.append("image", imageFile);
            const response = await axios.post(
                `${BASE_URL}/upload_image`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("Image upload response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    },

    // Update password
    updatePassword: async (password) => {
        try {
            console.log("Updating password");
            const response = await axios.post(`${BASE_URL}/update_password`, {
                value: password,
            });
            return response.data;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    },

    // Update lab status
    updateLabStatus: async (status) => {
        try {
            console.log("Updating lab status");
            const response = await axios.post(`${BASE_URL}/update_lab`, status);
            return response.data;
        } catch (error) {
            console.error("Error updating lab status:", error);
            throw error;
        }
    },

    // Update GPU status
    updateGpuStatus: async (status) => {
        try {
            console.log("Updating GPU status");
            const response = await axios.post(`${BASE_URL}/update_gpu`, status);
            return response.data;
        } catch (error) {
            console.error("Error updating GPU status:", error);
            throw error;
        }
    },
};
