import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../lib/firebse";
import { userChatStore } from "../../lib/userChatStore";
import "./details.css";
import { useUserStore } from "../../lib/userStore";
import { useEffect, useState } from "react";
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
const Details = () => {
    const { chatid, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
        userChatStore();
    const { curruser } = useUserStore();
    let [isOpen, setIsOpen] = useState(false);

    const getallImages = () => {

    }
    console.log(chatid);
    const [imagesSent, setimagesSent] = useState([]);

    const formatDate = (seconds) => {
        const date = new Date(seconds * 1000); // Convert seconds to milliseconds
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${month}-${day}-${year}`;
    };

    useEffect(() => {
        const stub = onSnapshot(
            doc(db, "chats", chatid),
            (res) => {
                const data = res.data();
                const imageUrls = data.messages
                    .filter(message => message.img) // Filter messages that have an 'img' property
                    .map(message => ({
                        src: message.img,
                        alt: formatDate(message.createdAt.seconds),
                        createdAt: formatDate(message.createdAt.seconds) // Format the date
                    })); // Map to extract only the 'img' URL
                console.log(res.data());
                console.log(imageUrls);
                setimagesSent(imageUrls);
            }
        );
        return () => {
            stub();
        };
    }, [chatid]);
    getallImages();

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
                    {/* <div className="option">
                        <div className="title">
                            <span>Privacy & Help</span>
                            <img src="./arrowUp.png" alt="" />
                        </div>
                    </div> */}
                    <div className="option">
                        <div className="title">
                            <span>Shared Photos </span>
                            <img src="./arrowDown.png" alt="" />
                        </div>
                        <div className="photos">
                            {imagesSent.map((element, index) => (
                                <div className="photoItem">
                                    <div className="photoDetail">
                                        <img src={element.src} onClick={() => { setIsOpen(true) }} alt="" />
                                        <span>{element.createdAt}</span>
                                    </div>
                                    <a key={index} href={element.src} target="_Blank" download="image">
                                        <img src="./download.png" className="downloadicon" alt="Download icon" />
                                    </a>
                                </div>

                            ))}
                            <SlideshowLightbox
                                images={imagesSent}
                                showThumbnails={true}
                                open={isOpen}
                                downloadImages={true}
                                lightboxIdentifier="lbox1"
                                onClose={() => { setIsOpen(false) }}>
                            </SlideshowLightbox>

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