import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, ArrowUpDown, Eye, Download, Trash2 } from 'lucide-react';
import styles from './OrderTable.module.css';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const OrderTable = ({ orders = [], onSort, sortConfig, loading, onViewOrder, onDownloadInvoice, onDeleteOrder }) => {
    const getStatusBadgeColor = (status) =>
        ({
            PENDING: 'bg-yellow-500 hover:bg-yellow-600',
            SHIPPED: 'bg-blue-500 hover:bg-blue-600',
            DELIVERED: 'bg-green-500 hover:bg-green-600',
            CANCELED: 'bg-red-500 hover:bg-red-600',
        }[status] || 'bg-gray-500 hover:bg-gray-600');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className={styles.tableContainer}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead onClick={() => onSort('id')} className="cursor-pointer">
                            Order ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                        <TableHead onClick={() => onSort('customer_info.username')} className="cursor-pointer">
                            Customer <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                        <TableHead onClick={() => onSort('created_at')} className="cursor-pointer">
                            Date <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead onClick={() => onSort('total_price')} className="text-right cursor-pointer">
                            Total <ArrowUpDown className="ml-2 h-4 w-4 inline" />
                        </TableHead>
                        <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                </TableHeader>

                {loading ? (
                    <LoadingSpinner />
                ) : orders.length === 0 ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No orders found
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    orders.map((order) => (
                        <TableBody key={order.id}>
                            <TableRow >
                                <TableCell>{order.id}</TableCell>
                                <TableCell>
                                    <div className={styles.customerInfo}>
                                        <span className={styles.customerName}>
                                            {`${order.customer_info.first_name} ${order.customer_info.last_name}`}
                                        </span>
                                        <span className={styles.customerEmail}>{order.customer_info.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(order.created_at)}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusBadgeColor(order.order_status)}>
                                        {order.order_status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={getStatusBadgeColor(order.payment_status)}>
                                        {order.payment_status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">${Number(order.total_price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onViewOrder(order.id)}>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onDownloadInvoice(order.id)}>
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Invoice
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => onDeleteOrder(order.id)}
                                                className="text-red-600"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))
                )}
            </Table>
        </div>
    );
};

export default OrderTable;
