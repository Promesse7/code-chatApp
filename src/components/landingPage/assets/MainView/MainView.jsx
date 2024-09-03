import React from 'react';
import logo from './logo.png'; // Ensure this path is correct
import userAvatar from './images.jpeg'; // Ensure this path is correct

const MainView = ({ onGetStarted }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-white overflow-hidden">
      <div className="w-full h-full max-w-7xl flex flex-col lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 lg:space-y-6 mb-4 lg:mb-0 lg:pr-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-[#AB3B2D] text-center lg:text-left">
            Start Chatting Anywhere Anytime With Talkie!
          </h1>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[#972A1B] text-center lg:text-left">
            Great software application that allows you to chat from any place at any time without any interruption.
          </p>
          <button
            onClick={onGetStarted}
            className="py-2 px-4 bg-[#AB3B2D] text-white rounded-lg text-base sm:text-lg font-semibold w-full max-w-xs mx-auto lg:mx-0"
          >
            Get Started
          </button>
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex -space-x-2 sm:-space-x-4">
              {[1, 2, 3].map((index) => (
                <img
                  key={index}
                  src={userAvatar}
                  alt={`User ${index}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white object-cover shadow-md"
                />
              ))}
            </div>
            <div className="flex space-x-4 text-[#972A1B]">
              <div className="text-center lg:text-left">
                <p className="font-bold text-lg sm:text-xl lg:text-2xl">3933</p>
                <p className="text-xs sm:text-sm">Happy Customers</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="font-bold text-lg sm:text-xl lg:text-2xl">4.9/5</p>
                <div className="text-yellow-400 text-xs sm:text-sm">
                  ★★★★★ <span className="text-[#972A1B]">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full">
          <img
            src={logo}
            alt="Talkie Logo"
            className="w-full h-full object-contain"
          />
          <Testimonial
            name="Elon Musk"
            text="One of the best chatting apps ever."
            className="top-0 right-0 -translate-y-1/4 translate-x-1/4"
          />
          <Testimonial
            name="Bill Gates"
            text="The best chatting app."
            className="bottom-0 left-0 translate-y-1/4 -translate-x-1/4"
          />
          <Testimonial
            name="H. JD"
            text="Talkie is the best!"
            className="bottom-0 right-0 translate-y-1/4 translate-x-1/4"
          />
        </div>
      </div>
    </div>
  );
};

const Testimonial = ({ name, text, className }) => (
  <div className={`absolute bg-white rounded-lg shadow-md p-2 w-32 sm:w-40 lg:w-48 xl:w-64 ${className} hidden sm:block`}>
    <div className="flex items-center">
      <img
        src={userAvatar}
        alt={name}
        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover mr-2"
      />
      <div>
        <h3 className="font-sans text-xs sm:text-sm font-bold text-black">{name}</h3>
        <p className="font-sans text-xs text-gray-600 break-words hidden sm:block">{text}</p>
      </div>
    </div>
  </div>
);

export default MainView;