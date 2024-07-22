import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../lib/firebse"
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

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
    const handleRegister = async e => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const { username, email, password } = Object.fromEntries(formdata);
        console.log({ username, email, password });
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user.uid);
            const downloadUrl = await upload(image.file);
            console.log(downloadUrl);
            console.log(image);
            await setDoc(doc(db, "users", res.user.uid), {
                username: username,
                email: email,
                avatar: downloadUrl,
                id: res.user.uid,
                blocked: [],
            });
            await setDoc(doc(db, "userschats", res.user.uid), {
                chats: [],
            });

            toast.success("Account succesfully Created");
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
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
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={image.url ? image.url : "./avatar.png"} alt="" />
                        Upload Your Profile
                    </label>
                    <input type="file" name="img" id="file" style={{ "display": "none" }} onChange={handleImageUpload} />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="password" />
                    <button>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Login