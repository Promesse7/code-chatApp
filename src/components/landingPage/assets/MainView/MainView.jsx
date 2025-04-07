import React from 'react';
import logo from './logo.png'; // Ensure this path is correct
import userAvatar from './images.jpeg'; // Ensure this path is correct

const MainView = ({ onGetStarted }) => {
  return (
    <div className="h-[60vh] overflow-hidden w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 overflow-hidden py-2 px-4 sm:px-2 md:px-16 lg:px-32 box-border">
      <div className="flex flex-col lg:flex-row items-center justify-between h-[90vh] w-full max-w-7xl ">
        {/* Left Section: Text, Button, and Stats */}
        <div className="flex flex-col w-full lg:w-1/2 space-y-2 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[rgb(171,59,45)] leading-tight">
            Start Chatting Anywhere, Anytime with Talkie!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[rgb(151,42,27)] font-light">
            A seamless chatting app that connects you from any place, at any time, without interruptions.
          </p>
          <button
            onClick={onGetStarted}
            className="mt-4 py-3 px-6 bg-[rgb(171,59,45)] text-white rounded-lg shadow-md hover:bg-[rgb(151,42,27)] transition-colors duration-300 text-lg font-semibold w-48 mx-auto lg:mx-0"
          >
            Get Started
          </button>

          {/* Customer Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-[rgb(151,42,27)] mt-6">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((index) => (
                  <img
                    key={index}
                    src={userAvatar}
                    alt={`User ${index}`}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                  />
                ))}
              </div>
              <div>
                <p className="text-xl font-bold">3,933</p>
                <p className="text-sm">Happy Customers</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">4.9/5</span>
              <div className="flex items-center text-yellow-400 text-sm">
                ★★★★★ <span className="text-[rgb(151,42,27)] ml-1">Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Logo and Testimonials */}
        <div className="relative flex flex-col items-center w-full lg:w-1/2 py-4">
          <img
            src={logo}
            alt="Talkie Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 mb-8"
          />

          {/* Testimonial Cards */}
          <TestimonialCard
            name="Elon Musk"
            text="One of the best chatting apps ever."
            avatar={userAvatar}
            className="absolute top-0 left-0 sm:-left-20 lg:left-32 hidden md:flex bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-xs"
          />
          <TestimonialCard
            name="Bill Gates"
            text="The best chatting app."
            avatar={userAvatar}
            className="absolute bottom-0 left-0 sm:-left-16 lg:-left-8 hidden md:flex bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-xs"
          />
          <TestimonialCard
            name="H. JD"
            text="Talkie is the best!"
            avatar={userAvatar}
            className="absolute bottom-0 right-0 sm:-right-16 lg:-right-4 hidden md:flex bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 max-w-xs"
          />
        </div>
      </div>
    </div>
  );
};

// TestimonialCard Component
const TestimonialCard = ({ name, text, avatar, className }) => {
  return (
    <div className={`flex items-center gap-3 max-w-xs ${className}`}>
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
      />
      <div>
        <h3 className="text-base font-semibold text-gray-800">{name}</h3>
        <p className="text-xs text-gray-600 italic">"{text}"</p>
      </div>
    </div>
  );
};

export default MainView;