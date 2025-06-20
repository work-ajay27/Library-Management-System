import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/auth/AdminDashboard";
import StudentDashboard from "./pages/auth/StudentDashboard";
import RoleRedirect from "./pages/auth/RoleRedirect";
import AddBook from "./pages/AddBook";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleRedirect />} /> {/* ✅ root based on role */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
