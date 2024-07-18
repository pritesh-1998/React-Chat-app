import "./adduser.css";
const Adduser = () => {
    return (
        <div className='adduser'>
            <form action="">
                <input type="text" name="username" placeholder="Search User" />
                <button>Search</button>
            </form>
            <div className="user">
                <div className="detail">
                    <img src="./avatar.png" alt="" />
                    <span>Lewis Hamilton</span>
                </div>
                <button>Add User</button>
            </div>
            <div className="user">
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
            </div>
        </div>
    )
}

export default Adduser