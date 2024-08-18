import React from "react";
import logo from "./logo.png";
import user from "./images.jpeg";

const MainVew = ({ onGetStarted }) => {
  return (
    <div className="h-[77.5vh] w-[90vw] flex items-center justify-center pl-[4em] rounded-b-[10px] bg-white overflow-hidden pt-[20px] box-border ">
      <div className="flex flex-col w-[120vw] ml-[4em] ">
        <h1 className="text-[40px] font-semibold mb-[20px] capitalize text-[#AB3B2D]">
          Start Chatting Anywhere Anytime With Talkie!
        </h1>
        <p className="text-[20px] font-normal mb-[20px] text-[#972A1B]">
          Great software application that allows you to chat from any place at
          any time without any interruption.
        </p>
        <button className="mt-[10px] mb-[10px] py-[8px] px-[15px] bg-[#AB3B2D] text-white rounded-[10px] h-[50px] text-[18px] font-semibold w-[200px] onClick={onGetStarted}">
          Get Started
        </button>

        <div className="flex items-center text-[#972A1B] font-sans">
          <div className="flex mr-[10px] h-[80px] w-[15vw] overflow-hidden p-[10px]">
            <img
              src={user}
              alt="User 1"
              className="w-[50px] h-[50px] rounded-full border-4 border-white -mr-[20px] object-cover shadow-md"
            />
            <img
              src={user}
              alt="User 2"
              className="w-[50px] h-[50px] rounded-full border-4 border-white -mr-[20px] object-cover shadow-md"
            />
            <img
              src={user}
              alt="User 3"
              className="w-[50px] h-[50px] rounded-full border-4 border-white -mr-[20px] object-cover shadow-md"
            />
          </div>
          <div className="flex gap-[20px] text-[#972A1B]">
            <div>
              <p className="text-[#972A1B] font-bold text-[20px] -ml-[0px]">
                3933
              </p>
              <p className="text-[#972A1B] text-[15px] font-normal -mt-[0px]">
                Happy&nbsp;Customers
              </p>
            </div>
            <div className="text-[15px] flex flex-col items-center">
              <span className="text-[#972A1B] font-bold text-[20px] mr-[38px]">
                4.9/5
              </span>
              <div className="text-yellow-400 text-[15px] ml-[4px]">
                ★★★★★&nbsp;<span className="text-[#972A1B]">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src={logo}
        alt="Talkie Logo"
        className="w-full h-full object-cover rounded-[10px] translate-x-[100px]"
      />

      <div className="relative w-full h-full">
        

        {/* Elon Musk testimonial */}
        <div className="absolute top-0 right-0 bg-white rounded-lg shadow-md p-2 w-[250px] translate-y-[145%] translate-x-[-70%]">
          <div className="flex items-center">
            <img
              src={user}
              alt="Elon Musk"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-xs font-bold text-black">
                Elon Musk
              </h3>
              <p className="font-sans text-xs text-gray-600 break-words">
                One of the best chatting apps ever.
              </p>
            </div>
          </div>
        </div>

        {/* Bill Gates testimonial */}
        <div className="absolute bottom-0 left-0 bg-white rounded-lg shadow-md p-2 w-[200px] translate-y-[-280%] translate-x-[-35%]">
          <div className="flex items-center">
            <img
              src={user}
              alt="Bill Gates"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-xs font-bold text-black">
                Bill Gates
              </h3>
              <p className="font-sans text-xs text-gray-600 break-words">
                The best chatting app.
              </p>
            </div>
          </div>
        </div>

        {/* Third testimonial (partially visible) */}
        <div className="absolute bottom-0 right-0 bg-white rounded-lg shadow-md p-2 w-[180px] translate-y-[-280%] translate-x-[-195%]">
          <div className="flex items-center">
            <img
              src={user}
              alt="User"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <div>
              <h3 className="font-sans text-xs font-bold text-black">
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

export default MainVew;
