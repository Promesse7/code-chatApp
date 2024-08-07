import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { useChatStore } from "../lib/chatStore .js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import profile from "./rp.png";
import logo from "./logo.png"
import Upload from "../lib/upload.js";
import './Register.css';

const Register = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [avatar, setAvatar] = useState({ file: null, url: "" });
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useChatStore();

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

    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
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
            await setDoc(doc(db, "userchats", res.user.uid), { chats: [] });

            setCurrentUser(userData);
            toast.success("Account created! You are now logged in.");
            onRegisterSuccess();
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register">
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

            <hr className="sep"/>

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
                    <button  className="register" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
                    <button className="switch" onClick={onSwitchToLogin}>Already have an account? Login here</button>
                </form>
                
            </div>
        </div>
    );
};

export default Register;
