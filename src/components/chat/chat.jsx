import "./chat.css";
import phone from "./images/phone.png";
import info from "./images/info.png";
import video from "./images/video.png";
import emoji from "./images/happy.png";
import send from "./images/send.png";
import mic from "./images/mic.png";
import camera from "./images/camera.png";
import dorcas from "./images/d.jpg";
import image from "./images/image.png";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useChatStore } from "../lib/chatStore ";

const Chat = () => {
    const [chat, setChat] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const { currentUser, chatId, user } = useChatStore();
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    useEffect(() => {
        if (chatId) {
            const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
                setChat(res.data());
            });

            return () => {
                unSub();
            };
        }
    }, [chatId]);

    const handleEmoji = (emojiData) => {
        setText((prev) => prev + emojiData.emoji);
        setOpen(false);
    };

    const handleSend = async () => {
        if (!text) return;
        if (!currentUser || !user) {
            console.error("Current user or chat user is not defined");
            return;
        }

        try {
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                }),
            });

            const userIds = [currentUser.id, user.id];

            userIds.forEach(async (id) => {
                const userChatRef = doc(db, "userChats", id);
                const userSnapShot = await getDoc(userChatRef);

                if (userSnapShot.exists()) {
                    const userChatsData = userSnapShot.data();
                    const chatIndex = userChatsData.chats.findIndex((c) => c.chatId === chatId);

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen = id === currentUser.id;
                    userChatsData.chats[chatIndex].updateAt = Date.now();

                    await updateDoc(userChatRef, {
                        chats: userChatsData.chats,
                    });
                }
            });

            setText("");  // Clear the input field after sending the message
        } catch (err) {
            console.log("Error sending message:", err);
        }
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={dorcas} alt="" />
                    <div className="texts">
                        <span>Neza Dorcas</span>
                        <p>Love is one step at hand!</p>
                    </div>
                </div>
                <div className="icons">
                    <img src={phone} alt="" />
                    <img src={video} alt="" />
                    <img src={info} alt="" />
                </div>
            </div>
            <div className="center">
                {chat?.messages?.map((message) => (
                    <div className="message own" key={message?.createdAt}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src={image} alt="" />
                    <img src={camera} alt="" />
                    <img src={mic} alt="" />
                </div>
                <input type="text" placeholder="Type your message here!" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="emoji">
                    <img src={emoji} alt="" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
