import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebse";
import { useUserStore } from "../../../lib/userStore";
import Adduser from "./addUser/Adduser";
import { MdMarkUnreadChatAlt } from "react-icons/md";


import "./chatlist.css";
import { userChatStore } from "../../../lib/userChatStore";
import { CustomWebcam } from "../../webcamComponent/webcam";

const Chatlist = () => {
    const [addmod, setAddmod] = useState(false);
    const [chats, setChats] = useState([]);
    const [searchText, setSearchTExt] = useState("");
    const { curruser } = useUserStore();
    const { changeChat, chatid } = userChatStore();
    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "userschats", curruser.id),
            async (res) => {
                const items = res.data().chats;

                const promises = items.map(async (item) => {
                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data();

                    return { ...item, user };
                });

                const chatData = await Promise.all(promises);

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            }
        );
        return () => {
            unSub();
        };
    }, [curruser.id]);


    const handleChatCLick = async (chat) => {
        const userChats = chats.map((item) => {
            const { user, ...rest } = item;
            return rest;
        });
        const userChatsRef = doc(db, "userschats", curruser.id);
        const userSnapShot = await getDoc(userChatsRef);

        const ChatIndex = userChats.findIndex(c => c.chatId === chat.chatId);
        userChats[ChatIndex].isseen = true;
        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
            });
            changeChat(chat.chatId, chat.user)

        } catch (error) {
            console.log(error);

        }

    }
    const filterChats = chats.filter(c => c.user.username.toLowerCase().includes(searchText.toLowerCase()))
    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="Search" />
                    <input type="text" placeholder="search" onChange={(e) => (setSearchTExt(e.target.value))} />
                </div>
                <img
                    src={addmod ? "./minus.png" : "./plus.png"}
                    alt="Toggle add user"
                    className="add"
                    onClick={() => setAddmod(prev => !prev)}
                />
            </div>
            {filterChats.map((singleChat) => (
                <div className="item" key={singleChat.chatId} onClick={() => { handleChatCLick(singleChat) }}>
                    <img src={singleChat.user.avatar || "./avatar.png"} alt="User Avatar" />
                    <div className="texts">
                        <span>{singleChat.user.username || "Unknown User"}
                            <span> {singleChat.isseen == false && <MdMarkUnreadChatAlt style={{
                                color: 'yellow',
                            }} />}</span>
                        </span>
                        <p>{singleChat.lastMessage}
                        </p>
                    </div>
                </div>
            ))}
            {addmod && <Adduser />}
        </div >
    );
}

export default Chatlist;
