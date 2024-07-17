import { useState } from "react";
import "./chatlist.css";
const Chatlist = () => {
    const[addmod,setaddmod] = useState();
    return (
        <div className='chatlist'>
            <div className="search">
                <div className="searchbar">
                    <img src="./search.png" alt="" />
                    <input type="text" placeholder="search"/>
                </div>
                <img src={addmod ? "./minus.png": "./plus.png" } alt="" className="add" onClick={()=>{
                    setaddmod((prev) => !prev)
                }} />
            </div>
        </div>
    )
}

export default Chatlist