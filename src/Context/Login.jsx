import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Login successful!");
                setToken(data.token);

                // Save token in localStorage
                localStorage.setItem("token", data.token);

                onLogin();
                navigate("/TaskDashboard"); // ✅ keep consistent with your App.jsx
            } else {
                setMessage(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
        }
    };

    return (
        
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="login-button">Login</button>
                            <button
                className="login-button"
                onClick={() => navigate("/signup")}
            >
                Signup
            </button>
            </form>

            {message && <p className="login-message">{message}</p>}
            {token && <p className="login-token">Your token: {token.slice(0, 20)}...</p>}
        </div>
    );
}

export default Login;
