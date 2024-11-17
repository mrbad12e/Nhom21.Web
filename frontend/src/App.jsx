import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Home from "@/pages/client/Home";
import About from "@/pages/client/About";
import Login from "@/pages/client/Login";
// import Register from "@/pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes bọc bởi DefaultLayout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>

        {/* Routes không bọc bởi DefaultLayout */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
