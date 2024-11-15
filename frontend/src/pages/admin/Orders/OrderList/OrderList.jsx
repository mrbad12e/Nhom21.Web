// OrderList.jsx
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
import {
    MoreVertical,
    Search,
    ArrowUpDown,
    Eye,
    Download,
    Trash2,
} from 'lucide-react';
import styles from './OrderList.module.css';

const OrderList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // Mock data - replace with actual API call
    const orders = [
        {
            id: 'ORD-2024-1234',
            customer: 'John Doe',
            date: '2024-03-15',
            status: 'Processing',
            items: 3,
            total: 130.97,
            email: 'john.doe@example.com'
        },
        {
            id: 'ORD-2024-1235',
            customer: 'Jane Smith',
            date: '2024-03-14',
            status: 'Shipped',
            items: 2,
            total: 89.99,
            email: 'jane.smith@example.com'
        },
        {
            id: 'ORD-2024-1236',
            customer: 'Mike Johnson',
            date: '2024-03-13',
            status: 'Delivered',
            items: 1,
            total: 49.99,
            email: 'mike.j@example.com'
        },
        {
            id: 'ORD-2024-1237',
            customer: 'Sarah Williams',
            date: '2024-03-12',
            status: 'Cancelled',
            items: 4,
            total: 199.96,
            email: 'sarah.w@example.com'
        }
    ];

    const getStatusBadgeColor = (status) => {
        const colors = {
            'Processing': 'bg-yellow-500 hover:bg-yellow-600',
            'Shipped': 'bg-blue-500 hover:bg-blue-600',
            'Delivered': 'bg-green-500 hover:bg-green-600',
            'Cancelled': 'bg-red-500 hover:bg-red-600'
        };
        return colors[status] || 'bg-gray-500 hover:bg-gray-600';
    };

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction:
                sortConfig.key === key && sortConfig.direction === 'asc'
                    ? 'desc'
                    : 'asc',
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const filteredOrders = orders
        .filter(order => {
            const matchesSearch = (
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortConfig.key === 'total') {
                return sortConfig.direction === 'asc'
                    ? a.total - b.total
                    : b.total - a.total;
            }
            if (sortConfig.key === 'date') {
                return sortConfig.direction === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            return sortConfig.direction === 'asc'
                ? a[sortConfig.key].localeCompare(b[sortConfig.key])
                : b[sortConfig.key].localeCompare(a[sortConfig.key]);
        });

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Orders</h1>
                <Button onClick={() => {/* Add export functionality */}}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                </Button>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchContainer}>
                    <Search className={styles.searchIcon} />
                    <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
                <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                >
                    <SelectTrigger className={styles.statusFilter}>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className={styles.tableContainer}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSort('id')}
                            >
                                Order ID
                                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            </TableHead>
                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSort('customer')}
                            >
                                Customer
                                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            </TableHead>
                            <TableHead 
                                className="cursor-pointer"
                                onClick={() => handleSort('date')}
                            >
                                Date
                                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead 
                                className="text-right cursor-pointer"
                                onClick={() => handleSort('total')}
                            >
                                Total
                                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                            </TableHead>
                            <TableHead className="w-[60px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    <div className={styles.customerInfo}>
                                        <span className={styles.customerName}>{order.customer}</span>
                                        <span className={styles.customerEmail}>{order.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(order.date)}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusBadgeColor(order.status)}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            >
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Invoice
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
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
        </div>
    );
};

export default OrderList;