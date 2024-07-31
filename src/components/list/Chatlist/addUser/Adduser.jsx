import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./adduser.css";
import { db } from "../../../../lib/firebse";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const Adduser = () => {
    const [searchedUsers, setSearchedUsers] = useState([]);
    const { curruser } = useUserStore();

    const handleUserSearch = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const { username } = Object.fromEntries(formdata);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        const allSearchedUsers = querySnapshot.docs.map(doc => doc.data());
        setSearchedUsers(allSearchedUsers);
    }

    const handleAddUser = async (user) => {
        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userschats");

        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });
            console.log(user.id, curruser.id);
            await updateDoc(doc(userChatRef, user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: curruser.id,
                    updatedAt: Date.now(),
                }),
            });

            await updateDoc(doc(userChatRef, curruser.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: user.id,
                    updatedAt: Date.now(),
                }),
            });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='adduser'>
            <form onSubmit={handleUserSearch}>
                <input type="text" name="username" placeholder="Search User" />
                <button type="submit">Search</button>
            </form>
            {searchedUsers.map((element) => (
                <div className="user" key={element.id}>
                    <div className="detail">
                        <img src={element.avatar || "./avatar.png"} alt="" />
                        <span>{element.username}</span>
                    </div>
                    <button onClick={() => handleAddUser(element)}>Add User</button>
                </div>
            ))}
        </div>
    )
}

export default Adduser;
