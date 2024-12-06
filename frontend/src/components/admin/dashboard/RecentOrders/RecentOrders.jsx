import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import styles from './RecentOrders.module.css';

const RecentOrders = () => {
    // Mock data - replace with actual API call
    const orders = [
        {
            id: 'ORD-2024-001',
            customer: 'John Doe',
            total: 299.99,
            status: 'processing',
            date: new Date(2024, 10, 14),
        },
        {
            id: 'ORD-2024-002',
            customer: 'Jane Smith',
            total: 159.5,
            status: 'completed',
            date: new Date(2024, 10, 13),
        },
        {
            id: 'ORD-2024-003',
            customer: 'Bob Wilson',
            total: 499.99,
            status: 'pending',
            date: new Date(2024, 10, 12),
        },
    ];

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
                <Badge variant="outline" className="ml-2">
                    {orders.length} orders
                </Badge>
            </CardHeader>
            <CardContent>
                <div className={styles.tableContainer}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className={styles.tableRow}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>${order.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getStatusColor(order.status)}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {formatDistanceToNow(order.date, { addSuffix: true })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentOrders;
