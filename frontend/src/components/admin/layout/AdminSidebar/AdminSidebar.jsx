import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    ListOrdered,
    LogOut,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';
import { API_URL } from '@/utils/constants';
import axios from 'axios';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ListOrdered, label: 'Orders', path: '/admin/orders' },
    { icon: ShoppingCart, label: 'Products', path: '/admin/products' },
];

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        try {
            await api.get('/admin/auth/logout');
            localStorage.removeItem('profile');
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className={cn(styles.sidebar, isCollapsed ? styles.collapsed : '')}>
            <div className={styles.header}>
                <div 
                    className={cn(
                        styles.logo, 
                        'flex items-center space-x-2', 
                        isCollapsed && 'justify-center'
                    )}
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ cursor: 'pointer' }}
                >
                    {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className={styles.collapseBtn}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </Button>
            </div>

            <nav className={styles.nav}>
                {menuItems.map((item) => (
                    <Button
                        key={item.path}
                        variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                        className={cn(
                            styles.navItem,
                            'w-full justify-start',
                            isCollapsed && 'justify-center',
                            location.pathname === item.path && 'bg-secondary'
                        )}
                        onClick={() => handleNavigation(item.path)}
                    >
                        <item.icon 
                            size={20} 
                            className={cn(
                                'mr-2',
                                isCollapsed && 'mr-0',
                                location.pathname === item.path && 'text-secondary-foreground'
                            )} 
                        />
                        {!isCollapsed && (
                            <span className={cn(
                                location.pathname === item.path && 'text-secondary-foreground'
                            )}>
                                {item.label}
                            </span>
                        )}
                    </Button>
                ))}
            </nav>

            <div className={styles.footer}>
                <Button
                    variant="ghost"
                    className={cn(
                        styles.logoutBtn,
                        'w-full justify-start',
                        isCollapsed && 'justify-center'
                    )}
                    onClick={handleLogout}
                >
                    <LogOut size={20} className={cn('mr-2', isCollapsed && 'mr-0')} />
                    {!isCollapsed && <span>Logout</span>}
                </Button>
            </div>
        </div>
    );
};

export default AdminSidebar;