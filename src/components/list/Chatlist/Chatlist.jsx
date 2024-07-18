import { useState } from "react";
import "./chatlist.css";
import Adduser from "./addUser/Adduser"
const Chatlist = () => {
    const [addmod, setaddmod] = useState();
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
            <Adduser></Adduser>
        </div>
    )
}

export default Chatlist