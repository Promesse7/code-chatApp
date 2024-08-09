import "./login.css";
import profile from "./rp.png";
import Upload from "../lib/upload.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore .js";


const Login = ({ onLoginSuccess }) => {
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [loading, setLoading] = useState(false);
    const { setCurrentUser, initializeAuth } = useChatStore();

    useEffect(() => {
        const unsubscribe = initializeAuth();
        return () => unsubscribe();
    }, [initializeAuth]);

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

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

    const handleRegister = async e => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formData);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            let imgUrl = profile;

            if (avatar.file) {
                try {
                    // Pass the user ID to the Upload function
                    imgUrl = await Upload(avatar.file, res.user.uid);
                } catch (uploadError) {
                    console.log(uploadError);
                    toast.error("Failed to upload avatar. Using default image.");
                }
            }

            const userData = {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            };

            await setDoc(doc(db, "users", res.user.uid), userData);

            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });

            setCurrentUser(userData);
            toast.success("Account created! You are now logged in.");
            onLoginSuccess(); 
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
            </div>

            <div className="separator"></div>
            <div className="item">
                <h2>Create an account!</h2>

                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || profile} alt="Profile" />
                        Upload an image
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" required />
                    <input type="email" placeholder="Email" name="email" required />
                    <input type="password" placeholder="Password" name="password" required />
                    <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
