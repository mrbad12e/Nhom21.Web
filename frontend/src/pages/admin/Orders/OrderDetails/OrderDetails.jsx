import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Package2, Truck, Clock, CheckCircle2 } from 'lucide-react';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
    const { id } = useParams();
    // Mock data - replace with actual API call
    const orderDetails = {
        orderId: '#ORD-2024-1234',
        status: 'Processing',
        orderDate: '2024-03-15',
        customer: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 890',
            address: '123 Main St, City, Country'
        },
        items: [
            { id: 1, name: 'Product 1', quantity: 2, price: 29.99, total: 59.98 },
            { id: 2, name: 'Product 2', quantity: 1, price: 49.99, total: 49.99 }
        ],
        payment: {
            method: 'Credit Card',
            subtotal: 109.97,
            shipping: 10.00,
            tax: 11.00,
            total: 130.97
        },
        timeline: [
            { status: 'Order Placed', date: '2024-03-15 10:30 AM', icon: Clock },
            { status: 'Processing', date: '2024-03-15 11:00 AM', icon: Package2 },
            { status: 'Shipped', date: '2024-03-16 09:00 AM', icon: Truck },
            { status: 'Delivered', date: '2024-03-18 02:30 PM', icon: CheckCircle2 }
        ]
    };

    const getStatusColor = (status) => {
        const colors = {
            'Processing': 'bg-yellow-500',
            'Shipped': 'bg-blue-500',
            'Delivered': 'bg-green-500',
            'Cancelled': 'bg-red-500'
        };
        return colors[status] || 'bg-gray-500';
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Order Details</h1>
                    <p className={styles.orderId}>{orderDetails.orderId}</p>
                </div>
                <Badge className={getStatusColor(orderDetails.status)}>
                    {orderDetails.status}
                </Badge>
            </div>

            <div className={styles.grid}>
                {/* Customer Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.customerInfo}>
                            <p className={styles.customerName}>{orderDetails.customer.name}</p>
                            <p>{orderDetails.customer.email}</p>
                            <p>{orderDetails.customer.phone}</p>
                            <p>{orderDetails.customer.address}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.timeline}>
                            {orderDetails.timeline.map((event, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineIcon}>
                                        <event.icon className={styles.icon} />
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <p className={styles.timelineStatus}>{event.status}</p>
                                        <p className={styles.timelineDate}>{event.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Order Items */}
                <Card className={styles.orderItems}>
                    <CardHeader>
                        <CardTitle>Order Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="text-right">Quantity</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orderDetails.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.price}</TableCell>
                                        <TableCell className="text-right">${item.total}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Payment Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.paymentSummary}>
                            <div className={styles.paymentRow}>
                                <span>Payment Method</span>
                                <span>{orderDetails.payment.method}</span>
                            </div>
                            <Separator className="my-4" />
                            <div className={styles.paymentRow}>
                                <span>Subtotal</span>
                                <span>${orderDetails.payment.subtotal}</span>
                            </div>
                            <div className={styles.paymentRow}>
                                <span>Shipping</span>
                                <span>${orderDetails.payment.shipping}</span>
                            </div>
                            <div className={styles.paymentRow}>
                                <span>Tax</span>
                                <span>${orderDetails.payment.tax}</span>
                            </div>
                            <Separator className="my-4" />
                            <div className={styles.paymentTotal}>
                                <span>Total</span>
                                <span>${orderDetails.payment.total}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderDetails;