import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Package,
    Truck,
    User,
    MapPin,
    Clock,
    ClipboardCheck,
    AlertCircle,
} from "lucide-react";
import { format } from 'date-fns';
import styles from './OrderDetails.module.css';

const OrderDetails = ({ orderId }) => {
    // Mock data - replace with actual API data
    const orderDetails = {
        id: "ORD-2024-001",
        date: new Date(2024, 10, 14, 15, 30),
        status: "processing",
        customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 (555) 123-4567"
        },
        shippingAddress: {
            street: "123 Main Street",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            country: "United States"
        },
        items: [
            {
                id: 1,
                name: "Wireless Headphones",
                sku: "WH-001",
                quantity: 1,
                price: 199.99,
                total: 199.99
            },
            {
                id: 2,
                name: "Smartphone Case",
                sku: "SC-101",
                quantity: 2,
                price: 24.99,
                total: 49.98
            }
        ],
        payment: {
            method: "Credit Card",
            status: "paid",
            subtotal: 249.97,
            shipping: 9.99,
            tax: 25.00,
            total: 284.96
        },
        statusHistory: [
            {
                status: "placed",
                date: new Date(2024, 10, 14, 15, 30),
                note: "Order placed successfully"
            },
            {
                status: "processing",
                date: new Date(2024, 10, 14, 15, 45),
                note: "Payment confirmed, processing order"
            }
        ]
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            placed: "bg-purple-100 text-purple-800",
            shipped: "bg-green-100 text-green-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800"
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className={styles.container}>
            {/* Order Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Order #{orderDetails.id}</h1>
                    <p className={styles.date}>
                        Placed on {format(orderDetails.date, 'PPp')}
                    </p>
                </div>
                <Badge className={getStatusColor(orderDetails.status)}>
                    {orderDetails.status.charAt(0).toUpperCase() + orderDetails.status.slice(1)}
                </Badge>
            </div>

            <div className={styles.gridContainer}>
                {/* Customer Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Customer Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.infoGrid}>
                            <div>
                                <p className={styles.label}>Name</p>
                                <p className={styles.value}>{orderDetails.customer.name}</p>
                            </div>
                            <div>
                                <p className={styles.label}>Email</p>
                                <p className={styles.value}>{orderDetails.customer.email}</p>
                            </div>
                            <div>
                                <p className={styles.label}>Phone</p>
                                <p className={styles.value}>{orderDetails.customer.phone}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Shipping Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Shipping Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.address}>
                            <p>{orderDetails.shippingAddress.street}</p>
                            <p>
                                {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}
                            </p>
                            <p>{orderDetails.shippingAddress.country}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Items */}
                <Card className={styles.fullWidth}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Order Items
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Item</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderDetails.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(item.total)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={styles.orderSummary}>
                            <div className={styles.summaryItem}>
                                <span>Subtotal</span>
                                <span>{formatCurrency(orderDetails.payment.subtotal)}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Shipping</span>
                                <span>{formatCurrency(orderDetails.payment.shipping)}</span>
                            </div>
                            <div className={styles.summaryItem}>
                                <span>Tax</span>
                                <span>{formatCurrency(orderDetails.payment.tax)}</span>
                            </div>
                            <Separator />
                            <div className={styles.summaryTotal}>
                                <span>Total</span>
                                <span>{formatCurrency(orderDetails.payment.total)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Status History */}
                <Card className={styles.fullWidth}>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Order Timeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.timeline}>
                            {orderDetails.statusHistory.map((event, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineIcon}>
                                        {event.status === 'placed' && <ClipboardCheck className="h-4 w-4" />}
                                        {event.status === 'processing' && <AlertCircle className="h-4 w-4" />}
                                        {event.status === 'shipped' && <Truck className="h-4 w-4" />}
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <p className={styles.timelineTitle}>
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </p>
                                        <p className={styles.timelineDate}>
                                            {format(event.date, 'PPp')}
                                        </p>
                                        <p className={styles.timelineNote}>{event.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderDetails;