import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
    TrendingUp, 
    TrendingDown,
    Users,
    ShoppingCart,
    DollarSign,
    Package
} from "lucide-react";
import styles from './StatsCards.module.css';

const StatsCards = () => {
    // Mock data - replace with actual API data
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            description: "Revenue this month",
            color: "text-blue-600",
            background: "bg-blue-50"
        },
        {
            title: "New Orders",
            value: "356",
            change: "+12.5%",
            trend: "up",
            icon: ShoppingCart,
            description: "Orders this month",
            color: "text-green-600",
            background: "bg-green-50"
        },
        {
            title: "Active Customers",
            value: "2,453",
            change: "-3.2%",
            trend: "down",
            icon: Users,
            description: "Active users this month",
            color: "text-purple-600",
            background: "bg-purple-50"
        },
        {
            title: "Products Stock",
            value: "126",
            change: "+6.3%",
            trend: "up",
            icon: Package,
            description: "Low stock products",
            color: "text-orange-600",
            background: "bg-orange-50"
        }
    ];

    const TrendIcon = ({ trend }) => {
        if (trend === "up") {
            return <TrendingUp className="h-4 w-4 text-green-600" />;
        }
        return <TrendingDown className="h-4 w-4 text-red-600" />;
    };

    return (
        <div className={styles.statsGrid}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index} className={styles.statsCard}>
                        <CardContent>
                            <div className={styles.cardHeader}>
                                <div className={`${styles.iconWrapper} ${stat.background}`}>
                                    <Icon className={`${styles.icon} ${stat.color}`} />
                                </div>
                                <div className={styles.trendWrapper}>
                                    <TrendIcon trend={stat.trend} />
                                    <span className={stat.trend === "up" ? styles.trendUp : styles.trendDown}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.valueWrapper}>
                                    <h3 className={styles.value}>{stat.value}</h3>
                                    <p className={styles.title}>{stat.title}</p>
                                </div>
                                <p className={styles.description}>{stat.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
};

export default StatsCards;