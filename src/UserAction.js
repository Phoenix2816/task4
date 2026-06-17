import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const UserAction = ({ selectedUsers, setSelectedUsers }) => {
    const { users, setUsers } = useContext(UserContext);

    const [currentUser, setCurrentUser] = useState(null);
    const refreshCurrentUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!res.ok) return;

            const user = await res.json();

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            setCurrentUser(user);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        refreshCurrentUser();

        const interval = setInterval(
            refreshCurrentUser,
            5000
        );

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const user = localStorage.getItem("user");

        if (user) {
            setCurrentUser(JSON.parse(user));
        }

        const refreshUser = () => {
            const updated = localStorage.getItem("user");

            if (updated) {
                setCurrentUser(JSON.parse(updated));
            } else {
                setCurrentUser(null);
            }
        };

        window.addEventListener("userChanged", refreshUser);

        return () =>
            window.removeEventListener(
                "userChanged",
                refreshUser
            );
    }, []);

    const authFetch = (url, options = {}) => {
        const token = localStorage.getItem("token");

        return fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
                    ? `Bearer ${token}`
                    : "",
                ...options.headers
            }
        });
    };

    const refreshUsers = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_URL}/users`
        );

        const data = await res.json();

        setUsers(data);
    };

    const blockUsers = async () => {
        await authFetch(
            `${process.env.REACT_APP_API_URL}/users/block`,
            {
                method: "PUT",
                body: JSON.stringify({
                    ids: selectedUsers
                })
            }
        );

        setSelectedUsers([]);
        await refreshUsers();
    };

    const unblockUsers = async () => {
        await authFetch(
            `${process.env.REACT_APP_API_URL}/users/unblock`,
            {
                method: "PUT",
                body: JSON.stringify({
                    ids: selectedUsers
                })
            }
        );

        setSelectedUsers([]);
        await refreshUsers();
    };

    const deleteUsers = async () => {
        await authFetch(
            `${process.env.REACT_APP_API_URL}/users`,
            {
                method: "DELETE",
                body: JSON.stringify({
                    ids: selectedUsers
                })
            }
        );

        setSelectedUsers([]);
        await refreshUsers();
    };

    const deleteUnverified = async () => {
        await authFetch(
            `${process.env.REACT_APP_API_URL}/users/unverified`,
            {
                method: "DELETE"
            }
        );

        await refreshUsers();
    };

    const hasSelected = selectedUsers.length > 0;
    const hasUnverified = users.some( user => user.status === "unverified");
    const isLoggedIn = !!currentUser?.id;
    const isBlocked = currentUser?.is_blocked === 1 || currentUser?.is_blocked === true;
    const canSelectActions = isLoggedIn && !isBlocked && hasSelected;


    return (
        <div>
            {!currentUser && (
                <div
                    style={{
                        color: "gray",
                        marginBottom: "10px"
                    }}
                >
                    Login to see and manage users.
                </div>
            )}

            {isBlocked && (
                <div
                    style={{
                        color: "red",
                        marginBottom: "10px"
                    }}
                >
                    Your account has been blocked.
                </div>
            )}
            <div className="toolbar" style={{marginTop: '10px', display: 'flex', gap: '5px'}}>
                <button 
                    onClick={blockUsers}
                    disabled={!canSelectActions}
                    style={{
                        padding: '5px 10px',
                        cursor: canSelectActions ? 'pointer' : 'not-allowed',
                        opacity: canSelectActions ? 1 : 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "none",
                        color: "blue",
                        border: "1px solid blue",
                        textAlign: "center",
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="25px" viewBox="0 0 24 24" fill="blue">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V14C11.25 13.5858 11.5858 13.25 12 13.25Z" fill="blue"/>
                    </svg>
                    Block
                </button>

                <button 
                    onClick={unblockUsers}
                    disabled={!canSelectActions}
                    style={{
                        cursor: canSelectActions ? 'pointer' : 'not-allowed',
                        opacity: canSelectActions ? 1 : 0.5,
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="25px" viewBox="0 0 24 24" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C9.10051 2.75 6.75 5.10051 6.75 8V10.0036C7.13301 10 7.54849 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.1463 1.25 17.788 3.4019 18.5373 6.31306C18.6405 6.7142 18.3991 7.12308 17.9979 7.22633C17.5968 7.32957 17.1879 7.08808 17.0846 6.68694C16.5018 4.42242 14.4453 2.75 12 2.75ZM12.75 14C12.75 13.5858 12.4142 13.25 12 13.25C11.5858 13.25 11.25 13.5858 11.25 14V18C11.25 18.4142 11.5858 18.75 12 18.75C12.4142 18.75 12.75 18.4142 12.75 18V14Z" fill="blue"/>
                    </svg>
                </button>

                <button 
                    onClick={deleteUsers}
                    disabled={!canSelectActions}
                    style={{
                        cursor: canSelectActions ? 'pointer' : 'not-allowed',
                        opacity: canSelectActions ? 1 : 0.5,
                        borderColor: "red"
                    }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                        <path fill="red" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                </button>

                <button 
                    onClick={deleteUnverified}
                    disabled={!canSelectActions || !hasUnverified}
                    style={{
                        cursor: canSelectActions && hasUnverified ? 'pointer' : 'not-allowed',
                        opacity: canSelectActions && hasUnverified ? 1 : 0.5,
                        borderColor: "red"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V12" stroke="red" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M17 16L19 18M21 20L19 18M19 18L21 16M19 18L17 20" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default UserAction;
