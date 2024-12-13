import { useState, useEffect } from "react";
import axiosInstance from "@/services/api";

const useProductsById = (id) => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return; // Exit if no ID is provided

            setLoading(true);
            setError(null);

            try {
                // Fetch product by ID using query parameter
                const response = await axiosInstance.get(`/products?id=${id}`);
                console.log("Fetched Product Response:", response); // Log the response
                setProduct(response.data[0]); // Assuming the API returns an array of products
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("An unexpected error occurred. Please try again later.");
                
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Only run when ID changes

    return { product, loading, error }; // Return the product data along with loading and error states
};

export default useProductsById;
