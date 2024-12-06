import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductForm } from '@/components/admin/products/ProductForm';
import { ProductTable } from '@/components/admin/products/ProductTable';
import styles from './ProductList.module.css';

// List of categories - Replace with API call
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Books' }
];

// Mock data - Replace with API call
const products = [
    {
        id: 1,
        name: 'Premium Headphones',
        sku: 'HDH-001',
        category_id: 1,
        price: 199.99,
        stock: 45,
        status: 'In Stock',
        image_urls: ['/api/placeholder/100/100'],
        description: 'High-quality wireless headphones with noise cancellation',
        created_at: '2024-03-15T10:30:00Z'
    },
    {
        id: 2,
        name: 'Wireless Mouse',
        sku: 'WMS-002',
        category_id: 1,
        price: 29.99,
        stock: 0,
        status: 'Out of Stock',
        image_urls: ['/api/placeholder/100/100'],
        description: 'Ergonomic wireless mouse with long battery life',
        created_at: '2024-03-14T15:45:00Z'
    },
    {
        id: 3,
        name: 'Designer Watch',
        sku: 'WCH-003',
        category_id: 2,
        price: 299.99,
        stock: 5,
        status: 'Low Stock',
        image_urls: ['/api/placeholder/100/100'],
        description: 'Luxury designer watch with premium materials',
        created_at: '2024-03-13T09:15:00Z'
    }
];

const ProductList = () => {
    return (
        <Routes>
            <Route
                index
                element={<ProductListView products={products} categories={categories} />}
            />
            <Route
                path="add"
                element={<ProductForm categories={categories} />}
            />
            <Route
                path="edit/:id"
                element={<ProductEditView products={products} categories={categories} />}
            />
        </Routes>
    );
};

// Main product list view with table
const ProductListView = ({ products, categories }) => {
    return (
        <div className={styles.container}>
            <ProductTable
                products={products}
                categories={categories}
            />
        </div>
    );
};

// Edit view that fetches product data and passes to form
const ProductEditView = ({ products, categories }) => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <ProductForm
            initialData={product}
            categories={categories}
        />
    );
};

export default ProductList;