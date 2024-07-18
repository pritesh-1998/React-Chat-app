import EmojiPicker from "emoji-picker-react";
import "./chat.css";
import { useEffect, useRef, useState } from "react";
const Chat = () => {
    const [ emojiBoxOpen , seteemojiBoxOpen] =  useState(false);
    const endRef = useRef();
    const [text , setText ] = useState("");
    useEffect(()=>{
        endRef.current.scrollIntoView({behavior : "smooth"})
    },[]);
    const handleEmojiInput = (e) =>{
        setText((prev) => prev+e.emoji)
        seteemojiBoxOpen(false);
        console.log(e,emojiBoxOpen,text);
    }
    return (
        <div className='chat'>
            <div className="top">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <span>Max Verstappen</span>
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
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className="texts">
                        <img src="https://mcdn.wallpapersafari.com/medium/18/71/yHI5VW.jpg" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div className="message">
                <img src="./avatar.png" alt="" />

                    <div className="texts">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo itaque reprehenderit architecto, nobis impedit error aliquam illum ut ducimus non repellat provident vitae molestias! Odio fugit provident cupiditate excepturi earum.
                        </p>
                        <span>1 minute ago</span>
                    </div>
                </div>
                <div ref={endRef}></div>
            </div>
            <div className="bottom">
                <div className="icons">
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input type="text" className="messagebar" value={text} placeholder="Type the message" onChange={(event)=>setText(event.target.value) }/>
                <div className="emoji">
                    <img src="./emoji.png" 
                    alt="" 
                    onClick={() => {seteemojiBoxOpen((prev) => !prev)}}
                    />
                    <div className="picker">
                        <EmojiPicker open={emojiBoxOpen} onEmojiClick={handleEmojiInput}/>
                    </div>
                </div>
                <button className="sendbutton">Send</button>
            </div>
        </div>
    )
}

export default Chat