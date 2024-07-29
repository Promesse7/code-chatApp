import "./detail.css"
import arrowUp from "./up.png"
import arrowDown from "./down.png"
import download from "./download.png"
import profile from "./ebenezer.png"
import dorcas from "./images/d.jpg"
import { auth } from "../lib/firebase"



const Detail = () => {

    const handleLogout = () => {
        auth.signOut();
    };
    
    return (
        <div className="detail">
            <div className="user">
                <img src={dorcas} alt="" />
                <h2>Neza Dorcas</h2>
                <p>Love is one step at hand!</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="tittle">
                        <span>Chat settings</span>
                        <img src={arrowUp} alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="tittle">
                        <span>Privacy & Help</span>
                        <img src={arrowUp} alt="" />
                    </div>
                </div>
                <div className="option">
                    <div className="tittle">
                        <span>Shared Photos</span>
                        <img src={arrowDown} alt="" />
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src={profile} alt="" />
                            <span>photo_2024.png</span>
                            </div>
                        <img src={download} alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src={profile} alt="" />
                            <span>photo_2024.png</span>
                            </div>
                        <img src={download} alt="" className="icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src={profile} alt="" />
                            <span>photo_2024.png</span>
                            </div>
                        <img src={download} alt="" className="icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src={profile} alt="" />
                            <span>photo_2024.png</span>
                            </div>
                        <img src={download} alt="" className="icon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="tittle">
                        <span>Shared Files</span>
                        <img src={arrowUp} alt="" />
                    </div>
                </div>
                <button className="block"  >Block User</button>
                <button className="logout"  onClick={handleLogout}>Log Out</button>
            </div>
           
        </div>
    )
}

export default Detail