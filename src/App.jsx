import { useEffect } from "react"
import Chat from "./components/chat/chat"
import Details from "./components/detail/Details"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebse"
import { useUserStore } from "./lib/userStore"  
import { userChatStore } from "./lib/userChatStore"

const App = () => {
    // const user = false;
    const {curruser,isloading,fetchUser} = useUserStore();
    const {chatid} = userChatStore();

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,(user)=>{
            fetchUser(user?.uid)
        });
        return () =>{
            unSub();
        }
    },[fetchUser])

    // if(isloading) return <div className="loading">loading...</div>
    return (
        <div className='container'>
            {curruser ? (
                <>
                    <List></List>
                    {chatid && <Chat></Chat> }
                    {chatid && <Details></Details>} 
                </>
            ) : (
                <Login></Login>
            )}
            <Notification />
        </div>
    )
}

export default App
