import './MainView.css';
import React from 'react';
import logo from "./logo.png"
import user from "./images.jpeg"

const MainVew = ({ onGetStarted }) => {
    return (
        <div className="hero"> 
            <div className="left-view">
                <h1>Start Chatting anywhere anytime with Talkie!</h1>
                <p>Great software application that allows you to chat from any place at any time without any interuption.</p>
                <button onClick={onGetStarted}>Get Started</button>

                <div class="rating-container">
                      <div className="user-images">
                            <img src={user} alt="User 1" />
                            <img src={user} alt="User 2" />
                            <img src={user} alt="User 3" />
                     </div> 
                          <div className="rating-info">
                                  <div >
                                    <p className="customer-count">3933</p>
                                    <p className="customer-count words">Happy&nbsp;Customers</p>
                                  </div>
                                  <div className="rating-score">
                                      <span className="score">4.9/5</span>
                                           <div className="stars">
                                                         ★★★★★&nbsp;<span>Rating</span>
                                           </div>
                                          
                                  </div>
                          </div>
                    </div>

                </div>


                             <img className="hero-image" src={logo} alt="" />
                        <div className="cont">
                             <div className="testimonial-card one">
                                
                                  <img src={user} alt="Ronal Messi" class="user-avatar" />
                                       <div className="testimonial-content">
                                            <h3 className="user-name">RONAL MESSI</h3>
                                            <p className="testimonial-text">One of the best chatting app i have ever used.</p>
                                        </div>
                              </div>
                        </div>

                        <div className="cont">
                             <div className="testimonial-card two">
                                
                                  <img src={user} alt="Ronal Messi" class="user-avatar" />
                                       <div className="testimonial-content">
                                            <h3 className="user-name">RONAL MESSI</h3>
                                            <p className="testimonial-text">One of the best chatting app.</p>
                                        </div>
                              </div>
                        </div>
                        <div className="cont">
                             <div className="testimonial-card three">
                                
                                  <img src={user} alt="Ronal Messi" class="user-avatar" />
                                       <div className="testimonial-content">
                                            <h3 className="user-name">Hash. JD</h3>
                                            <p className="testimonial-text">The best chatting app .</p>
                                        </div>
                              </div>
                        </div>
        </div>
   
    )
}

export default MainVew 