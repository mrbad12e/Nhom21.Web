import { useState, useEffect } from "react";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake API call (thay bằng real API nếu cần)
    const fetchProducts = async () => {
      setLoading(true);
      const fakeProducts = [
        {
          _id: "1",
          title: "Product 1",
          description: "Description 1",
          basePrice: 100,
          image: "https://via.placeholder.com/400",
          category: "Electronics",
        },
        {
          _id: "2",
          title: "Product 2",
          description: "Description 2",
          basePrice: 150,
          image: "https://via.placeholder.com/400",
          category: "Fashion and apparel",
        },
        {
          _id: "3",
          title: "Product 3",
          description: "Description 3",
          basePrice: 200,
          image: "https://via.placeholder.com/400",
          category: "Media",
        },
        {
          _id: "4",
          title: "Product 4",
          description: "Description 4",
          category: "Food and beverage",
          basePrice: 250,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "5",
          title: "Product 5",
          description: "Description 5",
          category: "Electronics",
          basePrice: 300,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "6",
          title: "Product 6",
          description: "Description 6",
          category: "Fashion and apparel",
          basePrice: 350,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "7",
          title: "Product 7",
          description: "Description 7",
          category: "Media",
          basePrice: 400,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "8",
          title: "Product 8",
          description: "Description 8",
          category: "Food and beverage",
          basePrice: 450,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "9",
          title: "Product 9",
          description: "Description 9",
          category: "Toy and hobbies",
          basePrice: 500,
          image: "https://via.placeholder.com/200",
        },
        {
          _id: "10",
          title: "Product 10",
          description: "Description 10",
          category: "Electronics",
          basePrice: 550,
          image: "https://via.placeholder.com/200",
        },
      ];
      setProducts(fakeProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, loading };
};

export default useProducts;
