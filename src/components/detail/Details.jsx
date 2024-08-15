import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebse";
import { userChatStore } from "../../lib/userChatStore";
import "./details.css";
import { useUserStore } from "../../lib/userStore";
const Details = () => {
    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
        userChatStore();
    const { curruser } = useUserStore();
    const handleBlock = async () => {
        if (!user) return;

        const userDocRef = doc(db, "users", curruser.id);

        try {
            await updateDoc(userDocRef, {
                blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
            });
            changeBlock();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='details'>
            <div className="detail">
                <div className="user">
                    <img src={user?.username ? user.avatar : "./avatar.png"} alt="" />
                    <h2>{user.username || "Unknown"}</h2>
                    <p>This is my own desription</p>
                </div>
                <div className="info">
                    <div className="option">
                        <div className="title">
                            <span>Chat settings</span>
                            <img src="./arrowUp.png" alt="" />
                        </div>
                    </div>
                    <div className="option">
                        <div className="title">
                            <span>Privacy & Help</span>
                            <img src="./arrowUp.png" alt="" />
                        </div>
                    </div>
                    <div className="option">
                        <div className="title">
                            <span>Shared Photos </span>
                            <img src="./arrowDown.png" alt="" />
                        </div>
                        <div className="photos">
                            <div className="photoItem">
                                <div className="photoDetail">
                                    <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <span>photo_6523.jpg</span>
                                </div>
                                <img src="./download.png" className="downloadicon" alt="" />
                            </div>
                            <div className="photoItem">
                                <div className="photoDetail">
                                    <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <span>photo_6523.jpg</span>
                                </div>
                                <img src="./download.png" className="downloadicon" alt="" />
                            </div>
                            <div className="photoItem">
                                <div className="photoDetail">
                                    <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <span>photo_6523.jpg</span>
                                </div>
                                <img src="./download.png" className="downloadicon" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="option">
                        <div className="title">
                            <span>Shared  Files</span>
                            <img src="./arrowUp.png" alt="" />
                        </div>
                    </div>
                    {/* <button onClick={handleBlock}>
                        {isCurrentUserBlocked
                            ? "You are Blocked!"
                            : isReceiverBlocked
                                ? "User blocked"
                                : "Block User"}
                    </button> */}
                    <button className="logout" onClick={() => auth.signOut()}>Logout</button>

                </div>
            </div>
        </div>
    )
}

export default Details