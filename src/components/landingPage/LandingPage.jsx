
import React from 'react';
import Navbar from './assets/navbar/Navbar';
import MainView from './assets/MainView/MainView';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white m-0 p-0">
      <Navbar onGetStarted={onGetStarted} />
      <MainView onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;