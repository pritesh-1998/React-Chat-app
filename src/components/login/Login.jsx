import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
const Login = () => {
    const [image, setimage] = useState({
        file: null,
        url: "",
    });

    const handleImageUpload = (e) => {
        console.log(e);
        if (e.target.files[0]) {
            setimage({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }
    const handleRegister = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        const { usernames, email, password } = Object.fromEntries(formdata);
        console.log({ usernames, email, password });
        toast.success("Account succesfully Created");
    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome</h2>
                <form action="">
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="password" />
                    <button>Sign In</button>
                </form>
            </div>
            <div className="seprator"></div>
            <div className="item">
                <h2>Create an Account</h2>
                <form action="" onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={image.url ? image.url : "./avatar.png"} alt="" />
                        Upload Your Profile
                    </label>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="file" name="img" id="file" style={{ "display": "none" }} onChange={handleImageUpload} />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="password" />
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login