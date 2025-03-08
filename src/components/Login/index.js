import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // Can be email or username
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]); // Store users from API
  const navigate = useNavigate();

  // Fetch user data when the component loads
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    setError("");

    // Find user by email OR username
    const user = users.find(
      (u) => (u.email === identifier || u.username === identifier) && u.password === password
    );

    if (user) {
      localStorage.setItem("token", "authenticated"); // Simulating login
      localStorage.setItem("store", user.store); // Store owner-specific access
      navigate("/"); // Redirect to dashboard
    } else {
      setError("Invalid username/email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-heading">E-Commerce Portal</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label>Username or Email</label>
            <input
              type="text"
              placeholder="Enter username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
