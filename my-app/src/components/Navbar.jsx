import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
