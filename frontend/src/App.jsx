import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import adminRoutes from './routes/adminRoutes';

const App = () => {
    const renderRoutes = (routes) => {
        return routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
                {route.children && route.children.map((childRoute) => (
                    <Route
                        key={childRoute.path || 'index'}
                        index={childRoute.index}
                        path={childRoute.path}
                        element={childRoute.element}
                    >
                        {childRoute.children && renderRoutes(childRoute.children)}
                    </Route>
                ))}
            </Route>
        ));
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {renderRoutes(adminRoutes)}
            </Routes>
        </BrowserRouter>
    );
};

export default App;