import './Navbar.css';
import React from 'react';
import logo from "./logo.png"

const Navbar = ({onGetStarted}) => {
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">
                    <img src={ logo } alt="" />
                </span>
                <span className="slogan">
                {/* Transforming Chats into Connections */}
                </span>
                <div className="navItems">
                    <button className="navButton" onClick={onGetStarted}>Register</button>
                    <button className="navButton" onClick={onGetStarted}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar