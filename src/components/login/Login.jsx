import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore .js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.png"

import "./login.css";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
    const [loading, setLoading] = useState(false);
    const { setCurrentUser, initializeAuth } = useChatStore();

    useEffect(() => {
        const unsubscribe = initializeAuth();
        return () => unsubscribe();
    }, [initializeAuth]);

    useEffect(() => {
        const text = document.querySelector(".sec-text");

        const textLoad = () => {
            if (text) {
                setTimeout(() => {
                    text.textContent = "Relax.";
                }, 0);
                setTimeout(() => {
                    text.textContent = "Be happy.";
                }, 4000);
                setTimeout(() => {
                    text.textContent = "Welcome.";
                }, 8000);
            }
        };

        textLoad();
        const interval = setInterval(textLoad, 12000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);


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
                <form action="" onSubmit={handleLogin}>
                <h2>Welcome back!</h2>
                    <input type="text" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>

                    <button className="switch" onClick={onSwitchToRegister}>Don't have an account? Register here</button>
                </form>
                
            </div>
            <hr className="sep"/>

            <div className="attract">
            <img src={logo} alt="" />
            <div className="descri">

            <section className="type">

                 <div className="typeContainer">
                         <span className="text first-text">Talkie &gt; &gt; </span>
                         <span className="text sec-text"></span>
                 </div>
    
            </section>
                 <h1>Talkie your best chatting <br /> experience.</h1>
            </div>
            <div className="foot">
                <span>PromCode</span>
                <span>copyright 2024</span>
            </div>
            </div>
        </div>
    );
};

export default Login;
