import React, { useState } from "react";
import LoginModal from "./LoginModal";

const Nav = () => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <header>
                <h2>User Management</h2>

                {user ? (
                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center"
                        }}
                    >
                        <span>
                            {user.name} {user.surname}
                        </span>

                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");

                                setUser(null);

                                window.dispatchEvent(
                                    new CustomEvent("userChanged")
                                );
                            }}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowModal(true)}
                    >
                        Login
                    </button>
                )}
            </header>

            {showModal && (
                <LoginModal
                    onLogin={setUser}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Nav;