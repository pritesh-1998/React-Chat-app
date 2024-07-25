import { useEffect, useState } from "react";
import "./chatlist.css";
import Adduser from "./addUser/Adduser"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebse";
import { useUserStore } from "../../../lib/userStore";
const Chatlist = () => {
    const [addmod, setaddmod] = useState();
    const [chats,setChats] = useState([]);
    const {curruser} = useUserStore();
    useEffect(()=>{
        const unsub = onSnapshot(doc(db, "userschats",curruser.id), (doc) => {
            setChats(doc.data().chats);
            console.log(doc.data().chats);
            const receiverid = doc.data().chats();
            // fetchUser(receiverid)
        });
        
    },[curruser.id])
    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="search" />
                </div>
                <img src={addmod ? "./minus.png" : "./plus.png"} alt="" className="add" onClick={() => {
                    setaddmod((prev) => !prev)
                }} />
            </div>
            {/* {
                chats.map((singleChat)=>(
                    <div className="item">
                        <img src="./avatar.png" alt="" />
                        <div className="texts">
                            <span>Lewis Hamilton</span>
                            <p>{singleChat.lastMessage}</p>
                        </div>
                    </div>
                ))
            } */}
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            {/* <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div>
            <div className="item">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                    <span>Lewis Hamilton</span>
                    <p>Hello Good Morning</p>
                </div>
            </div> */}
            {addmod && <Adduser></Adduser>}

        </div>
    )
}

export default Chatlist