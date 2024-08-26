import React, { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { userChatStore } from "../../lib/userChatStore";
import { db } from "../../lib/firebse";
import { useUserStore } from "../../lib/userStore";
import { toast } from "react-toastify";
import upload, { uploadAudio } from "../../lib/upload";
import { CustomWebcam } from "../webcamComponent/webcam";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { Image } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { AudioRecorder } from 'react-audio-voice-recorder';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import MyModal from "../audiorecorder/AudioRecorder";
import AudioModal from "../AudioModal/AudioModal";
import CustomModal from "../CustomModal/CustomModal";
import AudioPlayer from "../audioplayer/AudioPlayer";


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
    const [audio, setaudio] = useState({
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
        if (text === "" && !image.file && !audio.file) return; // Prevent sending empty messages
        try {
            let type = "msg";
            let imageurl = null;
            if (image.file) {
                type = "Image";
                imageurl = await upload(image.file);
            }
            let audiourl = null;
            if (audio.file) {
                type = "Audio";
                audiourl = await uploadAudio(audio.file);
            }
            const chatRef = doc(db, "chats", chatid);

            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: curruser.id,
                    text,
                    createdAt: new Date(),
                    type: type,
                    ...(imageurl && { img: imageurl }),
                    ...(audiourl && { audio: audiourl }),
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
                        userSnap.chats[ChatIndex].type = type;
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
            setaudio({ file: null, url: "" });
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

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString.seconds * 1000 + dateString.nanoseconds / 1000000);
        const options = { year: "numeric", month: "short", day: "numeric" }
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    const addwebcameImagetoChat = (data) => {
        setimage(data);
        setText(" - Webcam Image");
        handleSend(); // Automatically send the image once it's captured
        setwebcamon((prev) => !prev)
    };
    const [isModalOpen, setModalOpen] = useState(false);

    const onClose = () => {
        setModalOpen((prev) => !prev);
    }
    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        if (url) {
            setaudio({
                file: blob,
                url: url,
            });
        }
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
                {/* <div className="icons">
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div> */}
            </div>
            <div className="center">
                {chat?.messages?.map((singlemsg, index) => (
                    <div
                        className={singlemsg.senderId === curruser?.id ? "message own" : "message"}
                        key={singlemsg?.index}
                    >
                        <div className="texts" key={singlemsg?.createdAt}>
                            {singlemsg.img &&
                                <Image lightboxImgClass="modal-imagshow" disableImageZoom={true} image={{ src: singlemsg.img, title: "Cyberpunk" }} />
                            }
                            {singlemsg.audio &&
                                // <AudioPlayer src={singlemsg.audio} />
                                <div className="custom_audio_player">
                                    <audio controls className="audio_element">
                                        <source src={singlemsg.audio} type="audio/ogg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>

                            }
                            {singlemsg.text && <p>{singlemsg.text}</p>}
                            <span>{formatDate(singlemsg.createdAt)}</span>
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
                    <img src="./mic.png" alt="" onClick={() => {
                        setModalOpen((prev) => !prev)
                    }} />
                    <CustomModal isOpen={isModalOpen} onClose={onClose} title={"Record your audio"}>
                        <AudioRecorder
                            onRecordingComplete={addAudioElement}
                            audioTrackConstraints={{
                                noiseSuppression: true,
                                echoCancellation: true,
                            }}
                            // downloadOnSavePress={true}
                            downloadFileExtension="webm"
                        />
                        <button className="sendbutton" onClick={handleSend}>
                            Send Audio
                        </button>
                    </CustomModal>

                </div>
                <input
                    type="text"
                    className="messagebar"
                    value={text}
                    placeholder="Type the message"
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            handleSend();
                        }
                    }}
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
