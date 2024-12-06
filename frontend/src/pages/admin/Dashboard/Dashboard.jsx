import React from 'react';
import { StatsCards } from '@/components/admin/dashboard/StatsCards';
import { SalesChart } from '@/components/admin/dashboard/SalesChart';
import { RecentOrders } from '@/components/admin/dashboard/RecentOrders';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return (
        <div className={styles.container}>
            {/* Stats Overview */}
            <section className={styles.statsSection}>
                <StatsCards />
            </section>

            {/* Sales Chart */}
            <section className={styles.chartSection}>
                <SalesChart />
            </section>

            {/* Recent Orders */}
            <section className={styles.ordersSection}>
                <RecentOrders />
            </section>
        </div>
    );
};

export default Dashboard;