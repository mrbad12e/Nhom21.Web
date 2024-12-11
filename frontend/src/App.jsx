// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Login from '@/pages/client/Login';
import adminRoutes from '@/routes/adminRoutes';
import clientRoutes from '@/routes/clientRoutes';
import { AuthProvider, useAuth } from '@/context/AuthContext';

const App = () => {
    const renderRoutes = (routes) => {
        return routes.map((route) => (
            <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact}
            />
        ));
    };

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Client routes wrapped by DefaultLayout */}
                    <Route path="/" element={<DefaultLayout />}>
                        {renderRoutes(clientRoutes)}
                    </Route>

                    {/* Login route */}
                    <Route path="/login" element={<Login />} />

                    {/* Admin routes */}
                    {renderRoutes(adminRoutes)}
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
