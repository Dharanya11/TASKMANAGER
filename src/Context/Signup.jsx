// import React, { useState } from "react";
// import axios from "axios";

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//     });

//     const [message, setMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
//             setMessage(res.data.message);
//         } catch (err) {
//             setMessage(err.response?.data?.message || "Something went wrong");
//         }
//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
//             <h2>Signup</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                 /><br /><br />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 /><br /><br />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 /><br /><br />
//                 <button type="submit">Signup</button>
//             </form>
//             <p>{message}</p>
//         </div>
//     );
// };

// export default Signup;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reusing same styles

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Signup successful! Redirecting to login...");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(data.message || "Signup failed");
            }
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Signup</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="login-input"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="login-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login-input"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="login-button">Signup</button>
            </form>

            {message && <p className="login-message">{message}</p>}

            <button
                className="signup-button"
                onClick={() => navigate("/login")}
            >
                Back to Login
            </button>
        </div>
    );
}

export default Signup;

