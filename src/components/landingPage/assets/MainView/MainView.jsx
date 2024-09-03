import React from "react";
import logo from "./logo.png";
import user from "./images.jpeg";

const MainView = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 bg-white overflow-hidden rounded-b-lg">
      <div className="w-full lg:w-1/2 flex flex-col space-y-6 lg:space-y-8 mb-8 lg:mb-0">
        <h1 className="text-3xl lg:text-5xl font-semibold capitalize text-[#AB3B2D] text-center lg:text-left">
          Start Chatting Anywhere Anytime With Talkie!
        </h1>
        <p className="text-lg lg:text-xl font-normal text-[#972A1B] text-center lg:text-left">
          Great software application that allows you to chat from any place at
          any time without any interruption.
        </p>
        <button
          className="py-3 px-6 bg-[#AB3B2D] text-white rounded-lg text-lg font-semibold w-full max-w-xs mx-auto lg:mx-0"
          onClick={onGetStarted}
        >
          Get Started
        </button>

        <div className="flex flex-col lg:flex-row items-center text-[#972A1B] font-sans space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((index) => (
              <img
                key={index}
                src={user}
                alt={`User ${index}`}
                className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-md"
              />
            ))}
          </div>
          <div className="flex space-x-6 text-[#972A1B]">
            <div className="text-center lg:text-left">
              <p className="text-[#972A1B] font-bold text-2xl">3933</p>
              <p className="text-[#972A1B] text-sm">Happy Customers</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-[#972A1B] font-bold text-2xl">4.9/5</p>
              <div className="text-yellow-400 text-sm">
                ★★★★★ <span className="text-[#972A1B]">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
        <img
          src={logo}
          alt="Talkie Logo"
          className="w-full h-auto object-contain rounded-lg"
        />

        {/* Testimonials */}
        <div className="absolute top-0 right-0 bg-white rounded-lg shadow-md p-3 w-48 lg:w-64 -translate-y-1/4 translate-x-1/4">
          <div className="flex items-center">
            <img
              src={user}
              alt="Elon Musk"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-sm font-bold text-black">
                Elon Musk
              </h3>
              <p className="font-sans text-xs text-gray-600 break-words">
                One of the best chatting apps ever.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 bg-white rounded-lg shadow-md p-3 w-48 lg:w-64 translate-y-1/4 -translate-x-1/4">
          <div className="flex items-center">
            <img
              src={user}
              alt="Bill Gates"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-sm font-bold text-black">
                Bill Gates
              </h3>
              <p className="font-sans text-xs text-gray-600 break-words">
                The best chatting app.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 bg-white rounded-lg shadow-md p-3 w-48 lg:w-64 translate-y-1/4 translate-x-1/4">
          <div className="flex items-center">
            <img
              src={user}
              alt="User"
              className="w-10 h-10 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-sm font-bold text-black">
                H. JD
              </h3>
              <p className="font-sans text-xs text-gray-600 break-words">
                Talkie is the best!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainView;