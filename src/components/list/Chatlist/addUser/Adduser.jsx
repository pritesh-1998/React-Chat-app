import { collection, doc, getDocs, query, where } from "firebase/firestore";
import "./adduser.css";
import { db } from "../../../../lib/firebse";
import { useState } from "react";
const Adduser = () => {
    const [searchedUsers, setSearchedUSers] = useState([]);
    const handleUserSearch = async (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const { username } = Object.fromEntries(formdata);
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        const allSearchedUsers = await querySnapshot.docs.map(doc => doc.data());
        console.log(allSearchedUsers);
        setSearchedUSers(allSearchedUsers);
    }
    const handleAddUser = () => {

    }
    return (
        <div className='adduser'>
            <form onSubmit={handleUserSearch}>
                <input type="text" name="username" placeholder="Search User" />
                <button type="submit">Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div>
            {searchedUsers.map((element) => (
                <div className="user" key={element.id}>
                    <div className="detail">
                        <img src={element.avatar || "./avatar.png"} alt="" />
                        <span>{element.username}</span>
                    </div>
                    <button onClick={handleAddUser}>Add User</button>
                </div>
            ))}
            {/* <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div><div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div><div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div><div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div> */}
        </div>
    )
}

export default Adduser