import "./addUser.css";
import rp from "./rp.png";
import { useUserStore } from "../../../lib/userStore";
import { db } from "../../../lib/firebase";
import {
    arrayUnion,
    collection,
    doc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
    writeBatch
} from "firebase/firestore";
import React, { useState } from "react";

const AddUser = () => {
    const [user, setUser] = useState(null);
    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");

        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", username));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                setUser(querySnapShot.docs[0].data());
            } else {
                setUser(null);
                console.log("No user found with that username.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleAdd = async () => {
        if (!user) return;

        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
        const batch = writeBatch(db);

        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            const userChatData = {
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: currentUser.id,
            };

            const currentUserChatData = {
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: user.id,
            };

            batch.update(doc(userChatsRef, user.id), {
                chats: arrayUnion(userChatData),
            });
            batch.update(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion(currentUserChatData),
            });

            await batch.commit();

            // Now update the timestamps separately
            await updateDoc(doc(userChatsRef, user.id), {
                "chats.$[element].updatedAt": serverTimestamp(),
            }, {
                arrayFilters: [{ "element.chatId": newChatRef.id }],
            });

            await updateDoc(doc(userChatsRef, currentUser.id), {
                "chats.$[element].updatedAt": serverTimestamp(),
            }, {
                arrayFilters: [{ "element.chatId": newChatRef.id }],
            });

            console.log(newChatRef.id);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="addUser">
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Username" name="username" />
                <button>Search</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || rp} alt="" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
