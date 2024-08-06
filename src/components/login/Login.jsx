import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "./rp.png";
import Upload from "../lib/upload.js";
import "./login.css";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [loading, setLoading] = useState(false);
    const { setCurrentUser, initializeAuth } = useChatStore();

    useEffect(() => {
        const unsubscribe = initializeAuth();
        return () => unsubscribe();
    }, [initializeAuth]);

    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            if (userDoc.exists()) {
                setCurrentUser(userDoc.data());
                onLoginSuccess();
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back!</h2>
                <form action="" onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
                </form>
                <button onClick={onSwitchToRegister}>Don't have an account? Register here</button>
            </div>
        </div>
    );
};

export default Login;
