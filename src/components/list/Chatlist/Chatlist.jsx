import { useEffect, useState } from "react";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebse";
import { useUserStore } from "../../../lib/userStore";
import Adduser from "./addUser/Adduser";
import "./chatlist.css";

const Chatlist = () => {
    const [addmod, setAddmod] = useState(false);
    const [chats, setChats] = useState([]);
    const { curruser } = useUserStore();

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
        console.log(chats);
        return () => {
            unSub();
        };
    }, [curruser.id]);


    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="Search" />
                    <input type="text" placeholder="search" />
                </div>
                <img
                    src={addmod ? "./minus.png" : "./plus.png"}
                    alt="Toggle add user"
                    className="add"
                    onClick={() => setAddmod(prev => !prev)}
                />
            </div>
            {chats.map((singleChat) => (
                <div className="item" key={singleChat.chatId} >
                    <img src={singleChat.user.avatar || "./avatar.png"} alt="User Avatar" />
                    <div className="texts">
                        <span>{singleChat.user.username || "Unknown User"}</span>
                        <p>{singleChat.lastMessage}</p>
                    </div>
                </div>
            ))
            }
            {addmod && <Adduser />}
        </div >
    );
}

export default Chatlist;
