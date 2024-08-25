import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "./adduser.css";
import { db } from "../../../../lib/firebse";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";
import { toast, useToast } from "react-toastify";

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

        const userchatdoc = doc(db, "userschats", curruser.id); // Correctly referencing the document

        // Fetch the document snapshot
        const userDocSnap = await getDoc(userchatdoc);
        console.log(curruser.id);

        if (userDocSnap.exists()) {
            const datafromdb = userDocSnap.data();
            const chats = datafromdb.chats || [];
            const receiverIdToCheck = user.id;
            const chatExists = chats.some(chat => chat.receiverId === receiverIdToCheck);
            if (chatExists || user.id === curruser.id) {
                toast.error("User already exist");
                return;
            }
        }

        const chatRef = collection(db, "chats");
        const userChatRef = collection(db, "userschats");
        if (user.id != curruser.id) {
            try {
                const newChatRef = doc(chatRef);
                await setDoc(newChatRef, {
                    createdAt: serverTimestamp(),
                    messages: [],
                });
                console.log(user.id, curruser.id);

                const userChatData = {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: curruser.id,
                        updatedAt: Date.now(),
                    }),
                };

                const currUserChatData = {
                    chats: arrayUnion({
                        chatId: newChatRef.id,
                        lastMessage: "",
                        receiverId: user.id,
                        updatedAt: Date.now(),
                    }),
                };

                await setDoc(doc(userChatRef, user.id), userChatData, { merge: true });
                await setDoc(doc(userChatRef, curruser.id), currUserChatData, { merge: true });

            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error("you cannot add yourself");
        }
    };


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
