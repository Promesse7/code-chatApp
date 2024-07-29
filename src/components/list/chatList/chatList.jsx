import React, { useEffect, useState } from "react";
import "./chatList.css";
import search from "./search.png";
import plus from "./plus.png";
import minus from "./minus.png";
import AddUser from "./addUser/addUser";
import pacy from "./images/pacy.jpg";
import { useUserStore } from "../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore ";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);

    const { currentUser } = useUserStore(); 
    const { changeChat } = useChatStore(); 

    useEffect(() => {
        if (!currentUser || !currentUser.id) return; 

            const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats || [];

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId); // Remove quotes around item.receiverId
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();

                return { ...item, user };
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser]); 

    const handleSelect = async (chat) =>{

        changeChat(chat.chatId, chat.user);

    }

    return (
        <div className="chatList">
            <div className="search">
                <div className="searchbar">
                    <img src={search} alt="Search" />
                    <input type="text" placeholder="Search" />
                </div>
                <img
                    src={addMode ? minus : plus}
                    alt="Toggle Add User"
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />
            </div>
            {chats.map((chat) => (
                <div className="item" key={chat.chatId} onClick={()=>handleSelect(chat)}>
                    <img src={chat.user.avatar || pacy} alt="User" />
                    <div className="texts">
                        <span>{chat.user.username || 'Unknown User'}</span> {/* Handle undefined user */}
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;



