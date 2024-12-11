// src/routes/clientRoutes.js
import React from 'react';
import Home from '@/pages/client/Home';
import About from '@/pages/client/About';
import Contact from '@/pages/client/Contact';
import Shop from '@/pages/client/Shop';
import Products from '@/pages/client/Products';
import Cart from '@/pages/client/Cart';
import Checkout from '@/pages/client/Checkout';
import Account from '@/pages/client/Account';
import NotFound from '@/pages/client/NotFound';
import ProtectedRoute from '@/routes/protectedRoute';

const clientRoutes = [
    {
        path: '/',
        element: <Home />,
        exact: true, // Home page
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/shop',
        element: <Shop />,
    },
    {
        path: '/products/:id',
        element: <Products />,
    },
    {
        path: '/cart',
        element: (
            <ProtectedRoute>
                <Cart />
            </ProtectedRoute>
        ),
    },
    {
        path: '/checkout',
        element: (
            <ProtectedRoute>
                <Checkout />
            </ProtectedRoute>
        ),
    },
    {
        path: '/account/*',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />, // Handle 404
    },
];

export default clientRoutes;
