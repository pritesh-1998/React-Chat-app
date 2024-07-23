import { useEffect } from "react"
import Chat from "./components/chat/chat"
import Details from "./components/detail/Details"
import List from "./components/list/List"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./lib/firebse"
import { useUserStore } from "./lib/userStore"




const App = () => {
    const user = true;
    useEffect(()=>{
        const unSub = onAuthStateChanged(auth,(user)=>{
            console.log(user,unSub);
            useUserStore();
            console.log(useUserStore);
        });
    },[])
    return (
        <div className='container'>
            {user ? (
                <>
                    <List></List>
                    <Chat></Chat>
                    <Details></Details>
                </>
            ) : (
                <Login></Login>
            )}
            <Notification />
        </div>
    )
}

export default App
