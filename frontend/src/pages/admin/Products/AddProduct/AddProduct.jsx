// AddProduct.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '@/components/admin/products/ProductForm';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import styles from './AddProduct.module.css';

// Mock categories data
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Books' }
];

const AddProduct = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/admin/products');
    };

    const handleSuccess = () => {
        // You can add success notification here
        navigate('/admin/products');
    };

    return (
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.breadcrumbSection}>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={handleBack}>Products</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>Add New Product</BreadcrumbItem>
                    </Breadcrumb>
                    <Button
                        variant="ghost"
                        className={styles.backButton}
                        onClick={handleBack}
                    >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Products
                    </Button>
                </div>

                <Card className={styles.headerCard}>
                    <CardHeader>
                        <CardTitle>Add New Product</CardTitle>
                        <CardDescription>
                            Fill in the details below to create a new product listing.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert>
                            <AlertDescription>
                                Make sure to fill in all required fields and add at least one product image.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>

            {/* Main Form Section */}
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <ProductForm 
                        categories={categories}
                        onSuccess={handleSuccess}
                    />
                </div>

                {/* Side Panel */}
                <div className={styles.sidePanel}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Tips</CardTitle>
                            <CardDescription>
                                Follow these tips for better product listings
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className={styles.tipsList}>
                                <li>Use high-quality product images</li>
                                <li>Write clear, detailed descriptions</li>
                                <li>Set competitive prices</li>
                                <li>Choose the right category</li>
                                <li>Keep track of your inventory</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Product Status Card */}
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={styles.quickActions}>
                                <Button className="w-full" variant="outline">
                                    Save as Draft
                                </Button>
                                <Button className="w-full" variant="secondary">
                                    Preview
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;