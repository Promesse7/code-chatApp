import React from 'react';
import './LandingPage.css';
import Navbar from './assets/navbar/Navbar';
import MainView from './assets/MainView/MainView';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      <Navbar onGetStarted={onGetStarted} />
      <MainView onGetStarted={onGetStarted} />
      
    </div>
  );
};

export default LandingPage;