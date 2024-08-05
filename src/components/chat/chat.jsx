import "./chat.css";
import phone from "./images/phone.png";
import info from "./images/info.png";
import video from "./images/video.png";
import emoji from "./images/happy.png";
import mic from "./images/mic.png";
import camera from "./images/camera.png";
import image from "./images/image.png";
import profile from "./images/placeholder.png";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useChatStore } from "../lib/chatStore ";
import Upload from "../lib/upload";

const Chat = () => {
    const [chat, setChat] = useState(null);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [img, setImg] = useState({
        file: null,
        url: ""
    });

    const { currentUser } = useChatStore();
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
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

    const handleImg = async (e) => {
        if (e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setImg({
                file: selectedFile,
                url: URL.createObjectURL(selectedFile)
            });

            try {
                const imgUrl = await Upload(selectedFile);

                await updateDoc(doc(db, "chats", chatId), {
                    messages: arrayUnion({
                        senderId: currentUser?.id || "",
                        createdAt: new Date(),
                        isSeen: false,
                        img: imgUrl,
                        text: text.trim() // Include any text that might be in the input
                    })
                });

                const userIds = [currentUser?.id, user?.id];

                userIds.forEach(async (id) => {
                    if (id) {
                        const userChatRef = doc(db, "userChats", id);
                        const userSnapShot = await getDoc(userChatRef);

                        if (userSnapShot.exists()) {
                            const userChatsData = userSnapShot.data();

                            const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                            userChatsData.chats[chatIndex].lastMessage = text.trim() || "Image";
                            userChatsData.chats[chatIndex].isSeen = id === currentUser?.id ? true : false;
                            userChatsData.chats[chatIndex].updateAt = Date.now();

                            await updateDoc(userChatRef, {
                                chats: userChatsData.chats,
                            });
                        }
                    }
                });

                setText(""); // Clear the text input after sending
            } catch (err) {
                console.log(err);
            }

            setImg({
                file: null,
                url: ""
            });
        }
    };

    const handleSend = async () => {
        if (text.trim() === "" && !img.file) return; // Ensure either text or image is present

        try {
            const messageData = {
                senderId: currentUser?.id || "",
                createdAt: new Date(),
                isSeen: false,
            };

            if (text.trim() !== "") {
                messageData.text = text.trim();
            }

            if (img.file) {
                const imgUrl = await Upload(img.file);
                messageData.img = imgUrl;
            }

            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion(messageData)
            });

            const userIds = [currentUser?.id, user?.id];

            userIds.forEach(async (id) => {
                if (id) {
                    const userChatRef = doc(db, "userChats", id);
                    const userSnapShot = await getDoc(userChatRef);

                    if (userSnapShot.exists()) {
                        const userChatsData = userSnapShot.data();

                        const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);

                        userChatsData.chats[chatIndex].lastMessage = text.trim() || "Image";
                        userChatsData.chats[chatIndex].isSeen = id === currentUser?.id ? true : false;
                        userChatsData.chats[chatIndex].updateAt = Date.now();

                        await updateDoc(userChatRef, {
                            chats: userChatsData.chats,
                        });
                    }
                }
            });
        } catch (err) {
            console.log(err);
        }

        setText("");
        setImg({ file: null, url: "" });
    };

    useEffect(() => {
        const markMessagesAsSeen = async () => {
            if (chatId && chat) {
                const messages = chat.messages.map(message => {
                    if (message.senderId !== currentUser?.id && !message.isSeen) {
                        return { ...message, isSeen: true };
                    }
                    return message;
                });

                await updateDoc(doc(db, "chats", chatId), { messages });
            }
        };

        markMessagesAsSeen();
    }, [chatId, chat, currentUser?.id]);

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.avatar || profile} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
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
                    <div className={`message ${message.senderId === currentUser?.id ? 'own' : ''}`} key={message.createdAt}>
                        <div className="texts">
                            {message.img && <img src={message.img} alt="" />}
                            {message.text && <p>{message.text}</p>}
                            {message.isSeen && <span>Seen</span>}
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="file">
                        <img src={image} alt="" />
                    </label>
                    <input type="file" style={{ display: "none" }} onChange={handleImg} id="file" />
                    <img src={camera} alt="" />
                    <img src={mic} alt="" />
                </div>
                <input 
                    type="text" 
                    placeholder={(isCurrentUserBlocked || isReceiverBlocked) ? "You are not allowed to send messages" : "Type your message here!"} 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}
                    disabled={isCurrentUserBlocked || isReceiverBlocked}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
                <div className="emoji">
                    <img src={emoji} alt="" onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        </div>
                    )}
                </div>
                <button className="sendButton" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;