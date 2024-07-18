import "./details.css";
const Details = () => {
    return (
        <div className='details'>
            <div className="detail">
                <div className="user">
                    <img src="./avatar.png" alt="" />
                    <h2>Jane Doe</h2>
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
                    <button>Block User</button>
                    <button className="logout">Logout</button>

                </div>
            </div>
        </div>
    )
}

export default Details