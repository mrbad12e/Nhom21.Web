import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Home from '@/pages/client/Home';
import About from '@/pages/client/About';
import Login from '@/pages/client/Login';
import NotFound from '@/pages/client/NotFound';
import Contact from '@/pages/client/Contact';
import Shop from '@/pages/client/Shop';
import Products from '@/pages/client/Products';
import Cart from "@/pages/client/Cart";
import adminRoutes from './routes/adminRoutes';

const App = () => {
    const renderRoutes = (routes) => {
        return routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element}>
                {route.children &&
                    route.children.map((childRoute) => (
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
                {/* Routes bọc bởi DefaultLayout */}
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/products/:id" element={<Products />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cart" element={<Cart />} />
                </Route>
                <Route path="/login" element={<Login />} />
                {renderRoutes(adminRoutes)}
            </Routes>
        </BrowserRouter>
    );
};

export default App;
