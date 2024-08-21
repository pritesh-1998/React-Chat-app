import React, { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { userChatStore } from "../../lib/userChatStore";
import { db } from "../../lib/firebse";
import { useUserStore } from "../../lib/userStore";
import { toast } from "react-toastify";
import upload from "../../lib/upload";
import { CustomWebcam } from "../webcamComponent/webcam";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";

const Chat = () => {
    const [emojiBoxOpen, seteemojiBoxOpen] = useState(false);
    const endRef = useRef();
    const [text, setText] = useState("");
    const [chat, setChat] = useState([]);
    const { chatid, user } = userChatStore();
    const { curruser } = useUserStore();
    const [image, setimage] = useState({
        file: null,
        url: "",
    });
    const [webcam, setwebcamon] = useState(false);

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const handleEmojiInput = (e) => {
        setText((prev) => prev + e.emoji);
        seteemojiBoxOpen(false);
    };

    useEffect(() => {
        const stub = onSnapshot(
            doc(db, "chats", chatid),
            (res) => {
                setChat(res.data());
            }
        );
        return () => {
            stub();
        };
    }, [chatid]);

    const handleSend = async () => {
        if (text === "" && !image.file) return; // Prevent sending empty messages
        try {
            let imageurl = null;
            if (image.file) {
                imageurl = await upload(image.file);
            }
            const chatRef = doc(db, "chats", chatid);

            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: curruser.id,
                    text,
                    createdAt: new Date(),
                    ...(imageurl && { img: imageurl }),
                }),
            });

            const userIds = [curruser.id, user.id];
            for (const id of userIds) {
                const userChatsRef = doc(db, "userschats", id);
                const userSnapShot = await getDoc(userChatsRef);

                if (userSnapShot.exists()) {
                    const userSnap = userSnapShot.data();
                    const ChatIndex = userSnap.chats.findIndex(c => c.chatId === chatid);

                    if (ChatIndex !== -1) {
                        userSnap.chats[ChatIndex].lastMessage = text;
                        userSnap.chats[ChatIndex].isseen = id === curruser.id;
                        userSnap.chats[ChatIndex].updatesAt = Date.now();

                        await updateDoc(userChatsRef, {
                            chats: userSnap.chats,
                        });
                    } else {
                        console.error(`Chat with id ${chatid} not found for user ${id}`);
                    }
                } else {
                    console.error(`User chat document not found for user ${id}`);
                }
            }
            setText("");
            setimage({ file: null, url: "" });
            toast.success("Message Sent!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            setimage({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
            });
        }
    };

    const hadlewebcameClose = () => {
        setwebcamon((state) => !state);
    };

    const addwebcameImagetoChat = (data) => {
        setimage(data);
        setText(" - Webcam Image");
        handleSend(); // Automatically send the image once it's captured
        setwebcamon((prev) => !prev)
    };

    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src={user?.username ? user.avatar : "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{user?.username}</span>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                {chat?.messages?.map((singlemsg) => (
                    <div
                        className={singlemsg.senderId === curruser?.id ? "message own" : "message"}
                        key={singlemsg?.createdat}
                    >
                        <div className="texts">
                            {singlemsg.img && <img src={singlemsg.img} alt="" />}
                            <p>{singlemsg.text}</p>
                            <span>1 minute ago</span>
                        </div>
                    </div>
                ))}
                {image.url && (
                    <div className="message own">
                        <div className="texts">
                            <img src={image.url} alt="" />
                            <span>1 minute ago</span>
                        </div>
                    </div>
                )}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <label htmlFor="image">
                        <img src="./img.png" alt="" />
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                    />
                    <img
                        src="./camera.png"
                        alt=""
                        onClick={() => {
                            setwebcamon((prev) => !prev);
                        }}
                    />
                    {webcam && (
                        <CustomWebcam
                            isActive={webcam}
                            hadlewebcameClose={hadlewebcameClose}
                            addwebcameImagetoChat={addwebcameImagetoChat}
                        />
                    )}
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type="text"
                    className="messagebar"
                    value={text}
                    placeholder="Type the message"
                    onChange={(event) => setText(event.target.value)}
                />
                <div className="emoji">
                    <img
                        src="./emoji.png"
                        alt=""
                        onClick={() => {
                            seteemojiBoxOpen((prev) => !prev);
                        }}
                    />
                    {emojiBoxOpen && (
                        <div className="picker">
                            <EmojiPicker onEmojiClick={handleEmojiInput} />
                        </div>
                    )}
                </div>
                <button className="sendbutton" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
