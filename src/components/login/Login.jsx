import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore .js";
import logo from "./logo.png";

const Login = ({ onLoginSuccess, onSwitchToRegister }) => {
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
            // Note: toast isn't imported or defined in the original code
            // toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex gap-12 items-center box-border">
            <div className="flex flex-col items-center gap-5 border-b-0">
                <form 
                    onSubmit={handleLogin}
                    className="flex flex-col items-center justify-center gap-5 w-full md:w-4/5 bg-white rounded-2xl p-5 text-black"
                >
                    <h2 className="text-[rgb(171,59,45)]">Welcome back!</h2>
                    <input 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        required 
                        className="border-none outline-none p-5 pl-8 bg-[rgba(17,25,40,0.6)] text-white rounded-full w-4/5 box-border placeholder-white placeholder-opacity-100"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        required 
                        className="border-none outline-none p-5 pl-8 bg-[rgba(17,25,40,0.6)] text-white rounded-full w-4/5 box-border placeholder-white placeholder-opacity-100"
                    />
                    <button 
                        disabled={loading}
                        className="w-3/5 p-5 border-none bg-[#1f8ef1] rounded-full text-white cursor-pointer font-light disabled:bg-[#1f8ff1a9] disabled:cursor-not-allowed"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                    <button 
                        type="button"
                        onClick={onSwitchToRegister}
                        className="font-sans text-base bg-transparent border-none outline-none text-[rgb(171,59,45)]"
                    >
                        Don't have an account? Register here
                    </button>
                </form>
            </div>

            <div className="hidden md:flex flex-col items-center w-full h-full bg-white">
                <img 
                    src={logo} 
                    alt="Talkie Logo" 
                    className="h-[200px] w-[200px] filter drop-shadow-lg" 
                />
                <div className="mt-[30vh] text-[rgb(171,59,45)] text-center">
                    <h1>Talkie your best chatting <br /> experience.</h1>
                </div>
                <div className="flex justify-between w-full text-[rgb(171,59,45)] p-5 box-border mt-24">
                    <span>PromCode</span>
                    <span>copyright 2024</span>
                </div>
            </div>
        </div>
    );
};

export default Login;