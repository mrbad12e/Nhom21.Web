import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import styles from './SalesChart.module.css';

const SalesChart = () => {
    const [timeRange, setTimeRange] = useState('7days');

    // Mock data - replace with actual API data
    const data = [
        { date: '2024-11-08', sales: 4500, orders: 45 },
        { date: '2024-11-09', sales: 5200, orders: 52 },
        { date: '2024-11-10', sales: 4800, orders: 48 },
        { date: '2024-11-11', sales: 6100, orders: 61 },
        { date: '2024-11-12', sales: 5900, orders: 59 },
        { date: '2024-11-13', sales: 6800, orders: 68 },
        { date: '2024-11-14', sales: 7200, orders: 72 }
    ];

    const timeRanges = [
        { value: '7days', label: 'Last 7 Days' },
        { value: '30days', label: 'Last 30 Days' },
        { value: '90days', label: 'Last 90 Days' },
        { value: '12months', label: 'Last 12 Months' }
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className={styles.tooltipDate}>{formatDate(label)}</p>
                    <p className={styles.tooltipSales}>
                        Sales: {formatCurrency(payload[0].value)}
                    </p>
                    <p className={styles.tooltipOrders}>
                        Orders: {payload[1].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className={styles.salesCard}>
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <CardTitle className="text-xl font-bold">Sales Overview</CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                                {range.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={formatDate}
                                stroke="#888888"
                            />
                            <YAxis 
                                yAxisId="left"
                                tickFormatter={formatCurrency}
                                stroke="#888888"
                            />
                            <YAxis 
                                yAxisId="right" 
                                orientation="right"
                                stroke="#888888"
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="sales"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                                name="Sales"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="orders"
                                stroke="#16a34a"
                                strokeWidth={2}
                                dot={false}
                                name="Orders"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.summaryStats}>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Sales</span>
                        <span className={styles.statValue}>
                            {formatCurrency(data.reduce((sum, item) => sum + item.sales, 0))}
                        </span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Total Orders</span>
                        <span className={styles.statValue}>
                            {data.reduce((sum, item) => sum + item.orders, 0)}
                        </span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statLabel}>Avg. Order Value</span>
                        <span className={styles.statValue}>
                            {formatCurrency(
                                data.reduce((sum, item) => sum + item.sales, 0) / 
                                data.reduce((sum, item) => sum + item.orders, 0)
                            )}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SalesChart;