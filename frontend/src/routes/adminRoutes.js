// adminRoutes.js
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { Dashboard } from '@/pages/admin/Dashboard';
import { Navigate, Outlet } from 'react-router-dom';
import { OrderDetails } from '@/pages/admin/Orders/OrderDetails';
import { ProductList } from '@/pages/admin/Products/ProductList';
import { AddProduct } from '@/pages/admin/Products/AddProduct';
import { EditProduct } from '@/pages/admin/Products/EditProduct';
import { UserList } from '@/pages/admin/Users/UserList';
import { UserDetails } from '@/pages/admin/Users/UserDetails';
import { OrderList } from '@/pages/admin/Orders/OrderList';

const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout><Outlet /></AdminLayout>,
        children: [
            {
                path: '',
                element: <Navigate to="dashboard" replace />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            // Products routes
            {
                path: 'products',
                element: <Outlet />,
                children: [
                    {
                        path: '',
                        element: <ProductList />
                    },
                    {
                        path: 'add',
                        element: <AddProduct />
                    },
                    {
                        path: 'edit/:id',
                        element: <EditProduct />
                    }
                ]
            },
            // Orders routes
            {
                path: 'orders',
                element: <Outlet />,
                children: [
                    {
                        path: '',
                        element: <OrderList />
                    },
                    {
                        path: ':id',
                        element: <OrderDetails />
                    }
                ]
            },
            // Users routes
            {
                path: 'users',
                element: <Outlet />,
                children: [
                    {
                        path: '',
                        element: <UserList />
                    },
                    {
                        path: 'new',
                        element: <UserDetails />
                    },
                    {
                        path: ':id/edit',
                        element: <UserDetails />
                    }
                ]
            }
        ]
    }
];

export default adminRoutes;