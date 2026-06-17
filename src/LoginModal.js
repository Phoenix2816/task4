import React, { useState } from "react";

const LoginModal = ({ onLogin, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        info: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            if (isLogin) {

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        data.message ||
                        "Login failed"
                    );
                }

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                onLogin(data.user);

                window.dispatchEvent(
                    new CustomEvent("userChanged")
                );

                onClose();

            } else {

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/register`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name: formData.name,
                            info: formData.info,
                            email: formData.email,
                            password: formData.password
                        })
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                        data.message ||
                        "Registration failed"
                    );
                }

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                onLogin(data.user);

                window.dispatchEvent(
                    new CustomEvent("userChanged")
                );

                setSuccess(
                    "Account created successfully. Please verify your email."
                );

                setFormData({
                    name: "",
                    info: "",
                    email: "",
                    password: ""
                });

                onClose();
            }

        } catch (err) {

            setError(
                err.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2>
                    {isLogin ? "Login" : "Register"}
                </h2>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <textarea
                                name="info"
                                placeholder="Information about yourself (optional)"
                                value={formData.info}
                                onChange={handleChange}
                                rows="4"
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div
                            style={{
                                color: "red",
                                marginTop: "10px"
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {success && (
                        <div
                            style={{
                                color: "green",
                                marginTop: "10px"
                            }}
                        >
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : isLogin
                            ? "Login"
                            : "Register"}
                    </button>

                </form>

                <p>
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </p>

                <button
                    type="button"
                    onClick={() =>
                        setIsLogin(prev => !prev)
                    }
                >
                    {isLogin
                        ? "Create Account"
                        : "Login Instead"}
                </button>

            </div>
        </div>
    );
};

export default LoginModal;