import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/api';
import OrderTable from '@/components/admin/orders/OrderTable/OrderTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Search, Download } from 'lucide-react';
import styles from './OrderList.module.css';

const ITEMS_PER_PAGE = 10;
const STATUS_OPTIONS = [
    { value: 'ALL', label: 'All Status' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELED', label: 'Canceled' },
];

const OrderList = () => {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await axiosInstance.post('/admin/orders/list', {
                params: { offset: 0, limit: 1000 },
            });
            setAllOrders(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSort = (key) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    const processOrders = () => {
        let filtered = [...allOrders];

        if (statusFilter && statusFilter !== 'ALL') {
            filtered = filtered.filter((order) => order.order_status === statusFilter);
        }

        filtered.sort((a, b) => {
            const aValue = sortConfig.key.includes('.')
                ? sortConfig.key.split('.').reduce((obj, key) => obj[key], a)
                : a[sortConfig.key];
            const bValue = sortConfig.key.includes('.')
                ? sortConfig.key.split('.').reduce((obj, key) => obj[key], b)
                : b[sortConfig.key];

            if (typeof aValue === 'string') {
                return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        });

        const start = (page - 1) * ITEMS_PER_PAGE;
        return {
            paginatedOrders: filtered.slice(start, start + ITEMS_PER_PAGE),
            totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
        };
    };

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    const { paginatedOrders, totalPages } = processOrders();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Orders</h1>
            </div>

            <div className={styles.filters}>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={styles.statusFilter}>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <OrderTable
                orders={paginatedOrders}
                loading={loading}
                sortConfig={sortConfig}
                onSort={handleSort}
                onViewOrder={(id) => navigate(`/admin/orders/${id}`)}
                onDownloadInvoice={(id) => console.log('Download invoice:', id)}
                onDeleteOrder={(id) => console.log('Delete order:', id)}
            />

            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <div className={styles.pageInfo}>
                        Page {page} of {totalPages}
                    </div>
                    <div className={styles.pageControls}>
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || loading}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
