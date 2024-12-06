// EditProduct.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductForm } from '@/components/admin/products/ProductForm';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '@/components/ui/card';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
    ChevronLeft, 
    Clock,
    Eye,
    MoreVertical,
    Archive,
    Trash2,
    History,
    Save,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from './EditProduct.module.css';

// Mock categories data
const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Accessories' },
    { id: 3, name: 'Clothing' },
    { id: 4, name: 'Books' }
];

// Mock product data - replace with API call
const mockProduct = {
    id: 1,
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    stock: 45,
    category_id: 1,
    image_urls: ['/api/placeholder/100/100', '/api/placeholder/100/100'],
    created_at: '2024-03-15T10:30:00Z',
    status: 'active',
    lastUpdated: '2024-03-16T15:45:00Z',
    views: 1234,
    sales: 56
};

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Mock product data - replace with actual API call
    const product = mockProduct;

    const handleBack = () => {
        navigate('/admin/products');
    };

    const handleSuccess = () => {
        // Add success notification here
        navigate('/admin/products');
    };

    const handleArchive = async () => {
        setIsArchiving(true);
        // Add archive logic here
        setTimeout(() => {
            setIsArchiving(false);
            navigate('/admin/products');
        }, 1000);
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        // Add delete logic here
        setTimeout(() => {
            setIsDeleting(false);
            setShowDeleteDialog(false);
            navigate('/admin/products');
        }, 1000);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                        <BreadcrumbItem>Edit Product</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                        >
                            <ChevronLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                        
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600"
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            View Live
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <History className="h-4 w-4 mr-2" />
                                    View History
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleArchive}>
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive Product
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => setShowDeleteDialog(true)}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Product
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <Card className={styles.headerCard}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle>{product.name}</CardTitle>
                                <CardDescription className="mt-1">
                                    Product ID: {product.id}
                                </CardDescription>
                            </div>
                            <Badge variant={product.status === 'active' ? 'success' : 'secondary'}>
                                {product.status === 'active' ? 'Active' : 'Draft'}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.productStats}>
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Created</span>
                                <span className={styles.statValue}>{formatDate(product.created_at)}</span>
                            </div>
                            <Separator orientation="vertical" />
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Last Updated</span>
                                <span className={styles.statValue}>{formatDate(product.lastUpdated)}</span>
                            </div>
                            <Separator orientation="vertical" />
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Views</span>
                                <span className={styles.statValue}>{product.views.toLocaleString()}</span>
                            </div>
                            <Separator orientation="vertical" />
                            <div className={styles.statItem}>
                                <span className={styles.statLabel}>Sales</span>
                                <span className={styles.statValue}>{product.sales.toLocaleString()}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Form Section */}
            <div className={styles.formSection}>
                <div className={styles.formContainer}>
                    <ProductForm 
                        initialData={product}
                        categories={categories}
                        onSuccess={handleSuccess}
                    />
                </div>

                {/* Side Panel */}
                <div className={styles.sidePanel}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Activity Log</CardTitle>
                            <CardDescription>Recent changes to this product</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className={styles.activityLog}>
                                <div className={styles.activityItem}>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityText}>Price updated to $199.99</p>
                                        <span className={styles.activityTime}>2 hours ago</span>
                                    </div>
                                </div>
                                <div className={styles.activityItem}>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityText}>Stock level adjusted to 45 units</p>
                                        <span className={styles.activityTime}>5 hours ago</span>
                                    </div>
                                </div>
                                <div className={styles.activityItem}>
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <div className={styles.activityContent}>
                                        <p className={styles.activityText}>Description updated</p>
                                        <span className={styles.activityTime}>1 day ago</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="ghost" className="w-full text-sm">
                                View Full History
                            </Button>
                        </CardFooter>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={styles.quickActions}>
                                <Button className="w-full" variant="outline">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save as Draft
                                </Button>
                                <Button className="w-full" variant="secondary">
                                    <Eye className="h-4 w-4 mr-2" />
                                    Preview Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this product? This action cannot be undone
                            and will remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Product'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default EditProduct;
