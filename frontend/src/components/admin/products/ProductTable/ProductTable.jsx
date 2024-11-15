// ProductTable.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
    MoreVertical,
    Search,
    ArrowUpDown,
    Edit2,
    Trash2,
    Plus,
    Copy,
    Archive,
    ExternalLink
} from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import styles from './ProductTable.module.css';

const ProductTable = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

    // Mock data - replace with actual API call
    const products = [
        {
            id: 1,
            name: 'Premium Headphones',
            sku: 'HDH-001',
            category: 'Electronics',
            price: 199.99,
            stock: 45,
            status: 'In Stock',
            thumbnail: '/api/placeholder/100/100'
        },
        {
            id: 2,
            name: 'Wireless Mouse',
            sku: 'WMS-002',
            category: 'Electronics',
            price: 29.99,
            stock: 0,
            status: 'Out of Stock',
            thumbnail: '/api/placeholder/100/100'
        },
        {
            id: 3,
            name: 'Designer Watch',
            sku: 'WCH-003',
            category: 'Accessories',
            price: 299.99,
            stock: 5,
            status: 'Low Stock',
            thumbnail: '/api/placeholder/100/100'
        },
        {
            id: 4,
            name: 'Leather Wallet',
            sku: 'WAL-004',
            category: 'Accessories',
            price: 49.99,
            stock: 120,
            status: 'In Stock',
            thumbnail: '/api/placeholder/100/100'
        }
    ];

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        });
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedProducts(filteredProducts.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId, checked) => {
        if (checked) {
            setSelectedProducts([...selectedProducts, productId]);
        } else {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        // Implement delete functionality
        console.log('Deleting product:', productToDelete);
        setShowDeleteDialog(false);
        setProductToDelete(null);
    };

    const getStatusBadgeColor = (status) => {
        const colors = {
            'In Stock': 'bg-green-500 hover:bg-green-600',
            'Out of Stock': 'bg-red-500 hover:bg-red-600',
            'Low Stock': 'bg-yellow-500 hover:bg-yellow-600'
        };
        return colors[status] || 'bg-gray-500 hover:bg-gray-600';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const filteredProducts = products
        .filter(product => {
            const matchesSearch = (
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.sku.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            const modifier = sortConfig.direction === 'asc' ? 1 : -1;
            if (sortConfig.key === 'price' || sortConfig.key === 'stock') {
                return (a[sortConfig.key] - b[sortConfig.key]) * modifier;
            }
            return a[sortConfig.key].localeCompare(b[sortConfig.key]) * modifier;
        });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h1 className={styles.title}>Products</h1>
                    <span className={styles.productCount}>
                        {filteredProducts.length} products
                    </span>
                </div>
                <Button onClick={() => navigate('/admin/products/add')}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                >
                    <SelectTrigger className={styles.filterSelect}>
                        <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                >
                    <SelectTrigger className={styles.filterSelect}>
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {selectedProducts.length > 0 && (
                <div className={styles.bulkActions}>
                    <span className={styles.selectedCount}>
                        {selectedProducts.length} selected
                    </span>
                    <div className={styles.bulkButtons}>
                        <Button variant="outline" size="sm">
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}

            <div className={styles.tableContainer}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]">
                                <Checkbox
                                    checked={selectedProducts.length === filteredProducts.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="w-[300px]">
                                <div className="flex items-center space-x-2">
                                    <span>Product</span>
                                    <ArrowUpDown
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleSort('name')}
                                    />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center space-x-2">
                                    <span>SKU</span>
                                    <ArrowUpDown
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleSort('sku')}
                                    />
                                </div>
                            </TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>
                                <div className="flex items-center space-x-2">
                                    <span>Price</span>
                                    <ArrowUpDown
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleSort('price')}
                                    />
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center space-x-2">
                                    <span>Stock</span>
                                    <ArrowUpDown
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleSort('stock')}
                                    />
                                </div>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[60px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedProducts.includes(product.id)}
                                        onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className={styles.productInfo}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className={styles.productImage}
                                        />
                                        <span className={styles.productName}>{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{formatCurrency(product.price)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusBadgeColor(product.status)}>
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                            >
                                                <Edit2 className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Copy className="mr-2 h-4 w-4" />
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View on Site
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() => handleDeleteClick(product)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Product</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProductTable;

// ProductTable.module.css
