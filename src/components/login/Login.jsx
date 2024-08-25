import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../lib/firebse"
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import { useUserStore } from "../../lib/userStore";

const Login = () => {
    const [image, setimage] = useState({
        file: null,
        url: "",
    });
    const [loading, setloading] = useState(false);
    const [loginloading, setloginloading] = useState(false);
    const { curruser, isloading, fetchUser } = useUserStore();

    const handleImageUpload = (e) => {
        console.log(e);
        if (e.target.files[0]) {
            setimage({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }

    }

    const handleLoginForm = async (e) => {
        e.preventDefault();
        try {
            setloginloading(true);
            const formdata = new FormData(e.target);
            const { email, password } = Object.fromEntries(formdata);
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            toast.success("Logged In Succesfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setloginloading(false);
        }

    }
    const handleRegister = async e => {
        e.preventDefault();
        setloading(true);
        const formdata = new FormData(e.target);
        const { username, email, password, desc } = Object.fromEntries(formdata);
        console.log({ username, email, password, desc });
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user.uid);
            const downloadUrl = await upload(image.file);
            console.log(downloadUrl);
            console.log(image);
            await setDoc(doc(db, "users", res.user.uid), {
                username: username,
                email: email,
                desc, desc,
                avatar: downloadUrl,
                id: res.user.uid,
                blocked: [],
            });
            await setDoc(doc(db, "userschats", res.user.uid), {
                chats: [],
            });
            setloading(false);
            toast.success("Account succesfully Created");
            fetchUser(res.user.uid);

        } catch (error) {
            console.log(error);
            setloading(false);
            toast.error(error.message);

        }
    }
    return (
        <div className='login'>
            <div className="item">
                <h2>Welcome</h2>
                <form onSubmit={handleLoginForm}>
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="password" />
                    <button disabled={loginloading}>{loginloading ? "Logged In" : "Log in"}</button>
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
                    <input type="text" name="desc" placeholder="Description" />
                    <input type="email" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="password" />
                    <button disabled={loading}>{loading ? "Processing" : "Sign in"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login