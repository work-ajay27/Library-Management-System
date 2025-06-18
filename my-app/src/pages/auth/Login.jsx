import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const user = res.data;
      console.log("User from API:", user); // ✅ Debug log
      alert(`Login successful as ${user.role}`);

      localStorage.setItem("user", JSON.stringify(user));

      const role = user.role?.toUpperCase(); // ✅ Normalize role safely

      if (role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (role === "STUDENT") {
        navigate("/student-dashboard");
      } else {
        alert("Unknown role: " + role); // ✅ Show actual value if unexpected
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-3">Welcome Back 👋</h2>
        <p className="text-center text-muted mb-4">Please login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <p className="mt-3 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-decoration-none">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
