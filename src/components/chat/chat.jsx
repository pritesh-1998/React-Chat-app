import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { userChatStore } from "../../lib/userChatStore";
import { db } from "../../lib/firebse";
import { useUserStore } from "../../lib/userStore";
import { toast } from "react-toastify";
const Chat = () => {
    const [emojiBoxOpen, seteemojiBoxOpen] = useState(false);
    const endRef = useRef();
    const [text, setText] = useState("");
    const [chat, setChat] = useState([]);
    const { chatid, user } = userChatStore();
    const { curruser } = useUserStore();
    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" })
    }, []);
    const handleEmojiInput = (e) => {
        setText((prev) => prev + e.emoji)
        seteemojiBoxOpen(false);
        console.log(e, emojiBoxOpen, text);
    }
    useEffect(() => {
        const stub = onSnapshot(
            doc(db, "chats", chatid),
            async (res) => {
                setChat(res.data());
            }
        )
        return () => {
            stub();
        };
    }, [chatid]);

    const handleSend = async () => {
        if (text == "") return;
        try {
            const chatRef = doc(db, "chats", chatid);
            // Update the 'price' field
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId: curruser.id,
                    text,
                    createdAt: new Date(),
                }),
            });
            const userIds = [curruser.id, user.id];
            console.log(text);

            userIds.forEach(async (id) => {
                const userChatsRef = doc(db, "userschats", id);
                const userSnapShot = await getDoc(userChatsRef);

                if (userSnapShot.exists()) {
                    const userSnap = userSnapShot.data();
                    const ChatIndex = userSnap.chats.findIndex(c => c.chatId === chatid);

                    if (ChatIndex !== -1) { // Ensure the chat is found
                        userSnap.chats[ChatIndex].lastMessage = text;
                        userSnap.chats[ChatIndex].isseen = (id == curruser.id) ? true : false;
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
            });

            toast.success("Message Sent!");
        } catch (error) {
            toast.error(error);
        }
    }
    return (
        <div className='chat'>
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
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                {chat?.messages?.map((singlemsg) => (
                    <div className="message own" key={singlemsg?.createdat}>
                        <div className="texts">
                            {singlemsg.img && <img src={singlemsg.img} alt="" />}
                            <p>
                                {singlemsg.text}
                            </p>
                            <span>1 minute ago</span>
                        </div>
                    </div>
                ))}
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" className="messagebar" value={text} placeholder="Type the message" onChange={(event) => setText(event.target.value)} />
                <div className="emoji">
                    <img src="./emoji.png"
                        alt=""
                        onClick={() => { seteemojiBoxOpen((prev) => !prev) }}
                    />
                    <div className="picker">
                        <EmojiPicker open={emojiBoxOpen} onEmojiClick={handleEmojiInput} />
                    </div>
                </div>
                <button className="sendbutton" onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Chat