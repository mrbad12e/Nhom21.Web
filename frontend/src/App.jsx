import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/client/Home";
import About from "@/pages/client/About";
import Login from "@/pages/client/Login";
import NotFound from "@/pages/client/NotFound";
import Contact from "@/pages/client/Contact";
// import Register from "@/pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes bọc bởi DefaultLayout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Routes không bọc bởi DefaultLayout */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
