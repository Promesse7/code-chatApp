import React from 'react';
import logo from './logo.png'; // Ensure this path is correct
import userAvatar from './images.jpeg'; // Ensure this path is correct

const MainView = ({ onGetStarted }) => {
  return (
    <div className="h-[77.5vh] w-[90vw] flex items-center justify-center pl-8 md:pl-16 lg:pl-32 rounded-b-lg bg-white overflow-hidden pt-5 box-border">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col w-full lg:w-[120vw] ml-0 lg:ml-32 pl-0 lg:pl-[4vw]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-5 capitalize text-[rgb(171,59,45)]">
            Start Chatting Anywhere Anytime With Talkie!
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-5 text-[rgb(151,42,27)]">
            Great software application that allows you to chat from any place at any time without any interruption.
          </p>
          <button
            onClick={onGetStarted}
            className="mt-2 mb-2 py-2 px-4 bg-[rgb(171,59,45)] text-white rounded-lg border-none cursor-pointer h-12 text-base sm:text-lg font-semibold w-40 sm:w-48 lg:w-52"
          >
            Get Started
          </button>
          
          <div className="text-[rgb(151,42,27)] flex items-center font-sans">
            <div className="flex mr-2 h-20 w-auto overflow-hidden p-2">
              {[1, 2, 3, 4].map((index) => (
                <img
                  key={index}
                  src={userAvatar}
                  alt={`User ${index}`}
                  className="w-12 h-12 rounded-full border-4 border-white -mr-5 object-cover shadow-md"
                />
              ))}
            </div>
            
            <div className="p-0 gap-5 text-[rgb(151,42,27)] flex">
              <div className="flex flex-col">
                <p className="text-[rgb(151,42,27)] font-bold text-xl -ml-10">3933</p>
                <p className="text-[rgb(151,42,27)] text-sm font-normal -mt-4">Happy Customers</p>
              </div>
              
              <div className="text-[rgb(151,42,27)] text-sm flex flex-col items-center">
                <span className="text-[rgb(151,42,27)] font-bold text-xl mr-1">4.9/5</span>
                <div className="text-yellow-400 text-sm ml-1">
                  ★★★★★ <span className="text-[rgb(151,42,27)]">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center flex-col gap-2 mt-8 mb-8 w-full lg:w-auto h-full relative">
          <img
            src={logo}
            alt="Talkie Logo"
            className="w-full h-full object-cover rounded-lg translate-x-0 lg:translate-x-24"
          />
          
          <TestimonialCard 
            name="Elon Musk" 
            text="One of the best chatting apps ever." 
            avatar={userAvatar}
            className="absolute -translate-x-52 -translate-y-40 hidden md:flex"
          />
          
          <TestimonialCard 
            name="Bill Gates" 
            text="The best chatting app." 
            avatar={userAvatar}
            className="absolute -translate-x-[460px] translate-y-24 hidden md:flex"
          />
          
          <TestimonialCard 
            name="H. JD" 
            text="Talkie is the best!" 
            avatar={userAvatar}
            className="absolute -translate-x-[250px] translate-y-24 hidden md:flex"
          />
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, text, avatar, className }) => {
  return (
    <div className={`flex items-center bg-white rounded-lg p-3 shadow-md w-72 h-14 ${className}`}>
      <img 
        src={avatar} 
        alt={`${name}'s avatar`} 
        className="w-10 h-10 rounded-full object-cover mr-3"
      />
      <div className="flex-grow">
        <h3 className="font-sans text-sm font-bold m-0 mb-1 text-black">
          {name}
        </h3>
        <p className="font-sans text-xs text-gray-500 m-0 w-full break-normal">
          {text}
        </p>
      </div>
    </div>
  );
};

export default MainView;